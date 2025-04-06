"use client";
import React, { useState } from "react";

const NFTVerificationForm = () => {
  const [contract, setContract] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [originalMessage, setOriginalMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile instanceof File) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract || !tokenId || !walletAddress || !originalMessage || !signedMessage || !file) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("nft_contract", contract);
    formData.append("token_id", tokenId);
    formData.append("wallet_address", walletAddress);
    formData.append("original_message", originalMessage);
    formData.append("signed_message", signedMessage);
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/verify-nft/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error verifying NFT:", error);
      setResult({ error: "Verification failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 rounded-2xl shadow-md transition-colors form">
      <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white text-center">
        NFT Authenticity Verifier
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            NFT Contract Address:
          </label>
          <input
            type="text"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            placeholder="0x..."
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white">Token ID:</label>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="e.g., 123"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Wallet Address (Seller):
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white">Original Message:</label>
          <textarea
            value={originalMessage}
            onChange={(e) => setOriginalMessage(e.target.value)}
            placeholder="Enter the Original message"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white">Signed Message:</label>
          <textarea
            value={signedMessage}
            onChange={(e) => setSignedMessage(e.target.value)}
            placeholder="Enter the signed message"
            required
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Upload NFT File (Image):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify NFT"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-white dark:text-gray-100 border border-gray-300 dark:border-gray-700">
          <strong className="block mb-1 text-black dark:text-black">Result:</strong>
          <pre className="text-black text-sm whitespace-pre-wrap">
            {result?.detail || result?.message || JSON.stringify(result, null, 2)}
            </pre>
        </div>
      )}
    </div>
  );
};

export default NFTVerificationForm;
