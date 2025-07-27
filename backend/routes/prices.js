const express = require('express');
const router = express.Router();

// In-memory storage for mandi prices (replace with database in production)
let mandiPrices = [
  {
    id: '1',
    commodity: 'Rice',
    variety: 'Basmati',
    market: 'Delhi Mandi',
    price: 4500,
    unit: 'per quintal',
    change: 2.5,
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

// Middleware to authenticate JWT token (optional for price viewing)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Allow public access to price data
    req.user = null;
    return next();
  }

  // For demo purposes, we'll skip JWT verification
  req.user = { userId: 'demo-user', email: 'demo@example.com' };
  next();
}

// Get latest mandi prices
router.get('/latest', authenticateToken, (req, res) => {
  try {
    const { commodity, market, limit } = req.query;
    let filteredPrices = [...mandiPrices];

    // Filter by commodity
    if (commodity) {
      filteredPrices = filteredPrices.filter(price => 
        price.commodity.toLowerCase().includes(commodity.toLowerCase())
      );
    }

    // Filter by market
    if (market) {
      filteredPrices = filteredPrices.filter(price => 
        price.market.toLowerCase().includes(market.toLowerCase())
      );
    }

    // Limit results
    if (limit) {
      filteredPrices = filteredPrices.slice(0, parseInt(limit));
    }

    // Sort by last updated (newest first)
    filteredPrices.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

    res.json({
      success: true,
      prices: filteredPrices,
      total: filteredPrices.length,
      lastSync: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get price history for a specific commodity
router.get('/history/:commodity', authenticateToken, (req, res) => {
  try {
    const { commodity } = req.params;
    const { days = 7 } = req.query;

    // Mock historical data
    const mockHistory = [];
    const basePrice = mandiPrices.find(p => 
      p.commodity.toLowerCase() === commodity.toLowerCase()
    )?.price || 2000;

    for (let i = parseInt(days); i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const variation = (Math.random() - 0.5) * 200; // Random price variation
      mockHistory.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(basePrice + variation),
        volume: Math.round(Math.random() * 1000 + 500) // Mock volume
      });
    }

    res.json({
      success: true,
      commodity,
      history: mockHistory,
      period: `${days} days`
    });
  } catch (error) {
    console.error('Error fetching price history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get market summary
router.get('/summary', authenticateToken, (req, res) => {
  try {
    const summary = {
      totalCommodities: mandiPrices.length,
      marketsActive: [...new Set(mandiPrices.map(p => p.market))].length,
      pricesUp: mandiPrices.filter(p => p.trend === 'up').length,
      pricesDown: mandiPrices.filter(p => p.trend === 'down').length,
      averageChange: (mandiPrices.reduce((sum, p) => sum + p.changePercent, 0) / mandiPrices.length).toFixed(2),
      lastUpdated: new Date().toISOString(),
      topGainers: mandiPrices
        .filter(p => p.trend === 'up')
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 3),
      topLosers: mandiPrices
        .filter(p => p.trend === 'down')
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 3)
    };

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    console.error('Error fetching market summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to update prices (called by cron job)
const updateMandiPrices = async () => {
  try {
    console.log('🔄 Updating mandi prices...');
    
    // Mock API call to fetch latest prices
    // In production, this would call actual mandi API
    const mockApiResponse = await simulateMandiAPI();
    
    // Update prices with new data
    mandiPrices = mandiPrices.map(price => {
      const newData = mockApiResponse.find(item => item.commodity === price.commodity);
      if (newData) {
        const oldPrice = price.price;
        const newPrice = newData.price;
        const change = newPrice - oldPrice;
        const changePercent = ((change / oldPrice) * 100);
        
        return {
          ...price,
          price: newPrice,
          change: Math.round(change),
          changePercent: Math.round(changePercent * 100) / 100,
          lastUpdated: new Date().toISOString(),
          trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
        };
      }
      return price;
    });
    
    console.log('✅ Mandi prices updated successfully');
    return { success: true, updatedCount: mandiPrices.length };
  } catch (error) {
    console.error('❌ Error updating mandi prices:', error);
    return { success: false, error: error.message };
  }
};

// Simulate mandi API response
const simulateMandiAPI = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock price data with random variations
  return [
    { commodity: 'Rice', price: 4500 + Math.round((Math.random() - 0.5) * 200) },
    { commodity: 'Wheat', price: 2100 + Math.round((Math.random() - 0.5) * 100) },
    { commodity: 'Onion', price: 3200 + Math.round((Math.random() - 0.5) * 300) },
    { commodity: 'Tomato', price: 2800 + Math.round((Math.random() - 0.5) * 400) },
    { commodity: 'Potato', price: 1800 + Math.round((Math.random() - 0.5) * 150) }
  ];
};

// Manual price update endpoint (for testing)
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const result = await updateMandiPrices();
    res.json({
      success: result.success,
      message: result.success ? 'Prices updated successfully' : 'Failed to update prices',
      data: result.success ? { updatedCount: result.updatedCount } : { error: result.error }
    });
  } catch (error) {
    console.error('Error in manual price update:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the update function for use in cron job
module.exports = router;
module.exports.updateMandiPrices = updateMandiPrices;