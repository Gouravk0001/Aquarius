from fastapi import FastAPI, HTTPException, UploadFile, Form
from pydantic import BaseModel
from web3 import Web3
import requests
import hashlib
from fastapi.middleware.cors import CORSMiddleware
from eth_account.messages import encode_defunct


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

INFURA_URL = "https://mainnet.infura.io/v3/e140e14ae2dc43eb91ca74b9db4f7b26"
web3 = Web3(Web3.HTTPProvider(INFURA_URL))

class NFTVerifyRequest(BaseModel):
    contract_address: str
    token_id: str
    wallet_address: str
    original_message: str
    signed_message: str



def compute_sha256(data_bytes: bytes) -> str:

    return hashlib.sha256(data_bytes).hexdigest()

def get_opensea_metadata(contract_address: str, token_id: str) -> dict:

    url = f"https://api.opensea.io/api/v1/asset/{contract_address}/{token_id}/"
    headers = {"Accept": "application/json"}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception(f"OpenSea API error: {response.status_code}")
    return response.json()

def download_file(url: str) -> bytes:

    response = requests.get(url)
    response.raise_for_status()
    return response.content


def verify_signature(original_message: str, signed_message: str, claimed_address: str) -> bool:
    """Recover the signer from a signed message and compare with the claimed address."""
    try:
        encoded_message = encode_defunct(text=original_message)
        recovered_address = web3.eth.account.recover_message(encoded_message, signature=signed_message)
        return recovered_address.lower() == claimed_address.lower()
    except Exception as e:
        raise Exception(f"Signature verification failed: {str(e)}")

@app.post("/verify-nft-opensea/")
async def verify_nft_opensea(
    nft_contract: str = Form(...),
    token_id: str = Form(...),
    wallet_address: str = Form(...),
    original_message: str = Form(...),
    signed_message: str = Form(...),
    file: UploadFile = Form(...)
):
  
    try:
        if not verify_signature(original_message, signed_message, wallet_address):
            raise HTTPException(status_code=403, detail="Signature verification failed: Wallet mismatch.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    try:
        metadata = get_opensea_metadata(nft_contract, token_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching metadata: {str(e)}")
    
    image_url = metadata.get("image_url")
    if not image_url:
        raise HTTPException(status_code=404, detail="No image found in the NFT metadata.")

    try:
        opensea_image_bytes = download_file(image_url)
        trusted_hash = compute_sha256(opensea_image_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error downloading or hashing OpenSea image: {str(e)}")
    

    try:
        user_file_bytes = await file.read()
        submitted_hash = compute_sha256(user_file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading uploaded file: {str(e)}")
    

    is_authentic = (trusted_hash == submitted_hash)
    result_message = "NFT is authentic." if is_authentic else "NFT file does not match trusted source; it may be tampered with or fraudulent."
    
    return {
        "authentic": is_authentic,
        "trusted_hash": trusted_hash,
        "submitted_hash": submitted_hash,
        "image_url": image_url,
        "message": result_message
    }
