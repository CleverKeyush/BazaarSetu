import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import T from './T';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-white text-lg font-bold">🚩</div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                <T>BazaarSetu</T>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                <T>जय श्री राम</T>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700'
              }`}
            >
              <T>Home</T>
            </Link>
            
            {!user ? (
              <>
                <Link
                  to="/login"
                  className={`hover:text-blue-600 transition-colors ${
                    isActive('/login') ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <T>Login</T>
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  <T>Register</T>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                  className={`hover:text-blue-600 transition-colors ${
                    isActive('/vendor-dashboard') || isActive('/supplier-dashboard') 
                      ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <T>Dashboard</T>
                </Link>
                {user.userType === 'vendor' && (
                  <Link
                    to="/group-orders"
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/group-orders') ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    <T>Group Orders</T>
                  </Link>
                )}
                <Link
                  to="/maps"
                  className={`hover:text-blue-600 transition-colors ${
                    isActive('/maps') ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <T>Maps</T>
                </Link>
                <Link
                  to="/mandi-prices"
                  className={`hover:text-blue-600 transition-colors ${
                    isActive('/mandi-prices') ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <T>📊 Market Rates</T>
                </Link>
                <Link
                  to="/location-discovery"
                  className={`hover:text-blue-600 transition-colors ${
                    isActive('/location-discovery') ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <T>🎯 Find Nearby</T>
                </Link>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-lg font-bold text-white">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-800 text-sm font-bold">
                      <T>Welcome back!</T>
                    </span>
                    <span className="text-blue-600 text-xs font-medium">
                      {user.name || 'User'} • {user.userType === 'vendor' ? '🍽️ Vendor' : '🏪 Supplier'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span><T>Logout</T></span>
                </button>
              </>
            )}
            
            {/* Language Toggle */}
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`hover:text-blue-600 transition-colors ${
                  isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <T>Home</T>
              </Link>
              
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/login') ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <T>Login</T>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <T>Register</T>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={user.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/vendor-dashboard') || isActive('/supplier-dashboard') 
                        ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <T>Dashboard</T>
                  </Link>
                  {user.userType === 'vendor' && (
                    <Link
                      to="/group-orders"
                      className={`hover:text-blue-600 transition-colors ${
                        isActive('/group-orders') ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <T>Group Orders</T>
                    </Link>
                  )}
                  <Link
                    to="/maps"
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/maps') ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <T>Maps</T>
                  </Link>
                  <Link
                    to="/mandi-prices"
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/mandi-prices') ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <T>📊 Market Rates</T>
                  </Link>
                  <Link
                    to="/location-discovery"
                    className={`hover:text-blue-600 transition-colors ${
                      isActive('/location-discovery') ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <T>🎯 Find Nearby</T>
                  </Link>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-xs font-bold">
                        <T>Welcome back!</T>
                      </span>
                      <span className="text-blue-600 text-xs font-medium">
                        {user.name || 'User'} • {user.userType === 'vendor' ? '🍽️ Vendor' : '🏪 Supplier'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 hover:text-red-600 transition-colors text-left"
                  >
                    <T>Logout</T>
                  </button>
                </>
              )}
              
              {/* Mobile Language Toggle */}
              <div className="pt-3 border-t border-gray-200">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;