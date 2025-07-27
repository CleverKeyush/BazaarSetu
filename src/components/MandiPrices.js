import React, { useState, useEffect } from 'react';

const MandiPrices = ({ showHeader = true, limit = null }) => {
  const [prices, setPrices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPrices();
    fetchSummary();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchPrices();
      fetchSummary();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [filter, limit]);

  const fetchPrices = async () => {
    try {
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit);
      
      const response = await fetch(`http://localhost:8000/api/prices/latest?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setPrices(data.prices);
        setLastUpdated(data.lastSync);
      }
    } catch (error) {
      // Mock data for demo
      const mockPrices = [
        {
          id: '1',
          commodity: 'Rice',
          variety: 'Basmati',
          market: 'Delhi Mandi',
          price: 4500,
          unit: 'per quintal',
          change: 25,
          changePercent: 0.56,
          lastUpdated: new Date().toISOString(),
          trend: 'up'
        },
        {
          id: '2',
          commodity: 'Wheat',
          variety: 'Sharbati',
          market: 'Punjab Mandi',
          price: 2100,
          unit: 'per quintal',
          change: -15,
          changePercent: -0.71,
          lastUpdated: new Date().toISOString(),
          trend: 'down'
        },
        {
          id: '3',
          commodity: 'Onion',
          variety: 'Red',
          market: 'Maharashtra Mandi',
          price: 3200,
          unit: 'per quintal',
          change: 150,
          changePercent: 4.92,
          lastUpdated: new Date().toISOString(),
          trend: 'up'
        },
        {
          id: '4',
          commodity: 'Tomato',
          variety: 'Hybrid',
          market: 'Karnataka Mandi',
          price: 2800,
          unit: 'per quintal',
          change: -200,
          changePercent: -6.67,
          lastUpdated: new Date().toISOString(),
          trend: 'down'
        },
        {
          id: '5',
          commodity: 'Potato',
          variety: 'Jyoti',
          market: 'UP Mandi',
          price: 1800,
          unit: 'per quintal',
          change: 50,
          changePercent: 2.86,
          lastUpdated: new Date().toISOString(),
          trend: 'up'
        }
      ];
      
      setPrices(limit ? mockPrices.slice(0, limit) : mockPrices);
      setLastUpdated(new Date().toISOString());
    }
    setLoading(false);
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/prices/summary');
      
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      }
    } catch (error) {
      // Mock summary for demo
      setSummary({
        totalCommodities: 5,
        marketsActive: 5,
        pricesUp: 3,
        pricesDown: 2,
        averageChange: 1.23,
        topGainers: [
          { commodity: 'Onion', changePercent: 4.92 },
          { commodity: 'Potato', changePercent: 2.86 },
          { commodity: 'Rice', changePercent: 0.56 }
        ],
        topLosers: [
          { commodity: 'Tomato', changePercent: -6.67 },
          { commodity: 'Wheat', changePercent: -0.71 }
        ]
      });
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mandi Prices</h2>
            <p className="text-gray-600">Real-time commodity prices from major markets</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Last updated</div>
            <div className="font-medium text-gray-900">
              {lastUpdated ? formatTime(lastUpdated) : 'Loading...'}
            </div>
          </div>
        </div>
      )}

      {/* Market Summary */}
      {summary && showHeader && (
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Total Commodities</div>
            <div className="text-2xl font-bold text-blue-600">{summary.totalCommodities}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Active Markets</div>
            <div className="text-2xl font-bold text-green-600">{summary.marketsActive}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Prices Up</div>
            <div className="text-2xl font-bold text-green-600">{summary.pricesUp}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">Prices Down</div>
            <div className="text-2xl font-bold text-red-600">{summary.pricesDown}</div>
          </div>
        </div>
      )}

      {/* Price Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commodity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prices.map((price) => (
                <tr key={price.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{price.commodity}</div>
                      <div className="text-sm text-gray-500">{price.variety}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{price.market}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{price.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">{price.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                      {price.change > 0 ? '+' : ''}₹{price.change}
                    </div>
                    <div className={`text-sm ${getTrendColor(price.trend)}`}>
                      {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg">{getTrendIcon(price.trend)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Gainers and Losers */}
      {summary && showHeader && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Top Gainers</h3>
            <div className="space-y-3">
              {summary.topGainers.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900">{item.commodity}</span>
                  <span className="text-green-600 font-medium">+{item.changePercent}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📉 Top Losers</h3>
            <div className="space-y-3">
              {summary.topLosers.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-900">{item.commodity}</span>
                  <span className="text-red-600 font-medium">{item.changePercent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!showHeader && prices.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-600">No price data available</p>
        </div>
      )}
    </div>
  );
};

export default MandiPrices;