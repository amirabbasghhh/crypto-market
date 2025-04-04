import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

const Header = () => {
  return (
    <header className="fixed left-1/2 transform -translate-x-1/2 top-2 w-[90%] max-w-4xl bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg py-4 px-6 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaBitcoin className="text-white text-2xl animate-spin-slow" />
        <h1 className="text-white font-bold text-2xl tracking-wide">
          Crypto<span className="text-gray-900">Tracker</span>
        </h1>
      </div>

      <nav className="hidden md:flex gap-6">
        <a href="#" className="text-white hover:text-gray-900 transition duration-300">Home</a>
        <a href="#" className="text-white hover:text-gray-900 transition duration-300">Markets</a>
        <a href="#" className="text-white hover:text-gray-900 transition duration-300">News</a>
        <a href="#" className="text-white hover:text-gray-900 transition duration-300">Contact</a>
      </nav>

      <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
        Sign In
      </button>
    </header>
  );
};

export default Header;
