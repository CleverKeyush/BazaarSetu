# 🍛 BazaarSetu - Street Food Marketplace

A comprehensive marketplace platform connecting street food vendors with customers across India, featuring real-time location services, multi-language support, and integrated payment solutions.

## 🌟 Features

### 🎯 Core Functionality
- **Multi-User System**: Separate dashboards for vendors, suppliers, and customers
- **Real-time Location Services**: Interactive maps with 37+ street food vendors across India
- **Multi-language Support**: Available in Hindi, English, Marathi, Tamil, Telugu, Gujarati, and Malayalam
- **Group Ordering**: Collaborative ordering system for bulk purchases
- **Mandi Price Integration**: Real-time agricultural commodity prices
- **Spending Analytics**: Comprehensive tracking and reporting for vendors

### 🎨 User Experience
- **Animated UI**: Smooth transitions and interactive elements
- **Responsive Design**: Optimized for mobile and desktop
- **Cultural Branding**: Shri Ram flag integration and Indian cultural elements
- **Demo Mode**: Interactive guided tour for new users

### 🛠 Technical Features
- **JWT Authentication**: Secure user authentication and authorization
- **RESTful API**: Well-structured backend with Express.js
- **MongoDB Integration**: Scalable database solution
- **Real-time Updates**: Live data synchronization
- **Deployment Ready**: Configured for Vercel, Netlify, and Render

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CleverKeyush/BazaarSetu.git
   cd BazaarSetu
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   
   # Update with your configuration
   # MongoDB URI, JWT secrets, etc.
   ```

5. **Start the application**
   ```bash
   # Start backend (from root directory)
   cd backend && npm run dev
   
   # Start frontend (in new terminal, from root directory)
   npm start
   ```

## 📱 Usage

### For Vendors
1. Register as a vendor
2. Set up your street food stall location
3. Add your menu items and prices
4. Track orders and manage inventory
5. View spending analytics and reports

### For Customers
1. Browse nearby street food vendors
2. View menus and prices
3. Place individual or group orders
4. Track order status
5. Rate and review vendors

### For Suppliers
1. Register as a supplier
2. List your products and wholesale prices
3. Manage vendor relationships
4. Track bulk orders and deliveries

## 🏗 Project Structure

```
marketplace-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── context/            # React context providers
│   ├── services/           # API and external services
│   ├── locales/            # Multi-language translations
│   ├── styles/             # CSS and animations
│   └── utils/              # Helper functions
├── backend/
│   ├── routes/             # API route handlers
│   ├── controllers/        # Business logic
│   ├── models/             # Database models
│   └── utils/              # Backend utilities
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Vendors
- `GET /api/vendors` - List all vendors
- `POST /api/vendors` - Create vendor profile
- `PUT /api/vendors/:id` - Update vendor profile

### Products
- `GET /api/products` - List products
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## 🌍 Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Render (Backend)
```bash
# Push to GitHub and connect to Render
# Use the provided render.yaml configuration
```

### Environment Variables
```env
# Frontend (.env)
REACT_APP_API_URL=your_backend_url
REACT_APP_MAPS_API_KEY=your_maps_api_key

# Backend (backend/.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenLayers for mapping functionality
- React community for excellent libraries
- Indian street food vendors for inspiration
- Cultural elements inspired by Indian heritage

## 📞 Support

For support, email support@bazaarsetu.com or join our Slack channel.

## 🔗 Links

- [Live Demo](https://bazaarsetu.vercel.app)
- [API Documentation](https://api.bazaarsetu.com/docs)
- [Design System](https://design.bazaarsetu.com)

---

Made with ❤️ for Indian Street Food Culture
