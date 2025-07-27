const express = require('express');
const router = express.Router();

// In-memory storage for products (replace with database in production)
let products = [
  {
    id: '1',
    name: 'Premium Garam Masala Mix',
    description: 'Authentic blend of premium spices including cardamom, cinnamon, cloves, and bay leaves. Perfect for Indian cuisine.',
    category: 'spices',
    price: 150.00,
    minOrderQuantity: 5,
    minOrderValue: 750.00,
    stockQuantity: 200,
    images: ['https://via.placeholder.com/300x200?text=Garam+Masala'],
    specifications: {
      brand: 'Rajesh Spice Co.',
      weight: '1 kg',
      origin: 'Khari Baoli, Delhi',
      shelfLife: '12 months'
    },
    supplierId: 'supplier-1',
    supplierName: 'Rajesh Spice Co.',
    status: 'active',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-20T00:00:00.000Z',
    emoji: '🌶️'
  },
  {
    id: '2',
    name: 'Organic Mixed Vegetables',
    description: 'Fresh organic vegetables including onions, tomatoes, potatoes, and leafy greens. Sourced directly from farms.',
    category: 'vegetables',
    price: 25.00,
    minOrderQuantity: 10,
    minOrderValue: 250.00,
    stockQuantity: 1500,
    images: ['https://via.placeholder.com/300x200?text=Mixed+Vegetables'],
    specifications: {
      brand: 'Fresh Veggie Mart',
      weight: '1 kg',
      origin: 'Azadpur Mandi, Delhi',
      freshness: 'Harvested daily'
    },
    supplierId: 'supplier-2',
    supplierName: 'Fresh Veggie Mart',
    status: 'active',
    createdAt: '2025-01-18T00:00:00.000Z',
    updatedAt: '2025-01-22T00:00:00.000Z',
    emoji: '🥬'
  },
  {
    id: '3',
    name: 'Premium Basmati Rice',
    description: 'Long grain premium basmati rice, aged for perfect aroma and texture. Ideal for biryani and pulao.',
    category: 'grains',
    price: 89.00,
    minOrderQuantity: 10,
    minOrderValue: 890.00,
    stockQuantity: 500,
    images: ['https://via.placeholder.com/300x200?text=Basmati+Rice'],
    specifications: {
      brand: 'Premium Rice Mills',
      weight: '1 kg',
      origin: 'Karnal, Haryana',
      aging: '2 years'
    },
    supplierId: 'supplier-3',
    supplierName: 'Premium Rice Mills',
    status: 'active',
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2025-01-24T00:00:00.000Z',
    emoji: '🍛'
  },
  {
    id: '4',
    name: 'Fresh Paneer',
    description: 'Soft and fresh paneer made from pure cow milk. Perfect for curries and snacks.',
    category: 'dairy',
    price: 120.00,
    minOrderQuantity: 5,
    minOrderValue: 600.00,
    stockQuantity: 100,
    images: ['https://via.placeholder.com/300x200?text=Fresh+Paneer'],
    specifications: {
      brand: 'Mumbai Dairy Fresh',
      weight: '500g',
      origin: 'Aarey Colony, Mumbai',
      shelfLife: '3 days'
    },
    supplierId: 'supplier-4',
    supplierName: 'Mumbai Dairy Fresh',
    status: 'active',
    createdAt: '2025-01-21T00:00:00.000Z',
    updatedAt: '2025-01-25T00:00:00.000Z',
    emoji: '🥛'
  },
  {
    id: '5',
    name: 'Cold Pressed Coconut Oil',
    description: 'Pure cold pressed coconut oil, extracted from fresh coconuts. Ideal for cooking and health benefits.',
    category: 'oils',
    price: 180.00,
    minOrderQuantity: 3,
    minOrderValue: 540.00,
    stockQuantity: 80,
    images: ['https://via.placeholder.com/300x200?text=Coconut+Oil'],
    specifications: {
      brand: 'South Indian Oils',
      volume: '1 liter',
      origin: 'T. Nagar, Chennai',
      extraction: 'Cold pressed'
    },
    supplierId: 'supplier-5',
    supplierName: 'South Indian Oils',
    status: 'active',
    createdAt: '2025-01-22T00:00:00.000Z',
    updatedAt: '2025-01-26T00:00:00.000Z',
    emoji: '🫒'
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

// Get all products (public endpoint)
router.get('/', (req, res) => {
  try {
    const { category, supplierId, search } = req.query;
    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by supplier
    if (supplierId) {
      filteredProducts = filteredProducts.filter(product => 
        product.supplierId === supplierId
      );
    }

    // Search by name or description
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Only return active products
    filteredProducts = filteredProducts.filter(product => product.status === 'active');

    res.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get supplier's own products
router.get('/my-products', authenticateToken, (req, res) => {
  try {
    const supplierProducts = products.filter(product => 
      product.supplierId === req.user.userId
    );

    res.json({
      success: true,
      products: supplierProducts,
      total: supplierProducts.length
    });
  } catch (error) {
    console.error('Error fetching supplier products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', authenticateToken, (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      minOrderQuantity,
      minOrderValue,
      stockQuantity,
      images,
      specifications
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !price || !minOrderQuantity || !stockQuantity) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate food categories only
    const allowedFoodCategories = ['vegetables', 'fruits', 'spices', 'oils', 'grains', 'dairy', 'beverages', 'snacks', 'condiments', 'meat'];
    if (!allowedFoodCategories.includes(category)) {
      return res.status(400).json({ 
        message: 'Invalid category. Only food categories are allowed.',
        allowedCategories: allowedFoodCategories
      });
    }

    // Create new product
    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      category,
      price: parseFloat(price),
      minOrderQuantity: parseInt(minOrderQuantity),
      minOrderValue: minOrderValue ? parseFloat(minOrderValue) : parseFloat(price) * parseInt(minOrderQuantity),
      stockQuantity: parseInt(stockQuantity),
      images: images || [],
      specifications: specifications || {},
      supplierId: req.user.userId,
      supplierName: req.user.name || 'Demo Supplier',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      price,
      minOrderQuantity,
      minOrderValue,
      stockQuantity,
      images,
      specifications,
      status
    } = req.body;

    const productIndex = products.findIndex(product => 
      product.id === id && product.supplierId === req.user.userId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      description: description || products[productIndex].description,
      category: category || products[productIndex].category,
      price: price ? parseFloat(price) : products[productIndex].price,
      minOrderQuantity: minOrderQuantity ? parseInt(minOrderQuantity) : products[productIndex].minOrderQuantity,
      minOrderValue: minOrderValue ? parseFloat(minOrderValue) : products[productIndex].minOrderValue,
      stockQuantity: stockQuantity ? parseInt(stockQuantity) : products[productIndex].stockQuantity,
      images: images || products[productIndex].images,
      specifications: specifications || products[productIndex].specifications,
      status: status || products[productIndex].status,
      updatedAt: new Date().toISOString()
    };

    products[productIndex] = updatedProduct;

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    const productIndex = products.findIndex(product => 
      product.id === id && product.supplierId === req.user.userId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    // Soft delete - set status to inactive
    products[productIndex].status = 'inactive';
    products[productIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific product
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(product => product.id === id && product.status === 'active');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;