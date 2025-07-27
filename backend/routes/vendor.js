const express = require('express');
const router = express.Router();

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // For demo purposes, we'll skip JWT verification
  req.user = { userId: 'vendor-1', email: 'vendor@demo.com', userType: 'vendor' };
  next();
}

// Get vendor spending data
router.get('/spending/:userId', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock spending data for demo (in production, calculate from actual orders)
    const spendingData = {
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
          category: 'vegetables'
        },
        {
          id: 2,
          productName: 'Spice Masala Mix',
          amount: 1200,
          supplier: 'Mumbai Spice Suppliers',
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: 'spices'
        },
        {
          id: 3,
          productName: 'Basmati Rice',
          amount: 800,
          supplier: 'Grain Masters',
          date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: 'grains'
        }
      ]
    };

    res.json({
      success: true,
      data: spendingData
    });
  } catch (error) {
    console.error('Error fetching vendor spending:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get today's spending
router.get('/spending/today', authenticateToken, (req, res) => {
  try {
    const todaySpending = {
      total: 2850,
      orders: [
        {
          id: 1,
          productName: 'Fresh Vegetables Mix',
          amount: 850,
          supplier: 'Fresh Veggie Hub',
          time: new Date().toISOString(),
          category: 'vegetables'
        },
        {
          id: 2,
          productName: 'Spice Masala Mix',
          amount: 1200,
          supplier: 'Mumbai Spice Suppliers',
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: 'spices'
        },
        {
          id: 3,
          productName: 'Basmati Rice',
          amount: 800,
          supplier: 'Grain Masters',
          time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: 'grains'
        }
      ]
    };

    res.json({
      success: true,
      data: todaySpending
    });
  } catch (error) {
    console.error('Error fetching today spending:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weekly spending
router.get('/spending/week', authenticateToken, (req, res) => {
  try {
    const weeklySpending = {
      total: 18500,
      daily: [
        { day: 'Monday', amount: 2500 },
        { day: 'Tuesday', amount: 3200 },
        { day: 'Wednesday', amount: 2850 },
        { day: 'Thursday', amount: 3100 },
        { day: 'Friday', amount: 2950 },
        { day: 'Saturday', amount: 2400 },
        { day: 'Sunday', amount: 1500 }
      ]
    };

    res.json({
      success: true,
      data: weeklySpending
    });
  } catch (error) {
    console.error('Error fetching weekly spending:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get nearby food suppliers
router.get('/suppliers/nearby', authenticateToken, (req, res) => {
  try {
    const { lat, lng, radius = 5, category } = req.query;
    
    // Mock nearby food suppliers data (in production, use geospatial queries)
    const nearbySuppliers = [
      {
        id: 'supplier-1',
        name: 'Rajesh Spice Co.',
        category: 'spices',
        rating: 4.8,
        ordersCompleted: 23,
        location: 'Khari Baoli, Delhi',
        distance: 2.3,
        coordinates: { lat: 28.6562, lng: 77.2410 },
        specialties: ['Garam Masala', 'Red Chili Powder', 'Turmeric'],
        priceRange: '₹50-₹500 per kg',
        image: '🌶️'
      },
      {
        id: 'supplier-2',
        name: 'Fresh Veggie Mart',
        category: 'vegetables',
        rating: 4.6,
        ordersCompleted: 18,
        location: 'Azadpur Mandi, Delhi',
        distance: 4.1,
        coordinates: { lat: 28.7041, lng: 77.1025 },
        specialties: ['Onions', 'Tomatoes', 'Leafy Greens'],
        priceRange: '₹20-₹80 per kg',
        image: '🥬'
      },
      {
        id: 'supplier-3',
        name: 'Premium Rice Mills',
        category: 'grains',
        rating: 4.9,
        ordersCompleted: 15,
        location: 'Karnal, Haryana',
        distance: 1.8,
        coordinates: { lat: 29.6857, lng: 76.9905 },
        specialties: ['Basmati Rice', 'Brown Rice', 'Quinoa'],
        priceRange: '₹60-₹200 per kg',
        image: '🍛'
      },
      {
        id: 'supplier-4',
        name: 'Mumbai Dairy Fresh',
        category: 'dairy',
        rating: 4.7,
        ordersCompleted: 31,
        location: 'Aarey Colony, Mumbai',
        distance: 3.2,
        coordinates: { lat: 19.2183, lng: 72.8781 },
        specialties: ['Fresh Milk', 'Paneer', 'Curd'],
        priceRange: '₹30-₹150 per kg',
        image: '🥛'
      },
      {
        id: 'supplier-5',
        name: 'South Indian Oils',
        category: 'oils',
        rating: 4.5,
        ordersCompleted: 12,
        location: 'T. Nagar, Chennai',
        distance: 4.7,
        coordinates: { lat: 13.0827, lng: 80.2707 },
        specialties: ['Coconut Oil', 'Sesame Oil', 'Groundnut Oil'],
        priceRange: '₹80-₹300 per liter',
        image: '🫒'
      }
    ];

    // Filter by category if specified
    let filteredSuppliers = nearbySuppliers;
    if (category && category !== 'all') {
      filteredSuppliers = nearbySuppliers.filter(supplier => supplier.category === category);
    }

    // Filter by radius (mock implementation)
    if (radius) {
      filteredSuppliers = filteredSuppliers.filter(supplier => supplier.distance <= parseFloat(radius));
    }

    // Sort by distance and rating
    filteredSuppliers.sort((a, b) => {
      if (a.distance === b.distance) {
        return b.rating - a.rating; // Higher rating first
      }
      return a.distance - b.distance; // Closer first
    });

    res.json({
      success: true,
      suppliers: filteredSuppliers,
      total: filteredSuppliers.length,
      searchParams: { lat, lng, radius, category }
    });
  } catch (error) {
    console.error('Error fetching nearby suppliers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;