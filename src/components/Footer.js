import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Marketplace</h3>
            <p className="text-gray-300 text-sm">
              Connecting vendors and suppliers for seamless business operations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/vendor-dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Find Suppliers
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Manage Orders
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Suppliers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/supplier-dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  List Products
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Manage Inventory
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; 2025 Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;