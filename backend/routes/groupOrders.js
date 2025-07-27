const express = require('express');
const router = express.Router();

// In-memory storage for group orders (replace with database in production)
let groupOrders = [
  {
    id: '1',
    title: 'Bulk Spice Order for Street Food Vendors',
    description: 'Looking for street food vendors to join bulk purchase of authentic Indian spices including garam masala, turmeric, and red chili powder.',
    productName: 'Premium Garam Masala Mix - 25kg',
    productCategory: 'spices',
    targetPrice: 3750,
    quantityNeeded: 100,
    minQuantity: 25,
    maxParticipants: 10,
    deadline: '2025-02-15',
    location: 'Khari Baoli, Delhi, India',
    coordinates: { lat: 28.6562, lng: 77.2410 },
    status: 'active',
    createdBy: { id: '1', name: 'Ravi Kumar' },
    createdAt: '2025-01-20T00:00:00.000Z',
    participants: [
      { userId: '1', name: 'Ravi Kumar', quantity: 25 },
      { userId: '2', name: 'Sita Sharma', quantity: 30 }
    ]
  },
  {
    id: '2',
    title: 'Fresh Vegetable Bulk Order',
    description: 'Group order for fresh vegetables - onions, tomatoes, potatoes, and leafy greens for street food preparation.',
    productName: 'Mixed Fresh Vegetables - 500kg',
    productCategory: 'vegetables',
    targetPrice: 12500,
    quantityNeeded: 1000,
    minQuantity: 200,
    maxParticipants: 8,
    deadline: '2025-02-20',
    location: 'Azadpur Mandi, Delhi, India',
    coordinates: { lat: 28.7041, lng: 77.1025 },
    status: 'active',
    createdBy: { id: '3', name: 'Shankar Foods' },
    createdAt: '2025-01-22T00:00:00.000Z',
    participants: [
      { userId: '3', name: 'Shankar Foods', quantity: 300 },
      { userId: '4', name: 'Amrit Traders', quantity: 200 }
    ]
  },
  {
    id: '3',
    title: 'Basmati Rice Bulk Purchase',
    description: 'Premium basmati rice bulk order for restaurants and food vendors. High quality rice for biryani and pulao preparation.',
    productName: 'Premium Basmati Rice - 50kg',
    productCategory: 'grains',
    targetPrice: 4500,
    quantityNeeded: 200,
    minQuantity: 50,
    maxParticipants: 12,
    deadline: '2025-02-25',
    location: 'Karnal, Haryana, India',
    coordinates: { lat: 29.6857, lng: 76.9905 },
    status: 'active',
    createdBy: { id: '5', name: 'Priya Restaurant' },
    createdAt: '2025-01-24T00:00:00.000Z',
    participants: [
      { userId: '5', name: 'Priya Restaurant', quantity: 50 },
      { userId: '6', name: 'Delhi Dhaba', quantity: 100 }
    ]
  }
];

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // For demo purposes, we'll skip JWT verification
  // In production, verify the JWT token here
  req.user = { userId: 'demo-user', email: 'demo@example.com' };
  next();
}

// Get all group orders (food-focused only)
router.get('/', authenticateToken, (req, res) => {
  try {
    const { category, location } = req.query;
    
    // Filter for food categories only
    const foodCategories = ['vegetables', 'fruits', 'spices', 'oils', 'grains', 'dairy', 'beverages', 'snacks', 'condiments', 'meat'];
    let filteredOrders = groupOrders.filter(order => 
      foodCategories.includes(order.productCategory)
    );

    // Filter by category if specified
    if (category && category !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.productCategory === category);
    }

    // Filter by location proximity if specified (mock implementation)
    if (location) {
      // In production, implement geospatial filtering
      filteredOrders = filteredOrders.filter(order => 
        order.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Sort by creation date (newest first)
    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      success: true,
      orders: sortedOrders,
      total: sortedOrders.length
    });
  } catch (error) {
    console.error('Error fetching group orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new group order (dedicated endpoint for Phase 4)
router.post('/create', authenticateToken, (req, res) => {
  try {
    const {
      title,
      description,
      productName,
      productCategory,
      targetPrice,
      quantityNeeded,
      minQuantity,
      maxParticipants,
      deadline,
      location,
      coordinates
    } = req.body;

    // Validate required fields
    if (!title || !description || !productName || !productCategory || !targetPrice || !quantityNeeded || !minQuantity || !maxParticipants || !deadline || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate food categories only
    const allowedFoodCategories = ['vegetables', 'fruits', 'spices', 'oils', 'grains', 'dairy', 'beverages', 'snacks', 'condiments', 'meat'];
    if (!allowedFoodCategories.includes(productCategory)) {
      return res.status(400).json({ 
        message: 'Invalid category. Only food categories are allowed for group orders.',
        allowedCategories: allowedFoodCategories
      });
    }

    // Create new group order
    const newOrder = {
      id: Date.now().toString(),
      title,
      description,
      productName,
      productCategory,
      targetPrice: parseFloat(targetPrice),
      quantityNeeded: parseInt(quantityNeeded),
      minQuantity: parseInt(minQuantity),
      maxParticipants: parseInt(maxParticipants),
      deadline,
      location,
      coordinates: coordinates || null,
      status: 'active',
      createdBy: {
        id: req.user.userId,
        name: req.user.name || 'Demo User'
      },
      createdAt: new Date().toISOString(),
      participants: [{
        userId: req.user.userId,
        name: req.user.name || 'Demo User',
        quantity: parseInt(quantityNeeded)
      }]
    };

    groupOrders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Group order created successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating group order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new group order (legacy endpoint)
router.post('/', authenticateToken, (req, res) => {
  try {
    const {
      title,
      description,
      productName,
      productCategory,
      targetPrice,
      quantityNeeded,
      minQuantity,
      maxParticipants,
      deadline,
      location,
      coordinates
    } = req.body;

    // Validate required fields
    if (!title || !description || !productName || !productCategory || !targetPrice || !quantityNeeded || !minQuantity || !maxParticipants || !deadline || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate food categories only
    const allowedFoodCategories = ['vegetables', 'fruits', 'spices', 'oils', 'grains', 'dairy', 'beverages', 'snacks', 'condiments', 'meat'];
    if (!allowedFoodCategories.includes(productCategory)) {
      return res.status(400).json({ 
        message: 'Invalid category. Only food categories are allowed for group orders.',
        allowedCategories: allowedFoodCategories
      });
    }

    // Create new group order
    const newOrder = {
      id: Date.now().toString(),
      title,
      description,
      productName,
      productCategory,
      targetPrice: parseFloat(targetPrice),
      quantityNeeded: parseInt(quantityNeeded),
      minQuantity: parseInt(minQuantity),
      maxParticipants: parseInt(maxParticipants),
      deadline,
      location,
      coordinates: coordinates || null,
      status: 'active',
      createdBy: {
        id: req.user.userId,
        name: req.user.name || 'Demo User'
      },
      createdAt: new Date().toISOString(),
      participants: [{
        userId: req.user.userId,
        name: req.user.name || 'Demo User',
        quantity: parseInt(quantityNeeded)
      }]
    };

    groupOrders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Group order created successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating group order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a group order
router.post('/:id/join', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const orderIndex = groupOrders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Group order not found' });
    }

    const order = groupOrders[orderIndex];

    // Check if order is active
    if (order.status !== 'active') {
      return res.status(400).json({ message: 'Cannot join inactive group order' });
    }

    // Check if user is already a participant
    const isAlreadyParticipant = order.participants.some(p => p.userId === req.user.userId);
    if (isAlreadyParticipant) {
      return res.status(400).json({ message: 'Already a participant in this group order' });
    }

    // Check if group is full
    if (order.participants.length >= order.maxParticipants) {
      return res.status(400).json({ message: 'Group order is full' });
    }

    // Add participant
    order.participants.push({
      userId: req.user.userId,
      name: req.user.name || 'Demo User',
      quantity: parseInt(quantity) || 10
    });

    groupOrders[orderIndex] = order;

    res.json({
      success: true,
      message: 'Successfully joined group order',
      order
    });
  } catch (error) {
    console.error('Error joining group order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave a group order
router.post('/:id/leave', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const orderIndex = groupOrders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Group order not found' });
    }

    const order = groupOrders[orderIndex];

    // Check if user is a participant
    const participantIndex = order.participants.findIndex(p => p.userId === req.user.userId);
    if (participantIndex === -1) {
      return res.status(400).json({ message: 'Not a participant in this group order' });
    }

    // Check if user is the creator
    if (order.createdBy.id === req.user.userId) {
      return res.status(400).json({ message: 'Creator cannot leave their own group order' });
    }

    // Remove participant
    order.participants.splice(participantIndex, 1);
    groupOrders[orderIndex] = order;

    res.json({
      success: true,
      message: 'Successfully left group order',
      order
    });
  } catch (error) {
    console.error('Error leaving group order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific group order
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const order = groupOrders.find(order => order.id === id);

    if (!order) {
      return res.status(404).json({ message: 'Group order not found' });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching group order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update group order status (for creators only)
router.patch('/:id/status', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const orderIndex = groupOrders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Group order not found' });
    }

    const order = groupOrders[orderIndex];

    // Check if user is the creator
    if (order.createdBy.id !== req.user.userId) {
      return res.status(403).json({ message: 'Only the creator can update order status' });
    }

    // Validate status
    const validStatuses = ['active', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    groupOrders[orderIndex] = order;

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor spending data
router.get('/vendor/:userId/spending', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    // Mock spending data for demo (in production, calculate from actual orders)
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
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

module.exports = router;