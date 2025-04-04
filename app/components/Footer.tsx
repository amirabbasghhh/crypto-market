import React from "react";
import { FaTwitter, FaTelegram, FaInstagram, FaReddit, FaDiscord, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
    
        <div>
          <h2 className="text-2xl font-bold mb-3">CoinTracker</h2>
          <p className="text-white text-sm">
            CoinTracker provides real-time cryptocurrency analysis, including price tracking, volume, and market capitalization.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="text-white text-sm space-y-2">
            <li><a href="#" className="hover:text-orange-500">Crypto News</a></li>
            <li><a href="#" className="hover:text-orange-500">Bitcoin Treasury</a></li>
            <li><a href="#" className="hover:text-orange-500">Crypto Heatmap</a></li>
            <li><a href="#" className="hover:text-orange-500">Crypto API</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="text-white text-sm space-y-2">
            <li><a href="#" className="hover:text-orange-500">Request Form</a></li>
            <li><a href="#" className="hover:text-orange-500">Advertising</a></li>
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">Bug Bounty</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Community</h3>
          <div className="flex gap-4 text-2xl">
            <FaTwitter className="hover:text-orange-500 cursor-pointer" />
            <FaTelegram className="hover:text-orange-500 cursor-pointer" />
            <FaInstagram className="hover:text-orange-500 cursor-pointer" />
            <FaReddit className="hover:text-orange-500 cursor-pointer" />
            <FaDiscord className="hover:text-orange-500 cursor-pointer" />
            <FaFacebook className="hover:text-orange-500 cursor-pointer" />
            <FaYoutube className="hover:text-orange-500 cursor-pointer" />
            <FaTiktok className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

      </div>

      <div className="text-center text-white text-sm mt-10">
        © {new Date().getFullYear()} CoinTracker. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
