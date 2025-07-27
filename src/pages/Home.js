import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import EnhancedCard from '../components/EnhancedCard';
import InteractiveButton from '../components/InteractiveButton';
import T from '../components/T';
import '../styles/animations.css';

const Home = () => {
    const { user } = useAuth();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const heroSlides = [
        {
            title: "🍽️ India's Street Food Network",
            subtitle: "Connect with authentic street food vendors and suppliers across India",
            icon: "🍽️",
            gradient: "from-orange-500 to-red-500"
        },
        {
            title: "🗺️ Discover Street Food Vendors",
            subtitle: "Find the best street food vendors near you with real-time location mapping",
            icon: "🗺️",
            gradient: "from-green-500 to-teal-500"
        },
        {
            title: "🚚 Fresh Ingredients Supply",
            subtitle: "Direct supply chain from local suppliers to street food vendors",
            icon: "🚚",
            gradient: "from-blue-500 to-purple-500"
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-6xl animate-bounce">🕉️</div>
                <div className="absolute top-20 right-20 text-5xl animate-pulse">🚩</div>
                <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🪔</div>
                <div className="absolute bottom-10 right-10 text-5xl animate-pulse" style={{ animationDelay: '2s' }}>🌺</div>
                <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🙏</div>
                <div className="absolute top-1/3 right-5 text-4xl animate-pulse" style={{ animationDelay: '1.5s' }}>🔱</div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Hero Section with BazaarSetu Branding */}
                <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    {/* Main Logo and Branding */}
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-4 bg-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-orange-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-float">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <span className="text-4xl">🚩</span>
                            </div>
                            <div className="text-left">
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                                    <T>BazaarSetu</T>
                                </h1>
                                <p className="text-lg text-gray-600 font-medium">
                                    <T>जय श्री राम • भारतीय खाद्य बाज़ार</T>
                                </p>
                                <p className="text-sm text-gray-500">
                                    <T>Connecting India's Food Ecosystem</T>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Hero Content */}
                    <div className="mb-12">
                        <div className={`inline-block p-8 bg-gradient-to-r ${heroSlides[currentSlide].gradient} rounded-full mb-8 shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce`}>
                            <span className="text-6xl">{heroSlides[currentSlide].icon}</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                            <T>{heroSlides[currentSlide].title}</T>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            <T>{heroSlides[currentSlide].subtitle}</T>
                        </p>

                        {/* Slide indicators */}
                        <div className="flex justify-center space-x-3 mb-8">
                            {heroSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentSlide
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 w-12 shadow-lg'
                                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Indian Cultural Quote */}
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 px-8 py-6 rounded-2xl border-2 border-orange-200 max-w-4xl mx-auto mb-12 hover:shadow-lg transition-all duration-300">
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            <T>"अन्नदाता सुखी भव" - May the food provider be blessed</T>
                        </p>
                        <p className="text-sm text-gray-600">
                            <T>Empowering India's food vendors and suppliers with technology</T>
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-center">

                    {user ? (
                        <EnhancedCard
                            className="max-w-4xl mx-auto mb-20"
                            hover={true}
                            glow={true}
                            gradient={true}
                            animation="scale"
                        >
                            <div className="text-center">
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                                        <span className="text-3xl font-bold text-white">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    <T>Welcome back, {user.name || 'User'}!</T>
                                </h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    <T>You're logged in as a {user.userType || 'user'} from {user.company || 'your company'}</T>
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <InteractiveButton
                                        to={user.userType === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                                        variant="gradient"
                                        size="lg"
                                        animation="glow"
                                        icon="📊"
                                    >
                                        <T>Dashboard</T>
                                    </InteractiveButton>
                                    <InteractiveButton
                                        to="/location-discovery"
                                        variant="success"
                                        size="lg"
                                        animation="pulse"
                                        icon="🎯"
                                    >
                                        <T>Find Nearby</T>
                                    </InteractiveButton>
                                    <InteractiveButton
                                        to="/group-orders"
                                        variant="warning"
                                        size="lg"
                                        animation="bounce"
                                        icon="🤝"
                                    >
                                        <T>Group Orders</T>
                                    </InteractiveButton>
                                </div>
                            </div>
                        </EnhancedCard>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                            <EnhancedCard
                                hover={true}
                                glow={true}
                                animation="slide-up"
                                className="transform hover:rotate-1"
                            >
                                <div className="text-center">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
                                            <span className="text-4xl">🍽️</span>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                        <T>Street Food Vendors</T>
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                        <T>Find reliable food suppliers and manage your food inventory efficiently</T>
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Connect with local suppliers</T></span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Manage inventory efficiently</T></span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Join group orders for better prices</T></span>
                                        </div>
                                    </div>

                                    <InteractiveButton
                                        to="/register"
                                        variant="primary"
                                        size="lg"
                                        animation="glow"
                                        icon="🚀"
                                        className="w-full"
                                    >
                                        <T>Get Started as Food Vendor</T>
                                    </InteractiveButton>
                                </div>
                            </EnhancedCard>

                            <EnhancedCard
                                hover={true}
                                glow={true}
                                animation="slide-up"
                                className="transform hover:-rotate-1"
                            >
                                <div className="text-center">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                                            <span className="text-4xl">🏪</span>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                        <T>Food Suppliers</T>
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                        <T>Showcase your food products and connect with street food vendors</T>
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Reach more food vendors</T></span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Showcase your products</T></span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                            <span className="text-green-500">✓</span>
                                            <span><T>Manage bulk orders easily</T></span>
                                        </div>
                                    </div>

                                    <InteractiveButton
                                        to="/register"
                                        variant="success"
                                        size="lg"
                                        animation="glow"
                                        icon="🌟"
                                        className="w-full"
                                    >
                                        <T>Get Started as Food Supplier</T>
                                    </InteractiveButton>
                                </div>
                            </EnhancedCard>
                        </div>
                    )}

                    {/* Enhanced Group Orders Section */}
                    <EnhancedCard
                        className="max-w-6xl mx-auto mt-20 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white border-none"
                        hover={true}
                        glow={true}
                        animation="fade-in"
                    >
                        <div className="text-center">
                            <div className="mb-8">
                                <div className="text-8xl mb-6 animate-bounce">🤝</div>
                                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    <T>Bulk Food Orders</T>
                                </h2>
                                <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                                    <T>Join forces with other food vendors for bulk purchasing power</T>
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                <div className="bg-white bg-opacity-15 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-25 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                                    <div className="text-5xl mb-6 animate-pulse">💰</div>
                                    <h3 className="font-bold text-2xl mb-4 text-yellow-300"><T>Better Prices</T></h3>
                                    <p className="text-base opacity-90 leading-relaxed">
                                        <T>Get volume discounts through collective buying</T>
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-15 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-25 transition-all duration-500 transform hover:scale-105" style={{ animationDelay: '0.2s' }}>
                                    <div className="text-5xl mb-6 animate-pulse" style={{ animationDelay: '0.5s' }}>🚀</div>
                                    <h3 className="font-bold text-2xl mb-4 text-green-300"><T>Faster Delivery</T></h3>
                                    <p className="text-base opacity-90 leading-relaxed">
                                        <T>Suppliers prioritize larger combined orders</T>
                                    </p>
                                </div>
                                <div className="bg-white bg-opacity-15 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-25 transition-all duration-500 transform hover:scale-105 hover:-rotate-1" style={{ animationDelay: '0.4s' }}>
                                    <div className="text-5xl mb-6 animate-pulse" style={{ animationDelay: '1s' }}>🤝</div>
                                    <h3 className="font-bold text-2xl mb-4 text-blue-300"><T>Network Building</T></h3>
                                    <p className="text-base opacity-90 leading-relaxed">
                                        <T>Connect with other vendors in your industry</T>
                                    </p>
                                </div>
                            </div>

                            {user ? (
                                <InteractiveButton
                                    to="/group-orders"
                                    variant="secondary"
                                    size="xl"
                                    animation="bounce"
                                    icon="🚀"
                                    className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl"
                                >
                                    <T>Explore Group Orders</T>
                                </InteractiveButton>
                            ) : (
                                <InteractiveButton
                                    to="/login"
                                    variant="secondary"
                                    size="xl"
                                    animation="glow"
                                    icon="🔐"
                                    className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl"
                                >
                                    <T>Login to Join Group Orders</T>
                                </InteractiveButton>
                            )}
                        </div>
                    </EnhancedCard>

                    {/* Features Section */}
                    <div className="mt-20 mb-16">
                        <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            <T>Why Choose BazaarSetu?</T>
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-100">
                                <div className="text-4xl mb-4 text-center animate-bounce">🗺️</div>
                                <h4 className="font-bold text-lg mb-2 text-center text-gray-800">
                                    <T>Location-Based</T>
                                </h4>
                                <p className="text-sm text-gray-600 text-center">
                                    <T>Find suppliers within 5km radius</T>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-100">
                                <div className="text-4xl mb-4 text-center animate-pulse">🌍</div>
                                <h4 className="font-bold text-lg mb-2 text-center text-gray-800">
                                    <T>Multi-Language</T>
                                </h4>
                                <p className="text-sm text-gray-600 text-center">
                                    <T>Available in 7 Indian languages</T>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-100">
                                <div className="text-4xl mb-4 text-center animate-bounce" style={{ animationDelay: '0.5s' }}>📊</div>
                                <h4 className="font-bold text-lg mb-2 text-center text-gray-800">
                                    <T>Real-Time Prices</T>
                                </h4>
                                <p className="text-sm text-gray-600 text-center">
                                    <T>Live mandi rates and market data</T>
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-100">
                                <div className="text-4xl mb-4 text-center animate-pulse" style={{ animationDelay: '1s' }}>🤝</div>
                                <h4 className="font-bold text-lg mb-2 text-center text-gray-800">
                                    <T>Group Orders</T>
                                </h4>
                                <p className="text-sm text-gray-600 text-center">
                                    <T>Bulk purchasing for better prices</T>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 px-8 rounded-3xl shadow-2xl max-w-6xl mx-auto mt-16">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold mb-4">
                                <T>Growing Community</T>
                            </h3>
                            <p className="text-xl opacity-90">
                                <T>Join thousands of food businesses across India</T>
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2 animate-bounce">1000+</div>
                                <p className="text-lg opacity-90"><T>Food Vendors</T></p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2 animate-pulse">500+</div>
                                <p className="text-lg opacity-90"><T>Suppliers</T></p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2 animate-bounce" style={{ animationDelay: '0.5s' }}>50+</div>
                                <p className="text-lg opacity-90"><T>Cities</T></p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2 animate-pulse" style={{ animationDelay: '1s' }}>₹10L+</div>
                                <p className="text-lg opacity-90"><T>Monthly GMV</T></p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    {!user && (
                        <div className="mt-20 text-center">
                            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-3xl border-2 border-orange-200 max-w-4xl mx-auto">
                                <div className="text-6xl mb-6">🚀</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                    <T>Ready to Transform Your Food Business?</T>
                                </h3>
                                <p className="text-lg text-gray-600 mb-8">
                                    <T>Join BazaarSetu today and connect with India's largest food ecosystem</T>
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <InteractiveButton
                                        to="/register"
                                        variant="primary"
                                        size="xl"
                                        animation="glow"
                                        icon="🍽️"
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                    >
                                        <T>Join as Vendor</T>
                                    </InteractiveButton>
                                    <InteractiveButton
                                        to="/register"
                                        variant="success"
                                        size="xl"
                                        animation="glow"
                                        icon="🏪"
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    >
                                        <T>Join as Supplier</T>
                                    </InteractiveButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;