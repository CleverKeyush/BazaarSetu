import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from './i18n';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import GroupOrders from './pages/GroupOrders';
import ProductManagement from './pages/ProductManagement';
import Maps from './pages/Maps';
import LocationDiscovery from './pages/LocationDiscovery';
import MandiPricesPage from './pages/MandiPrices';

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/vendor-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="vendor">
                      <VendorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/supplier-dashboard" 
                  element={
                    <ProtectedRoute requiredRole="supplier">
                      <SupplierDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/group-orders" 
                  element={
                    <ProtectedRoute requiredRole="vendor">
                      <GroupOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/product-management" 
                  element={
                    <ProtectedRoute requiredRole="supplier">
                      <ProductManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/maps" 
                  element={
                    <ProtectedRoute>
                      <Maps />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/location-discovery" 
                  element={
                    <ProtectedRoute>
                      <LocationDiscovery />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/mandi-prices" 
                  element={
                    <ProtectedRoute>
                      <MandiPricesPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
