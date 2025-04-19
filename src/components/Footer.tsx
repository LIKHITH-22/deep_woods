import React from "react";
import { Instagram, Twitter, Facebook, Mail, ArrowUp, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="text-white [&_*]:text-white mb-4" />
            <p className="text-gray-400 text-sm mb-2">
              (Reg u/s 12AA and 80G) | Regd. No.: CSR00009483
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-eco-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:green@deepwoods.org.in" className="text-gray-400 hover:text-eco-secondary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-5 w-5 shrink-0 mt-1" />
                <div>
                  <p>Indiranagar, Bangalore - 560038</p>
                  <p>Alwarpet, Chennai - 600018</p>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:green@deepwoods.org.in" className="hover:text-white transition-colors">
                  green@deepwoods.org.in
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="h-5 w-5 shrink-0 mt-1" />
                <div>
                  <p>Ph: 044 42112322</p>
                  <p>M: +91 98413 39293</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#calculator" className="text-gray-400 hover:text-white transition-colors">Emissions Calculator</a>
              </li>
              <li>
                <a href="#impact" className="text-gray-400 hover:text-white transition-colors">Our Impact</a>
              </li>
              <li>
                <a href="#stories" className="text-gray-400 hover:text-white transition-colors">Commuter Stories</a>
              </li>
              <li>
                <a href="#pledge" className="text-gray-400 hover:text-white transition-colors">Green Pledge</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Tax Exemption FAQs</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Bengaluru Green Stride. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="text-xs text-gray-500">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              {" • "}
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
