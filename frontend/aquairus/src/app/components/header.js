"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react"; 

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 bg-white shadow-md flex justify-between items-center transition-colors">
      <Link href="/">
        <span className="text-2xl font-bold tracking-tight text-black dark:text-dark">
          NFT Fraud Detector
        </span>
      </Link>

      <div className="flex items-center space-x-3">
        

        <Link href="/login">
          <button className="px-4 py-2 text-sm font-medium text-black dark:text-dark border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-#2E236C transition">
            Log In
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-xl hover:bg-gray-900 dark:hover:bg-gray-200 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}
