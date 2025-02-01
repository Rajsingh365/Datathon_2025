import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] text-[#333333]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#003366]">TrustApp</h3>
            <p className="text-sm">Building trust through innovative solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#003366]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#008080]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-[#008080]">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#008080]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#008080]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#003366]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-[#008080]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#008080]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#003366]">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#008080]">
                  <FaTwitter className="inline-block mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#008080]">
                  <FaLinkedin className="inline-block mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#008080]">
                  <FaFacebook className="inline-block mr-2" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[#008080] pt-8 text-center">
          <p className="text-sm">&copy; 2023 TrustApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
