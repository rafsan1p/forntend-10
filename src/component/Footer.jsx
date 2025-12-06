import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-blue-900 via-indigo-800 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">PetPaws</h3>
            </div>
            <p className="text-blue-200 text-sm sm:text-base mb-4">
              Keeping your furry friends warm, safe and healthy during winter season. Your trusted pet care partner.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                <FaInstagram className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Winter Pet Tips
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Pet Grooming
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Winter Clothing
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Book Service
              </a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Winter Coat Fitting
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Paw Treatment
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Pet Spa & Grooming
              </a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2">
                <span className="text-yellow-400">▸</span> Vet Consultation
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-300">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-blue-200 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 shrink-0" />
                <span>Khulna, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm sm:text-base">
                <FaPhone className="text-yellow-400 shrink-0" />
                <span>+8801758578404</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm sm:text-base">
                <FaEnvelope className="text-yellow-400 shrink-0" />
                <span>rubayetrafsan605@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="py-6">
          <p className="text-white text-base sm:text-lg font-medium text-center">
            © 2025 PetPaws. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;