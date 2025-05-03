import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <img src="./logo.png" alt="AquaBottle Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold">AquaBottle</h2>
          </div>
          <p className="text-sm">
            Delivering clean and fresh water to your doorstep. Stay hydrated,
            stay healthy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@aquabottle.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Location: Muzaffarpur, Bihar</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-gray-200">Facebook</a>
            <a href="#" className="hover:text-gray-200">Instagram</a>
            <a href="#" className="hover:text-gray-200">Twitter</a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm bg-blue-500 py-4">
        © {new Date().getFullYear()} AquaBottle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
