"use client";
import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-8  border-t border-gray-200 dark:border-gray-700  bg-[#4D55CC] transition-colors bottom-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-black dark:text-white">NFT Fraud Detector</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Empowering trust in the NFT space through AI.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-sm text-white">
          <Link href="/about" className="hover:text-black white:hover:text-gray transition">About</Link>
          <Link href="/contact" className="hover:text-black white:hover:text-gray transition">Contact</Link>
          <Link href="/privacy" className="hover:text-black white:hover:text-gray transition">Privacy</Link>
        </div>

        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white-600 hover:text-black dark:text-gray-400 white:hover:text-gray transition">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white-600 hover:text-black dark:text-gray-400 white:hover:text-gray transition">
            <Twitter size={20} />
          </a>
          <a href="mailto:info@nftfrauddetector.com" className="text-gray-600 hover:text-black dark:text-gray-400 white:hover:text-gray transition">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
