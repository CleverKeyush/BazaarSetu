import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import T from '../components/T';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'vendor'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectPath = user.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard';
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      // Redirect to appropriate dashboard or return URL
      const redirectPath = formData.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard';
      navigate(from === '/' ? redirectPath : from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden page-transition-container slider-enter-from-left">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 animate-gradient-x">
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400 via-orange-500 to-red-600 opacity-70 animate-gradient-y"></div>
        
        {/* Enhanced Floating Food Icons with More Animations */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce hover:animate-spin transition-all duration-500 cursor-pointer">🍕</div>
        <div className="absolute top-20 right-20 text-5xl opacity-30 animate-pulse hover:animate-bounce transition-all duration-500 cursor-pointer">🍔</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-25 animate-bounce hover:animate-pulse transition-all duration-500 cursor-pointer" style={{animationDelay: '1s'}}>🍜</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse hover:animate-spin transition-all duration-500 cursor-pointer" style={{animationDelay: '2s'}}>🥘</div>
        <div className="absolute top-1/2 left-5 text-5xl opacity-15 animate-bounce hover:animate-pulse transition-all duration-500 cursor-pointer" style={{animationDelay: '0.5s'}}>🌮</div>
        <div className="absolute top-1/3 right-5 text-6xl opacity-25 animate-pulse hover:animate-bounce transition-all duration-500 cursor-pointer" style={{animationDelay: '1.5s'}}>🍛</div>
        <div className="absolute top-3/4 left-1/3 text-4xl opacity-20 animate-bounce hover:animate-spin transition-all duration-500 cursor-pointer" style={{animationDelay: '2.5s'}}>🥟</div>
        <div className="absolute top-1/4 right-1/3 text-5xl opacity-15 animate-pulse hover:animate-bounce transition-all duration-500 cursor-pointer" style={{animationDelay: '3s'}}>🍝</div>
        <div className="absolute bottom-1/3 left-1/2 text-6xl opacity-25 animate-bounce hover:animate-pulse transition-all duration-500 cursor-pointer" style={{animationDelay: '3.5s'}}>🥗</div>
        <div className="absolute top-2/3 right-1/4 text-4xl opacity-20 animate-pulse hover:animate-spin transition-all duration-500 cursor-pointer" style={{animationDelay: '4s'}}>🍲</div>
        
        {/* Enhanced Geometric Shapes with More Animations */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-ping hover:animate-bounce transition-all duration-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-300 opacity-20 rounded-full animate-pulse hover:animate-spin transition-all duration-500"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-300 opacity-15 rounded-full animate-bounce transform -translate-x-1/2 -translate-y-1/2 hover:animate-pulse transition-all duration-500"></div>
        <div className="absolute top-1/3 left-1/5 w-20 h-20 bg-purple-300 opacity-25 rounded-full animate-pulse hover:animate-bounce transition-all duration-500"></div>
        <div className="absolute bottom-1/3 right-1/5 w-28 h-28 bg-green-300 opacity-20 rounded-full animate-bounce hover:animate-ping transition-all duration-500" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/5 right-1/2 w-16 h-16 bg-blue-300 opacity-30 rounded-full animate-ping hover:animate-spin transition-all duration-500" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-white opacity-40 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-yellow-200 opacity-50 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-200 opacity-60 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/5 left-2/3 w-4 h-4 bg-orange-200 opacity-40 rounded-full animate-ping" style={{animationDelay: '3.5s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Enhanced Branding */}
          <div className="hidden lg:block animate-fade-in-left">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-10">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse hover:animate-spin transition-all duration-700 cursor-pointer">
                    <span className="text-6xl animate-bounce">🍽️</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce hover:animate-ping transition-all duration-300">
                    <span className="text-white text-xs animate-pulse">✨</span>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-white text-xs">🔥</span>
                  </div>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  <T>Food Bazaar</T>
                </h1>
                <p className="text-2xl text-gray-700 mb-4 font-medium">
                  <T>Connect. Supply. Grow.</T>
                </p>
                <p className="text-gray-600">
                  <T>India's Premier Street Food Marketplace</T>
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      <T>Smart Location Matching</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Find suppliers and vendors within 5km radius using our advanced location-based system</T>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🚚</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      <T>Fresh Supply Chain</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Direct connections with local suppliers for fresher ingredients and better prices</T>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      <T>Business Analytics</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Track orders, revenue, and business growth with detailed analytics and insights</T>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      <T>Multilingual Support</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Available in 7 Indian languages with real-time translation support</T>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Login Form */}
          <div className="w-full max-w-lg mx-auto animate-fade-in-right">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-float form-slide-up">
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-4xl">🔐</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs">🚀</span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  <T>Welcome Back!</T>
                </h2>
                <p className="text-gray-600 text-lg">
                  <T>Sign in to your food business account</T>
                </p>
              </div>

              {/* Enhanced Demo Access */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold">
                    <span>🚀</span>
                    <span><T>Quick Demo Access</T></span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      email: 'vendor@demo.com',
                      password: 'vendor123',
                      userType: 'vendor'
                    })}
                    className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center space-y-2">
                      <span className="text-3xl">🍽️</span>
                      <span><T>Food Vendor</T></span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      email: 'supplier@demo.com',
                      password: 'supplier123',
                      userType: 'supplier'
                    })}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex flex-col items-center space-y-2">
                      <span className="text-3xl">🏪</span>
                      <span><T>Food Supplier</T></span>
                    </div>
                  </button>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="text-sm text-blue-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">🍽️ <T>Vendor Demo</T>:</span>
                      <span className="font-mono text-xs">vendor@demo.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">🏪 <T>Supplier Demo</T>:</span>
                      <span className="font-mono text-xs">supplier@demo.com</span>
                    </div>
                    <div className="text-center text-xs text-blue-600 mt-2">
                      <T>Password: demo123 for both accounts</T>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <span className="flex items-center space-x-2">
                      <span>📧</span>
                      <span><T>Email Address</T></span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                      placeholder="Enter your email address"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span className="text-xl">✉️</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <span className="flex items-center space-x-2">
                      <span>🔑</span>
                      <span><T>Password</T></span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <span className="text-xl">{showPassword ? "🙈" : "👁️"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    <span className="flex items-center space-x-2">
                      <span>👤</span>
                      <span><T>Account Type</T></span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.userType === 'vendor' 
                        ? 'ring-4 ring-orange-200' 
                        : ''
                    }`}>
                      <input
                        type="radio"
                        name="userType"
                        value="vendor"
                        checked={formData.userType === 'vendor'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-6 border-3 rounded-2xl text-center transition-all duration-300 ${
                        formData.userType === 'vendor' 
                          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 text-orange-700 shadow-lg' 
                          : 'border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50'
                      }`}>
                        <div className="text-4xl mb-3">🍽️</div>
                        <div className="font-bold text-lg">
                          <T>Food Vendor</T>
                        </div>
                        <div className="text-sm opacity-75 mt-1">
                          <T>Restaurant, Cafe, Food Stall</T>
                        </div>
                      </div>
                    </label>
                    <label className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.userType === 'supplier' 
                        ? 'ring-4 ring-green-200' 
                        : ''
                    }`}>
                      <input
                        type="radio"
                        name="userType"
                        value="supplier"
                        checked={formData.userType === 'supplier'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-6 border-3 rounded-2xl text-center transition-all duration-300 ${
                        formData.userType === 'supplier' 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 shadow-lg' 
                          : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50'
                      }`}>
                        <div className="text-4xl mb-3">🏪</div>
                        <div className="font-bold text-lg">
                          <T>Food Supplier</T>
                        </div>
                        <div className="text-sm opacity-75 mt-1">
                          <T>Wholesaler, Distributor</T>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl animate-shake">
                    <div className="flex items-center space-x-3 text-red-700">
                      <span className="text-2xl">⚠️</span>
                      <span className="font-semibold">{error}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-red-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <span className="text-2xl">{loading ? "⏳" : "🚀"}</span>
                    <span>{loading ? <T>Signing In...</T> : <T>Sign In to Food Bazaar</T>}</span>
                  </div>
                </button>
              </form>

              <div className="mt-8 text-center animate-fade-in-up stagger-6">
                <p className="text-gray-600 mb-6 text-lg animate-fade-in-left stagger-6">
                  <T>New to Food Bazaar?</T>
                </p>
                <div className="relative">
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:rotate-2 animate-rainbow overflow-hidden button-slide-glow nav-button-hover"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                    <div className="relative flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-spin transition-all duration-700">✨</span>
                      <span><T>Create Your Account</T></span>
                      <span className="text-2xl group-hover:animate-bounce transition-all duration-300">🚀</span>
                    </div>
                  </Link>
                  
                  {/* Floating particles around the button */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute -top-1 -right-3 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute -bottom-2 -left-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                </div>
                
                {/* Additional call-to-action text with animation */}
                <div className="mt-6 animate-fade-in-up stagger-7">
                  <p className="text-sm text-gray-500 mb-3">
                    <T>Join thousands of food businesses already growing with us</T>
                  </p>
                  <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1 animate-bounce" style={{animationDelay: '0.2s'}}>
                      <span>🏪</span>
                      <span>500+ Suppliers</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1 animate-bounce" style={{animationDelay: '0.4s'}}>
                      <span>🍽️</span>
                      <span>1000+ Vendors</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1 animate-bounce" style={{animationDelay: '0.6s'}}>
                      <span>📈</span>
                      <span>Growing Daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;