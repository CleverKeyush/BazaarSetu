import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OpenLayersMap, { streetFoodVendors } from '../components/OpenLayersMap';
import { formatINR } from '../utils/currency';
import T from '../components/T';

const SupplierDashboard = () => {
  const { user } = useAuth();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    acceptedOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsResponse = await fetch('http://localhost:8000/api/supplier/dashboard-stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }

      // Fetch recent orders
      const ordersResponse = await fetch('http://localhost:8000/api/supplier/orders?limit=5', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData.orders.slice(0, 5));
      }

      // Fetch products
      const productsResponse = await fetch('http://localhost:8000/api/products/my-products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setTopProducts(productsData.products.slice(0, 3));
      }
    } catch (error) {
      // Mock food-focused data for demo
      setStats({
        totalProducts: 18,
        activeProducts: 15,
        totalOrders: 42,
        pendingOrders: 8,
        acceptedOrders: 28,
        completedOrders: 6,
        totalRevenue: 15750,
        monthlyRevenue: 4850
      });

      setRecentOrders([
        {
          id: '1',
          groupOrderTitle: 'Bulk Spice Order for Restaurants',
          productName: 'Premium Garam Masala Mix - 25kg',
          vendorName: 'Spice Palace Restaurant',
          vendorCompany: 'Mumbai Food Ventures',
          quantity: 25,
          totalValue: 3750.00,
          status: 'pending',
          requestedAt: '2025-01-25T00:00:00.000Z'
        },
        {
          id: '2',
          groupOrderTitle: 'Fresh Vegetable Bulk Supply',
          productName: 'Organic Mixed Vegetables - 500kg',
          vendorName: 'Green Garden Cafe',
          vendorCompany: 'Healthy Eats Chain',
          quantity: 500,
          totalValue: 12500.00,
          status: 'accepted',
          requestedAt: '2025-01-22T00:00:00.000Z'
        },
        {
          id: '3',
          groupOrderTitle: 'Rice & Grains Bulk Order',
          productName: 'Basmati Rice Premium - 100kg',
          vendorName: 'Delhi Dhaba',
          vendorCompany: 'Traditional Foods Ltd',
          quantity: 100,
          totalValue: 8900.00,
          status: 'completed',
          requestedAt: '2025-01-20T00:00:00.000Z'
        }
      ]);

      setTopProducts([
        {
          id: '1',
          name: 'Premium Garam Masala Mix',
          category: 'Spices & Seasonings',
          price: 150.00,
          stockQuantity: 200,
          emoji: '🌶️'
        },
        {
          id: '2',
          name: 'Organic Mixed Vegetables',
          category: 'Fresh Produce',
          price: 25.00,
          stockQuantity: 1500,
          emoji: '🥬'
        },
        {
          id: '3',
          name: 'Basmati Rice Premium',
          category: 'Grains & Cereals',
          price: 89.00,
          stockQuantity: 500,
          emoji: '🍛'
        }
      ]);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/supplier/orders/${orderId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notes: 'Order accepted and will be processed soon'
        })
      });

      if (response.ok) {
        // Refresh orders data
        fetchDashboardData();
        alert('Order accepted successfully!');
      } else {
        alert('Failed to accept order');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      // Update local state for demo
      setRecentOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'accepted', acceptedAt: new Date().toISOString() }
            : order
        )
      );
      alert('Order accepted successfully!');
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/supplier/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'rejected',
          notes: 'Unable to fulfill this order at this time'
        })
      });

      if (response.ok) {
        fetchDashboardData();
        alert('Order rejected');
      } else {
        alert('Failed to reject order');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      // Update local state for demo
      setRecentOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'rejected', rejectedAt: new Date().toISOString() }
            : order
        )
      );
      alert('Order rejected');
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/supplier/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'completed',
          notes: 'Order completed and delivered'
        })
      });

      if (response.ok) {
        fetchDashboardData();
        alert('Order marked as completed!');
      } else {
        alert('Failed to complete order');
      }
    } catch (error) {
      console.error('Error completing order:', error);
      // Update local state for demo
      setRecentOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'completed', completedAt: new Date().toISOString() }
            : order
        )
      );
      alert('Order marked as completed!');
    }
  };

  const handleContactVendor = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/supplier/orders/${orderId}/contact`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const contact = data.contact;
        
        // Show contact options
        const contactMethod = window.confirm(
          `Contact ${contact.name} from ${contact.company}\n\n` +
          `Email: ${contact.email}\n` +
          `Phone: ${contact.phone}\n` +
          `WhatsApp: ${contact.whatsapp}\n\n` +
          `Click OK to send email, Cancel to call`
        );

        if (contactMethod) {
          // Open email client
          window.location.href = `mailto:${contact.email}?subject=Regarding Order ${orderId}&body=Hello ${contact.name},%0D%0A%0D%0ARegarding your order for ${data.order.productName}...`;
        } else {
          // Open phone dialer
          window.location.href = `tel:${contact.phone}`;
        }
      } else {
        alert('Failed to get contact information');
      }
    } catch (error) {
      console.error('Error getting contact info:', error);
      // Fallback contact info for demo
      const order = recentOrders.find(o => o.id === orderId);
      if (order) {
        const contactMethod = window.confirm(
          `Contact ${order.vendorName} from ${order.vendorCompany}\n\n` +
          `Email: ${order.vendorName.toLowerCase().replace(' ', '.')}@${order.vendorCompany.toLowerCase().replace(' ', '')}.com\n` +
          `Phone: +91-98765-43210\n` +
          `WhatsApp: +91-98765-43210\n\n` +
          `Click OK to send email, Cancel to call`
        );

        if (contactMethod) {
          window.location.href = `mailto:${order.vendorName.toLowerCase().replace(' ', '.')}@${order.vendorCompany.toLowerCase().replace(' ', '')}.com?subject=Regarding Order ${orderId}&body=Hello ${order.vendorName},%0D%0A%0D%0ARegarding your order for ${order.productName}...`;
        } else {
          window.location.href = `tel:+91-98765-43210`;
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          {/* Enhanced User Welcome Section */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-4 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl font-bold text-white">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  <T>Welcome back, {user?.name || 'User'}!</T>
                </h2>
                <p className="text-green-600 font-medium flex items-center space-x-2">
                  <span>🏪</span>
                  <span><T>{user?.company || 'Food Supply Business'}</T></span>
                  <span className="text-gray-400">•</span>
                  <span className="text-blue-600 font-semibold"><T>Supplier Account</T></span>
                </p>
              </div>
            </div>
          </div>

          <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 animate-bounce">
            <span className="text-4xl">🏪</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <T>Street Food Supplier Dashboard</T>
          </h1>
          <p className="text-gray-600 text-lg">
            <T>Supply fresh ingredients to street food vendors across India</T>
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'products', label: 'Products' },
            { key: 'orders', label: 'Orders' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Food-focused Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <T>Food Products</T>
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
                    <p className="text-sm text-gray-500"><T>{stats.activeProducts} active items</T></p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">🍽️</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <T>Pending Orders</T>
                    </h3>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                    <p className="text-sm text-gray-500"><T>Need attention</T></p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <T>Active Orders</T>
                    </h3>
                    <p className="text-3xl font-bold text-green-600">{stats.acceptedOrders}</p>
                    <p className="text-sm text-gray-500"><T>In progress</T></p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">🚚</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <T>Monthly Revenue</T>
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">₹{stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500"><T>This month</T></p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Vendors Map Section */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        🗺️ <T>Find Food Vendors Near You</T>
                      </h2>
                      <p className="text-sm text-gray-600">
                        <T>Connect with food vendors and restaurants across India</T>
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to="/location-discovery"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors font-medium shadow-md hover:shadow-lg"
                      >
                        <T>🎯 Find Nearby Vendors</T>
                      </Link>
                      <Link 
                        to="/maps" 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        <T>View Full Map</T>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <OpenLayersMap onVendorSelect={setSelectedVendor} selectedVendor={selectedVendor} />
                </div>
              </div>
            </div>

            {/* Recent Food Orders and Top Food Products */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      🍽️ <T>Recent Food Order Requests</T>
                    </h2>
                    <Link to="#" onClick={() => setActiveTab('orders')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      <T>View All</T>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{order.productName}</p>
                            <p className="text-sm text-gray-600">{order.vendorName} • {order.quantity} units</p>
                            <p className="text-xs text-gray-500">{order.vendorCompany}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            <T>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</T>
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-600">₹{order.totalValue.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">{formatDate(order.requestedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      🥘 <T>Your Food Products</T>
                    </h2>
                    <Link to="#" onClick={() => setActiveTab('products')} className="text-green-600 hover:text-green-800 text-sm font-medium">
                      <T>Manage All</T>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{product.emoji}</span>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">₹{product.price}</p>
                          <p className="text-sm text-gray-500">{product.stockQuantity} <T>in stock</T></p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                    >
                      <T>Add New Food Product</T>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
              <Link 
                to="/product-management"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage All Products
              </Link>
            </div>
            
            <div className="grid gap-4">
              {topProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-green-600 font-medium">{formatINR(product.price)}</span>
                        <span className="text-gray-500">{product.stockQuantity} in stock</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  </div>
                </div>
              ))}
              
              {topProducts.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">📦</div>
                  <p className="text-gray-600 mb-4">No products yet</p>
                  <Link 
                    to="/product-management"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Add Your First Product
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Order Status Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
                {[
                  { key: 'all', label: 'All Orders' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'accepted', label: 'Accepted' },
                  { key: 'completed', label: 'Completed' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {order.groupOrderTitle}
                      </h3>
                      <p className="text-gray-600 mb-2">Product: {order.productName}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>From: {order.vendorName} ({order.vendorCompany})</span>
                        <span>•</span>
                        <span>Requested: {formatDate(order.requestedAt)}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-semibold">{order.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="font-semibold text-green-600">{formatINR(order.totalValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{order.location}</p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Notes:</p>
                      <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">{order.notes}</p>
                    </div>
                  )}

                  {order.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Accept Order
                      </button>
                      <button 
                        onClick={() => handleRejectOrder(order.id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Reject Order
                      </button>
                    </div>
                  )}

                  {order.status === 'accepted' && (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleCompleteOrder(order.id)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Mark as Completed
                      </button>
                      <button 
                        onClick={() => handleContactVendor(order.id)}
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Contact Vendor
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {recentOrders.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600">Orders from vendors will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;