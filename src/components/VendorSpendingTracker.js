import React, { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import T from './T';

const VendorSpendingTracker = ({ userId }) => {
  const [spendingData, setSpendingData] = useState({
    today: 0,
    yesterday: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    fetchSpendingData();
  }, [userId]);

  const fetchSpendingData = async () => {
    try {
      // Try to fetch from backend API
      const response = await fetch(`http://localhost:8000/api/vendor/spending/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setSpendingData(result.data);
      } else {
        // Fallback to mock data for demo
        generateMockSpendingData();
      }
    } catch (error) {
      console.error('Error fetching spending data:', error);
      // Fallback to mock data
      generateMockSpendingData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockSpendingData = () => {
    const mockData = {
      today: 2850,
      yesterday: 3200,
      thisWeek: 18500,
      lastWeek: 22100,
      thisMonth: 67800,
      recentOrders: [
        {
          id: 1,
          productName: 'Fresh Vegetables Mix',
          amount: 850,
          supplier: 'Fresh Veggie Hub',
          date: new Date().toISOString(),
          category: 'vegetables',
          period: 'today'
        },
        {
          id: 2,
          productName: 'Spice Masala Mix',
          amount: 1200,
          supplier: 'Mumbai Spice Suppliers',
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: 'spices',
          period: 'today'
        },
        {
          id: 3,
          productName: 'Basmati Rice',
          amount: 800,
          supplier: 'Grain Masters',
          date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: 'grains',
          period: 'today'
        }
      ],
      weekOrders: [
        {
          id: 4,
          productName: 'Onion Bulk Order',
          amount: 2500,
          supplier: 'Delhi Vegetable Market',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'vegetables',
          period: 'week'
        },
        {
          id: 5,
          productName: 'Cooking Oil - 5L',
          amount: 1800,
          supplier: 'Oil Suppliers Co.',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'oils',
          period: 'week'
        },
        {
          id: 6,
          productName: 'Chicken Fresh - 10kg',
          amount: 3200,
          supplier: 'Meat Market Delhi',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'meat',
          period: 'week'
        },
        {
          id: 7,
          productName: 'Tomato Bulk - 25kg',
          amount: 1500,
          supplier: 'Fresh Veggie Hub',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'vegetables',
          period: 'week'
        },
        {
          id: 8,
          productName: 'Garam Masala - 2kg',
          amount: 900,
          supplier: 'Mumbai Spice Suppliers',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'spices',
          period: 'week'
        }
      ],
      monthOrders: [
        {
          id: 9,
          productName: 'Wheat Flour - 50kg',
          amount: 4500,
          supplier: 'Grain Masters',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'grains',
          period: 'month'
        },
        {
          id: 10,
          productName: 'Paneer Fresh - 5kg',
          amount: 2800,
          supplier: 'Dairy Fresh Co.',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'dairy',
          period: 'month'
        },
        {
          id: 11,
          productName: 'Mixed Vegetables - 30kg',
          amount: 3500,
          supplier: 'Fresh Veggie Hub',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'vegetables',
          period: 'month'
        },
        {
          id: 12,
          productName: 'Red Chili Powder - 3kg',
          amount: 1200,
          supplier: 'Mumbai Spice Suppliers',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'spices',
          period: 'month'
        },
        {
          id: 13,
          productName: 'Mutton Fresh - 8kg',
          amount: 5600,
          supplier: 'Meat Market Delhi',
          date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'meat',
          period: 'month'
        },
        {
          id: 14,
          productName: 'Coconut Oil - 3L',
          amount: 1800,
          supplier: 'Oil Suppliers Co.',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'oils',
          period: 'month'
        }
      ]
    };
    setSpendingData(mockData);
  };

  const getSpendingChange = (current, previous) => {
    if (previous === 0) return { percentage: 0, isIncrease: false };
    const change = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      isIncrease: change > 0
    };
  };

  const todayChange = getSpendingChange(spendingData.today, spendingData.yesterday);
  const weekChange = getSpendingChange(spendingData.thisWeek, spendingData.lastWeek);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      vegetables: '🥬',
      fruits: '🍎',
      spices: '🌶️',
      grains: '🍛',
      dairy: '🥛',
      oils: '🫒',
      beverages: '🥤',
      snacks: '🍿',
      condiments: '🍯',
      meat: '🍖'
    };
    return emojis[category] || '🍽️';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <T>Daily Spending Tracker</T>
              </h3>
              <p className="text-sm text-gray-600">
                <T>Track your food procurement expenses</T>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600"><T>Today's Total</T></p>
            <p className="text-2xl font-bold text-green-600">
              {formatINR(spendingData.today)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Period Selector */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {[
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' }
          ].map(period => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period.key
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <T>{period.label}</T>
            </button>
          ))}
        </div>

        {/* Dynamic Spending Summary Based on Selected Period */}
        {selectedPeriod === 'today' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 font-medium">
                  <T>Today's Spending</T>
                </span>
                <div className={`flex items-center space-x-1 text-xs ${
                  todayChange.isIncrease ? 'text-red-600' : 'text-green-600'
                }`}>
                  <span>{todayChange.isIncrease ? '↗️' : '↘️'}</span>
                  <span>{todayChange.percentage}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {formatINR(spendingData.today)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                <T>vs yesterday</T>: {formatINR(spendingData.yesterday)}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 font-medium">
                  <T>Yesterday</T>
                </span>
                <span className="text-xs text-gray-500">📅</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {formatINR(spendingData.yesterday)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                <T>Previous day spending</T>
              </p>
            </div>
          </div>
        )}

        {selectedPeriod === 'week' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-600 font-medium">
                  <T>This Week</T>
                </span>
                <div className={`flex items-center space-x-1 text-xs ${
                  weekChange.isIncrease ? 'text-red-600' : 'text-green-600'
                }`}>
                  <span>{weekChange.isIncrease ? '↗️' : '↘️'}</span>
                  <span>{weekChange.percentage}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {formatINR(spendingData.thisWeek)}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                <T>vs last week</T>: {formatINR(spendingData.lastWeek)}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-orange-600 font-medium">
                  <T>Daily Average</T>
                </span>
                <span className="text-xs text-gray-500">📊</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">
                {formatINR(Math.round(spendingData.thisWeek / 7))}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                <T>Per day this week</T>
              </p>
            </div>
          </div>
        )}

        {selectedPeriod === 'month' && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-indigo-600 font-medium">
                  <T>This Month</T>
                </span>
                <span className="text-xs text-gray-500">📅</span>
              </div>
              <p className="text-2xl font-bold text-indigo-900">
                {formatINR(spendingData.thisMonth)}
              </p>
              <p className="text-xs text-indigo-600 mt-1">
                <T>Total monthly spending</T>
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-teal-600 font-medium">
                  <T>Daily Average</T>
                </span>
                <span className="text-xs text-gray-500">📈</span>
              </div>
              <p className="text-2xl font-bold text-teal-900">
                {formatINR(Math.round(spendingData.thisMonth / 30))}
              </p>
              <p className="text-xs text-teal-600 mt-1">
                <T>Per day this month</T>
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Recent Orders Based on Selected Period */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <span>📋</span>
            <span>
              {selectedPeriod === 'today' && <T>Recent Orders Today</T>}
              {selectedPeriod === 'week' && <T>This Week's Orders</T>}
              {selectedPeriod === 'month' && <T>This Month's Orders</T>}
            </span>
          </h4>
          
          {(() => {
            let ordersToShow = [];
            let emptyMessage = '';
            
            if (selectedPeriod === 'today') {
              ordersToShow = spendingData.recentOrders || [];
              emptyMessage = 'No orders placed today';
            } else if (selectedPeriod === 'week') {
              ordersToShow = spendingData.weekOrders || [];
              emptyMessage = 'No orders placed this week';
            } else if (selectedPeriod === 'month') {
              ordersToShow = spendingData.monthOrders || [];
              emptyMessage = 'No orders placed this month';
            }

            return ordersToShow.length > 0 ? (
              <div className="space-y-3">
                {ordersToShow.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getCategoryEmoji(order.category)}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{order.productName}</p>
                        <p className="text-xs text-gray-600">{order.supplier}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatINR(order.amount)}</p>
                      <p className="text-xs text-gray-500">
                        {selectedPeriod === 'today' 
                          ? formatTime(order.date)
                          : new Date(order.date).toLocaleDateString('en-IN', { 
                              month: 'short', 
                              day: 'numeric' 
                            })
                        }
                      </p>
                    </div>
                  </div>
                ))}
                {ordersToShow.length > 5 && (
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      <T>+{ordersToShow.length - 5} more orders</T>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <span className="text-4xl mb-2 block">🛒</span>
                <p className="text-sm"><T>{emptyMessage}</T></p>
              </div>
            );
          })()}
        </div>

        {/* Monthly Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600"><T>Monthly Total</T>:</span>
            <span className="text-lg font-bold text-gray-900">
              {formatINR(spendingData.thisMonth)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSpendingTracker;