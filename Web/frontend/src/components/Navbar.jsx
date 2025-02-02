import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.jpg'; // Make sure the path to the logo is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <Link to="/">
              <img src={logo} alt="TrustApp Logo" className="h-14" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="hover:bg-[#008080] px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/create-plan"
                className="hover:bg-[#008080] px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Plan
              </Link>
              <Link
                to="/dashboard"
                className="hover:bg-[#008080] px-3 py-2 rounded-md text-sm font-medium"
              >
                DashBoard
              </Link>
              <Link
                to="/maps"
                className="hover:bg-[#008080] px-3 py-2 rounded-md text-sm font-medium"
              >
                Maps
              </Link>
              <Link
                to="/contact"
                className="hover:bg-[#008080] px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#008080] focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="hover:bg-[#008080] block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="hover:bg-[#008080] block px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:bg-[#008080] block px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="hover:bg-[#008080] block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="bg-[#FF9800] hover:bg-[#F57C00] block text-center text-white px-4 py-2 rounded-md text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
