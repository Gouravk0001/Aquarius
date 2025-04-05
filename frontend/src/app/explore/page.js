"use client"
import React, { useState } from 'react'
import NftCard from '../components/NftCard'
import { fetchNFTs } from '../utils/fetchNft'

export default function page() {
    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")

    return (
        <div className='main1'>
            <div className='main2'>
            <header className=' py-24  mb-12 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm text-black bg-white py-2 px-3 w-full inp" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address'></input>
                        <input className=" border rounded-sm text-black bg-white py-2 px-3 w-full inp" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <button className='py-3 btn ' onClick={() => {fetchNFTs(owner, contractAddress, setNFTs)}}>Search</button>
                    </div>
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                        return (
                           <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} />
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
            </div>
        </div>
    )
}