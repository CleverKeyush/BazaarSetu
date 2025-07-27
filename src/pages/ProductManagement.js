import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import { formatINR } from '../utils/currency';
import T from '../components/T';

const ProductManagement = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/my-products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      // Mock data for demo
      const mockProducts = [
        {
          id: '1',
          name: 'HP LaserJet Toner Cartridges',
          description: 'High-quality toner cartridges compatible with HP LaserJet printers',
          category: 'Office Supplies',
          price: 45.99,
          minOrderQuantity: 10,
          minOrderValue: 459.90,
          stockQuantity: 500,
          specifications: {
            brand: 'HP',
            model: 'CF410A',
            color: 'Black',
            pageYield: '2300 pages'
          },
          status: 'active',
          createdAt: '2025-01-15T00:00:00.000Z'
        },
        {
          id: '2',
          name: 'Arduino Uno R3 Microcontrollers',
          description: 'Original Arduino Uno R3 microcontroller boards for electronics projects',
          category: 'Electronics',
          price: 25.50,
          minOrderQuantity: 5,
          minOrderValue: 127.50,
          stockQuantity: 200,
          specifications: {
            brand: 'Arduino',
            model: 'Uno R3',
            microcontroller: 'ATmega328P',
            voltage: '5V'
          },
          status: 'active',
          createdAt: '2025-01-18T00:00:00.000Z'
        }
      ];
      setProducts(mockProducts);
    }
    setLoading(false);
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const data = await response.json();
        setProducts([data.product, ...products]);
        setShowForm(false);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      // Mock creation for demo
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        status: 'active',
        createdAt: new Date().toISOString(),
        supplierId: user.id,
        supplierName: user.name
      };
      setProducts([newProduct, ...products]);
      setShowForm(false);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(products.map(p => p.id === editingProduct.id ? data.product : p));
        setEditingProduct(null);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      // Mock update for demo
      const updatedProduct = {
        ...editingProduct,
        ...productData,
        updatedAt: new Date().toISOString()
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      // Mock deletion for demo
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.status === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'out_of_stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your product listings and inventory</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Product
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
              {[
                { key: 'all', label: 'All Products' },
                { key: 'active', label: 'Active' },
                { key: 'inactive', label: 'Inactive' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first product'}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {product.category}</span>
                      <span>•</span>
                      <span>Stock: {product.stockQuantity} units</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Unit Price</p>
                    <p className="font-semibold text-green-600">{formatINR(product.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Min Order Qty</p>
                    <p className="font-semibold">{product.minOrderQuantity} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Min Order Value</p>
                    <p className="font-semibold">{formatINR(product.minOrderValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className={`font-semibold ${product.stockQuantity > 50 ? 'text-green-600' : product.stockQuantity > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {product.stockQuantity} units
                    </p>
                  </div>
                </div>

                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specifications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        value && (
                          <span key={key} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {key}: {value}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Product Form Modal */}
        {(showForm || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            isEditing={!!editingProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductManagement;