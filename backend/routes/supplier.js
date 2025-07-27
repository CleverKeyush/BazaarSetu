const express = require('express');
const router = express.Router();

// In-memory storage for supplier orders (replace with database in production)
let supplierOrders = [
  {
    id: '1',
    groupOrderId: '1',
    groupOrderTitle: 'Bulk Spice Order for Restaurants',
    productName: 'Premium Garam Masala Mix - 25kg',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    vendorCompany: 'Spice Palace Restaurant',
    quantity: 25,
    unitPrice: 150.00,
    totalValue: 3750.00,
    status: 'pending',
    requestedAt: '2025-01-25T00:00:00.000Z',
    deadline: '2025-02-15T00:00:00.000Z',
    location: 'Khari Baoli, Delhi, India',
    notes: 'Need authentic spices for restaurant chain expansion',
    supplierId: 'supplier-1',
    category: 'spices'
  },
  {
    id: '2',
    groupOrderId: '2',
    groupOrderTitle: 'Fresh Vegetable Bulk Supply',
    productName: 'Organic Mixed Vegetables - 500kg',
    vendorId: '3',
    vendorName: 'Sita Devi',
    vendorCompany: 'Green Garden Cafe',
    quantity: 500,
    unitPrice: 25.00,
    totalValue: 12500.00,
    status: 'accepted',
    requestedAt: '2025-01-22T00:00:00.000Z',
    deadline: '2025-02-20T00:00:00.000Z',
    location: 'Azadpur Mandi, Delhi, India',
    notes: 'Fresh vegetables for healthy food chain',
    supplierId: 'supplier-1',
    acceptedAt: '2025-01-23T00:00:00.000Z',
    category: 'vegetables'
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
  req.user = { userId: 'supplier-1', email: 'supplier@demo.com', userType: 'supplier' };
  next();
}

// Get supplier's orders/requests
router.get('/orders', authenticateToken, (req, res) => {
  try {
    const { status } = req.query;
    let filteredOrders = supplierOrders.filter(order => 
      order.supplierId === req.user.userId
    );

    // Filter by status if provided
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Sort by requested date (newest first)
    filteredOrders.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));

    res.json({
      success: true,
      orders: filteredOrders,
      total: filteredOrders.length
    });
  } catch (error) {
    console.error('Error fetching supplier orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept/Reject order request
router.patch('/orders/:id/status', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, unitPrice } = req.body;

    const orderIndex = supplierOrders.findIndex(order => 
      order.id === id && order.supplierId === req.user.userId
    );

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    const validStatuses = ['pending', 'accepted', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update order
    const updatedOrder = {
      ...supplierOrders[orderIndex],
      status,
      notes: notes || supplierOrders[orderIndex].notes,
      updatedAt: new Date().toISOString()
    };

    // If accepting, add acceptance timestamp and update price if provided
    if (status === 'accepted') {
      updatedOrder.acceptedAt = new Date().toISOString();
      if (unitPrice) {
        updatedOrder.unitPrice = parseFloat(unitPrice);
        updatedOrder.totalValue = updatedOrder.quantity * parseFloat(unitPrice);
      }
    }

    // If rejecting, add rejection timestamp
    if (status === 'rejected') {
      updatedOrder.rejectedAt = new Date().toISOString();
    }

    supplierOrders[orderIndex] = updatedOrder;

    res.json({
      success: true,
      message: `Order ${status} successfully`,
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept order request (dedicated endpoint)
router.post('/orders/:id/accept', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { unitPrice, notes } = req.body;

    const orderIndex = supplierOrders.findIndex(order => 
      order.id === id && order.supplierId === req.user.userId
    );

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    const order = supplierOrders[orderIndex];

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order is not in pending status' });
    }

    // Update order to accepted
    const updatedOrder = {
      ...order,
      status: 'accepted',
      acceptedAt: new Date().toISOString(),
      notes: notes || order.notes,
      updatedAt: new Date().toISOString()
    };

    // Update price if provided
    if (unitPrice) {
      updatedOrder.unitPrice = parseFloat(unitPrice);
      updatedOrder.totalValue = updatedOrder.quantity * parseFloat(unitPrice);
    }

    supplierOrders[orderIndex] = updatedOrder;

    res.json({
      success: true,
      message: 'Order accepted successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error accepting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor contact information
router.get('/orders/:id/contact', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const order = supplierOrders.find(order => 
      order.id === id && order.supplierId === req.user.userId
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    // Mock vendor contact info (in production, fetch from database)
    const vendorContact = {
      name: order.vendorName,
      company: order.vendorCompany,
      email: `${order.vendorName.toLowerCase().replace(' ', '.')}@${order.vendorCompany.toLowerCase().replace(' ', '')}.com`,
      phone: '+91-98765-43210',
      whatsapp: '+91-98765-43210',
      address: order.location
    };

    res.json({
      success: true,
      contact: vendorContact,
      order: {
        id: order.id,
        title: order.groupOrderTitle,
        productName: order.productName,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error fetching vendor contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get supplier dashboard stats
router.get('/dashboard-stats', authenticateToken, (req, res) => {
  try {
    const supplierProducts = require('./products').products?.filter(p => p.supplierId === req.user.userId) || [];
    const orders = supplierOrders.filter(order => order.supplierId === req.user.userId);

    const stats = {
      totalProducts: supplierProducts.length,
      activeProducts: supplierProducts.filter(p => p.status === 'active').length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      acceptedOrders: orders.filter(o => o.status === 'accepted').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      totalRevenue: orders
        .filter(o => o.status === 'completed')
        .reduce((sum, order) => sum + order.totalValue, 0),
      monthlyRevenue: orders
        .filter(o => {
          const orderDate = new Date(o.acceptedAt || o.requestedAt);
          const currentMonth = new Date().getMonth();
          return o.status === 'completed' && orderDate.getMonth() === currentMonth;
        })
        .reduce((sum, order) => sum + order.totalValue, 0)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent activity
router.get('/recent-activity', authenticateToken, (req, res) => {
  try {
    const recentOrders = supplierOrders
      .filter(order => order.supplierId === req.user.userId)
      .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt))
      .slice(0, 5);

    const activities = recentOrders.map(order => ({
      id: order.id,
      type: 'order_request',
      title: `New order request: ${order.productName}`,
      description: `${order.vendorName} requested ${order.quantity} units`,
      status: order.status,
      timestamp: order.requestedAt,
      value: order.totalValue
    }));

    res.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;