import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import T from '../components/T';
import '../styles/animations.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'vendor',
    company: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, user } = useAuth();
  const navigate = useNavigate();

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      // Redirect to appropriate dashboard
      const redirectPath = formData.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard';
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen relative overflow-hidden page-transition-container slider-enter-from-right">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-tl from-teal-400 via-green-500 to-blue-600 opacity-70"></div>
        
        {/* Floating Food Icons */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🥗</div>
        <div className="absolute top-20 right-20 text-5xl opacity-30 animate-pulse">🍲</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-25 animate-bounce" style={{animationDelay: '1s'}}>🥘</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}>🍛</div>
        <div className="absolute top-1/2 left-5 text-5xl opacity-15 animate-bounce" style={{animationDelay: '0.5s'}}>🥙</div>
        <div className="absolute top-1/3 right-5 text-6xl opacity-25 animate-pulse" style={{animationDelay: '1.5s'}}>🍜</div>
        <div className="absolute top-3/4 left-1/3 text-4xl opacity-20 animate-bounce" style={{animationDelay: '2.5s'}}>🥟</div>
        <div className="absolute top-1/4 right-1/3 text-5xl opacity-15 animate-pulse" style={{animationDelay: '3s'}}>🍝</div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-300 opacity-15 rounded-full animate-bounce transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 left-1/5 w-20 h-20 bg-purple-300 opacity-25 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Registration Form */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-float form-slide-up">
              <div className="text-center mb-8">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
                    <span className="text-4xl">✨</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">🚀</span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                  <T>Join Food Bazaar</T>
                </h2>
                <p className="text-gray-600 text-lg">
                  <T>Start your food business journey today</T>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <span className="flex items-center space-x-2">
                        <span>👤</span>
                        <span><T>Full Name</T></span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <span className="text-xl">👨‍💼</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <span className="flex items-center space-x-2">
                        <span>🏢</span>
                        <span><T>Company Name</T></span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                        placeholder="Your business name"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <span className="text-xl">🏪</span>
                      </div>
                    </div>
                  </div>
                </div>

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
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                      placeholder="Enter your email address"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span className="text-xl">✉️</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    <span className="flex items-center space-x-2">
                      <span>🎯</span>
                      <span><T>Business Type</T></span>
                    </span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="text-5xl mb-3">🍽️</div>
                        <div className="font-bold text-lg mb-2">
                          <T>Food Vendor</T>
                        </div>
                        <div className="text-sm opacity-75">
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
                        <div className="text-5xl mb-3">🏪</div>
                        <div className="font-bold text-lg mb-2">
                          <T>Food Supplier</T>
                        </div>
                        <div className="text-sm opacity-75">
                          <T>Wholesaler, Distributor</T>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-300 bg-gray-50 hover:bg-white text-lg pr-12"
                        placeholder="Create password"
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
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                                passwordStrength >= level
                                  ? passwordStrength === 1
                                    ? 'bg-red-400'
                                    : passwordStrength === 2
                                    ? 'bg-yellow-400'
                                    : passwordStrength === 3
                                    ? 'bg-blue-400'
                                    : 'bg-green-400'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs mt-1 text-gray-600">
                          <T>Password strength: {passwordStrength === 1 ? 'Weak' : passwordStrength === 2 ? 'Fair' : passwordStrength === 3 ? 'Good' : passwordStrength === 4 ? 'Strong' : 'Too short'}</T>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      <span className="flex items-center space-x-2">
                        <span>🔒</span>
                        <span><T>Confirm Password</T></span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-lg pr-12 ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                            : 'border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-200'
                        }`}
                        placeholder="Confirm password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <span className="text-xl">{showConfirmPassword ? "🙈" : "👁️"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Validation Checklist */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <span>✅</span>
                    <span><T>Password Requirements</T></span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className={`flex items-center space-x-2 text-sm ${
                      formData.password.length >= 6 ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <span>{formData.password.length >= 6 ? '✅' : '⭕'}</span>
                      <span><T>At least 6 characters</T></span>
                    </div>
                    <div className={`flex items-center space-x-2 text-sm ${
                      formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <span>{formData.confirmPassword && formData.password === formData.confirmPassword ? '✅' : '⭕'}</span>
                      <span><T>Passwords match</T></span>
                    </div>
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
                  disabled={loading || (formData.password !== formData.confirmPassword) || formData.password.length < 6}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:via-blue-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <span className="text-2xl">{loading ? "⏳" : "🚀"}</span>
                    <span>{loading ? <T>Creating Account...</T> : <T>Create Food Bazaar Account</T>}</span>
                  </div>
                </button>
              </form>

              <div className="mt-8 text-center animate-fade-in-up stagger-8">
                <p className="text-gray-600 mb-6 text-lg animate-fade-in-left stagger-8">
                  <T>Already have an account?</T>
                </p>
                <div className="relative">
                  <Link
                    to="/login"
                    className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-rotate-2 animate-rainbow overflow-hidden button-slide-glow nav-button-hover"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                    <div className="relative flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-spin transition-all duration-700">🔐</span>
                      <span><T>Sign In Instead</T></span>
                      <span className="text-2xl group-hover:animate-bounce transition-all duration-300">⚡</span>
                    </div>
                  </Link>
                  
                  {/* Floating particles around the button */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute -top-1 -right-3 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute -bottom-2 -left-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1.5s'}}></div>
                </div>
                
                {/* Additional call-to-action text with animation */}
                <div className="mt-6 animate-fade-in-up stagger-9">
                  <p className="text-sm text-gray-500 mb-3">
                    <T>Quick access to your existing business dashboard</T>
                  </p>
                  <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1 animate-pulse" style={{animationDelay: '0.2s'}}>
                      <span>⚡</span>
                      <span>Instant Login</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1 animate-pulse" style={{animationDelay: '0.4s'}}>
                      <span>📊</span>
                      <span>Dashboard Access</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center space-x-1 animate-pulse" style={{animationDelay: '0.6s'}}>
                      <span>🚀</span>
                      <span>Start Trading</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Benefits */}
          <div className="hidden lg:block">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
              <div className="text-center mb-10">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <span className="text-6xl">🌟</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">✨</span>
                  </div>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  <T>Why Join Us?</T>
                </h1>
                <p className="text-2xl text-gray-700 mb-4 font-medium">
                  <T>Transform your food business with our platform</T>
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      <T>Smart Location Matching</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Find suppliers and vendors within your delivery range using our advanced location-based system</T>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🚚</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      <T>Fresh Supply Chain</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Connect directly with local suppliers for fresher ingredients and better prices</T>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      <T>Business Analytics</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Track your orders, revenue, and business growth with detailed analytics</T>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      <T>Community Network</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Join a thriving community of food businesses across India</T>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      <T>Multi-Language Support</T>
                    </h3>
                    <p className="text-gray-600">
                      <T>Available in 7 Indian languages with real-time translation</T>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl border border-green-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h4 className="font-bold text-green-800 text-xl mb-2">
                    <T>Free to Join!</T>
                  </h4>
                  <p className="text-green-700">
                    <T>Start connecting with food businesses today at no cost</T>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;