
# Store Management System

A comprehensive frontend-only store management web application built with React, Vite, and Tailwind CSS. This application features four distinct portals for different user types: Customer, Storekeeper, Employee, and Admin.

## 🎯 Features

### Customer Portal
- **Authentication**: Phone number + OTP login (demo OTP: 1234)
- **Order History**: View past orders with details and status
- **Product Search**: Search products by name or category
- **Store Navigation**: Interactive 10x5 store map with product location highlighting
- **Loyalty Points**: View points balance and available discounts
- **Product Recommendations**: AI-powered suggestions based on purchase history

### Storekeeper Portal (Coming Soon)
- Stock management (view, update, add, delete products)
- Order registration with customer linking
- Loyalty points calculation and discount application
- Alert system for employee communication

### Employee Portal (Coming Soon)
- Alert management (pending/delivered status)
- Task tracking and completion
- Work dashboard with assigned tasks

### Admin Portal (Coming Soon)
- Full CRUD operations for all data
- User management (storekeepers, employees, customers)
- Order overview and reporting
- Low-stock alerts and inventory management

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd store-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎨 Design System

- **Primary Color**: Light Blue (#60A5FA)
- **Secondary Color**: White (#FFFFFF)
- **Font**: Inter (Google Fonts)
- **Framework**: Tailwind CSS with custom utility classes
- **Components**: Shadcn/ui component library

## 📊 Mock Data Structure

The application uses comprehensive mock data to simulate backend functionality:

### Products (100 items)
```javascript
{
  productId: "P001",
  name: "Whole Milk",
  category: "Dairy",
  price: 3.99,
  stockQuantity: 45,
  aisle: "Aisle 1",
  shelf: "Shelf A"
}
```

### Customers (50 users)
```javascript
{
  phoneNumber: "5551234567", // Unique ID
  name: "Alice Johnson",
  loyaltyPoints: 125,
  orderHistory: ["ORD001", "ORD015"]
}
```

### Orders (100 orders)
```javascript
{
  orderId: "ORD001",
  customerId: "5551234567",
  items: [{ productId, name, quantity, price }],
  orderDate: "2024-06-15",
  totalAmount: 13.46,
  status: "Completed"
}
```

## 🔧 Backend Integration (TODO)

The application is designed to seamlessly integrate with a MongoDB backend. Key integration points:

### API Service Layer
```javascript
// src/services/api.js (to be implemented)
// TODO: Replace mock data with MongoDB API calls

const fetchProducts = async () => {
  // TODO: Replace with GET /api/products from Express server
  return mockProducts;
};

const createOrder = async (orderData) => {
  // TODO: Replace with POST /api/orders to MongoDB
  return mockOrderResponse;
};
```

### Required Backend Endpoints
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - Fetch orders
- `POST /api/orders` - Create new order
- `GET /api/customers/:phone` - Fetch customer by phone
- `POST /api/alerts` - Send alert to employee
- `PUT /api/alerts/:id` - Update alert status

### Environment Variables (Backend)
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/store_management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── portals/         # Portal-specific components
│   ├── Layout.jsx       # Main layout wrapper
│   └── PortalSelector.jsx
├── context/
│   ├── AuthContext.jsx  # Authentication state management
│   └── DataContext.jsx  # Mock data management
├── data/
│   ├── products.js      # 100 sample products
│   ├── customers.js     # 50 sample customers
│   ├── orders.js        # 100 sample orders
│   ├── employees.js     # 10 sample employees
│   └── alerts.js        # 20 sample alerts
├── services/            # API integration layer (to be implemented)
└── App.tsx             # Main application component
```

## 🧪 Demo Credentials

### Customer Portal
- **Phone Number**: Any number from mock data (e.g., 5551234567)
- **OTP**: 1234 (static demo code)

### Other Portals
- **Email**: Any email address
- **Password**: Any password
- Currently shows placeholder login screens

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables: None required for frontend-only version

### Backend (Render/Railway)
1. Create Node.js service
2. Connect to MongoDB Atlas
3. Set environment variables
4. Deploy Express server with MongoDB integration

## 🔄 Development Roadmap

### Phase 1 ✅
- [x] Project setup and mock data
- [x] Customer Portal with full functionality
- [x] Authentication system (mock)
- [x] Store map and navigation
- [x] Product search and recommendations

### Phase 2 🚧
- [ ] Storekeeper Portal implementation
- [ ] Employee Portal implementation
- [ ] Admin Portal implementation
- [ ] Real-time alerts with WebSocket

### Phase 3 📋
- [ ] MongoDB backend integration
- [ ] JWT authentication
- [ ] API service layer
- [ ] Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **React** and **Vite** for the amazing development experience
- **Lovable AI** for the rapid prototyping capabilities

---

**Note**: This is currently a frontend-only demonstration. Backend integration with MongoDB, Express, and Node.js will be implemented in a separate repository as outlined in the integration comments throughout the codebase.
