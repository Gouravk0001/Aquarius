"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";


export default function page() {

    const [provider,setProvider]=useState(null);
    const [account, setAccount] = useState(null);
    const [signer,setSigner]= useState(null);
    const [img,setImg]=useState(null);

    const connectWallet = async ()=>{
        if (!window.ethereum) {
            alert("MetaMask not detected!");
            return;
          }
          
          try {
            const _provider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await _provider.getSigner();
      
            setProvider(_provider);
            setSigner(_signer);
      
            const accounts = await _provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
          } catch (error) {
            console.error("Error initializing ethers:", error);
          }
        };
    
    const getSignature=(address)=>{
        
        const message = `Sign this message to verify your wallet:${Date.now()}`
        const signature = signer.signMessage(message);
        return { address, message, signature };
    }



  // States to store input data and image
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState([{ trait_type: '', value: '' }]);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const addTrait = () => {
    setTraits([...traits, { trait_type: '', value: '' }]);
  };


  const removeTrait = (index) => {
    const updatedTraits = traits.filter((_, i) => i !== index);
    setTraits(updatedTraits);
  };


  const formSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      walletAddress,
      name,
      description,
      image,
      traits,
    };

    console.log(formData); // Log or process form data as needed

    // You can perform any actions here, like sending the data to an API or processing it further
  };
  const handleTraitChange = (index, e) => {
    const updatedTraits = [...traits];
    updatedTraits[index][e.target.name] = e.target.value;
    setTraits(updatedTraits);
  };

  return (
    <form onSubmit={formSubmit} className='m-auto [&_input]:border border-white space-y-6 p-3 [&_input]:p-2'>
      <h2 className='text-2xl font-bold text-center'>Form</h2>
      
      <input
        type='text'
        className='block rounded-2xl w-80'
        required
        placeholder='Enter Wallet Address'
        name='wallet address'
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      
      {/* Name Input */}
      <input
        type='text'
        className='block rounded-2xl w-80'
        required
        autoComplete='off'
        placeholder='Enter your name'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Image Upload Input */}
      <input
        type='file'
        accept='image/*'
        className='block rounded-2xl w-80'
        onChange={handleImageChange}
        required
      />
      
      {/* Image Preview */}
      {imagePreview && (
        <div className='my-4'>
          <img src={imagePreview} alt='Image Preview' className='w-80 h-auto rounded-2xl' />
        </div>
      )}

      {/* Description Textarea */}
      <textarea
        name="description"
        className='block border p-3 border-white h-40 w-80 rounded-2xl'
        placeholder='Enter description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

    <div>
        <h3 className="text-lg font-semibold">Attributes (Trait Type and Value)</h3>
        {traits.map((trait, index) => (
          <div key={index} className='flex space-x-4'>
            <input
              type='text'
              className='block rounded-2xl w-80'
              placeholder='Trait Type'
              name='trait_type'
              value={trait.trait_type}
              onChange={(e) => handleTraitChange(index, e)}
            />
            <input
              type='text'
              className='block rounded-2xl w-80'
              placeholder='Value'
              name='value'
              value={trait.value}
              onChange={(e) => handleTraitChange(index, e)}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => removeTrait(index)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Button to add a new trait */}
        <button
          type="button"
          onClick={addTrait}
          className="mt-2 text-blue-500"
        >
          Add Another Trait
        </button>
      </div>

      <button type='submit' className='rounded-2xl block left-1/2 w-20 p-2 border-2 border-white text-center'>
        Send
      </button>
    </form>
  );
};

