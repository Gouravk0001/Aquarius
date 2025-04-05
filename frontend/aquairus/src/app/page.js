'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/upload');
  };

  return (
    <div className="text-gray-800">
      <section className="bg-[linear-gradient(to_right,#B5A8D5,#7A73D1,#4D55CC,#211C84)] py-20 text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
          Decentralized AI-Powered NFT Fraud Detector
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Verify your NFTs in seconds. Upload your asset and get an instant fraud risk score powered by AI & blockchain.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-[#211C84] px-6 py-3 rounded-full font-semibold hover:bg-[#f1f1f1] transition"
        >
          Get Started
        </button>
      </section>

      <section className="py-16 px-4 bg-[linear-gradient(to_right,#B5A8D5,#7A73D1)]" id="how-it-works">
        <h2 className="text-3xl font-semibold text-center mb-12 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-[#211C84]">1. Visit & Click</h3>
            <p className="text-gray-600">
              Learn about our tool and hit the "Get Started" button to begin your NFT analysis.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-[#211C84]">2. Upload NFT</h3>
            <p className="text-gray-600">
              Choose an image, video, or GIF of the NFT you want to check for fraud.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl p-6 text-center hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2 text-[#211C84]">3. Get Score</h3>
            <p className="text-gray-600">
              Instantly receive an AI-generated authenticity and worthiness score.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-[#211C84]">Why Choose Us?</h2>
        <ul className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-lg text-gray-700">
          <li>🔐 <span className="text-[#4D55CC]">Decentralized & Transparent</span></li>
          <li>🧠 <span className="text-[#4D55CC]">AI-Powered Detection</span></li>
          <li>⚡ <span className="text-[#4D55CC]">Fast & Secure Verification</span></li>
          <li>🎯 <span className="text-[#4D55CC]">Ideal for Creators, Collectors & Marketplaces</span></li>
        </ul>
      </section>

      <section className="text-center py-20 bg-[#4D55CC] text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to analyze your NFT?</h2>
        <button
          onClick={handleGetStarted}
          className="bg-white text-[#211C84] px-8 py-3 rounded-full font-semibold hover:bg-[#f0f0f0] transition"
        >
          Start Now
        </button>
      </section>
    </div>
  );
}
