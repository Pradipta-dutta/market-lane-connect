
# Store Management System

A comprehensive full-stack store management web application built with React, Express, MongoDB, and Tailwind CSS. Features four specialized portals for different user types with real-time inventory management, customer tracking, and advanced analytics.

## 🚀 Features

### Customer Portal
- **Authentication**: Phone number + OTP login
- **Order History**: Complete purchase history with filtering
- **Product Search**: Real-time search with store navigation
- **Store Map**: Interactive 10x5 grid layout with product location highlighting
- **Loyalty Points**: Points tracking and discount system
- **Product Recommendations**: AI-powered suggestions based on purchase history

### Storekeeper Portal
- **Stock Management**: Full CRUD operations for inventory
- **Order Registration**: Process customer orders with automatic calculations
- **Loyalty System**: Automated points assignment and discount application
- **Alert System**: Send notifications to employees
- **Real-time Updates**: Live inventory tracking

### Employee Portal
- **Task Management**: View and manage assigned tasks
- **Alert System**: Receive and acknowledge notifications
- **Work Tracking**: Log task completion with timestamps
- **Dashboard**: Overview of pending work and alerts

### Admin Portal
- **User Management**: Manage all system users
- **Advanced Analytics**: Sales reports and inventory insights
- **System Control**: Full CRUD operations across all entities
- **Data Export**: CSV import/export functionality
- **Low Stock Alerts**: Automated inventory warnings

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern, responsive design
- **Shadcn/ui** components for consistent UI/UX
- **React Router** for navigation
- **Context API** for state management

### Backend
- **Express.js** for RESTful API
- **MongoDB** with Mongoose for data modeling
- **JWT** for authentication
- **CORS** enabled for cross-origin requests
- **Error handling** middleware

### Design System
- **Colors**: Light blue (#60A5FA) and white (#FFFFFF)
- **Typography**: Inter font family
- **Mobile-first**: Responsive design with touch-friendly elements
- **Animations**: Smooth transitions and hover effects

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd store-management-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/storemanagement
   PORT=5000
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 🗄 Database Schema

### Collections

#### Customers
```javascript
{
  phoneNumber: String (unique),
  name: String,
  loyaltyPoints: Number,
  orderHistory: [String] // Order IDs
}
```

#### Products
```javascript
{
  productId: String (unique),
  name: String,
  category: String,
  price: Number,
  stockQuantity: Number,
  aisle: String,
  shelf: String
}
```

#### Orders
```javascript
{
  orderId: String (unique),
  customerId: String,
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  orderDate: Date,
  totalAmount: Number,
  status: String
}
```

#### Employees
```javascript
{
  employeeId: String (unique),
  name: String,
  email: String,
  alerts: [{
    alertId: String,
    message: String,
    timestamp: Date,
    status: String
  }]
}
```

#### Alerts
```javascript
{
  alertId: String (unique),
  message: String,
  employeeId: String,
  timestamp: Date,
  status: String
}
```

## 🌐 API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:phoneNumber` - Get customer by phone
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:phoneNumber` - Update customer
- `DELETE /api/customers/:phoneNumber` - Delete customer

### Products
- `GET /api/products` - Get all products (supports ?name and ?category filters)
- `GET /api/products/:productId` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:productId` - Update product
- `DELETE /api/products/:productId` - Delete product

### Orders
- `GET /api/orders` - Get all orders (supports filtering)
- `GET /api/orders/:orderId` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:orderId` - Update order
- `DELETE /api/orders/:orderId` - Delete order

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:employeeId` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:employeeId` - Update employee
- `DELETE /api/employees/:employeeId` - Delete employee

### Alerts
- `GET /api/alerts` - Get all alerts (supports ?employeeId filter)
- `GET /api/alerts/:alertId` - Get alert by ID
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/:alertId` - Update alert
- `DELETE /api/alerts/:alertId` - Delete alert

## 🚀 Deployment

### Frontend (Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Environment Variables**
   Set `VITE_API_URL` to your backend URL in Vercel dashboard

### Backend (Render)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`

2. **Environment Variables**
   Add the following in Render dashboard:
   ```
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-jwt-secret
   NODE_ENV=production
   ```

3. **Database Setup**
   - Create MongoDB Atlas cluster
   - Configure network access and database user
   - Run seed script: `npm run seed`

## 📱 Mobile Support

The application is fully responsive with:
- Touch-friendly 48px minimum button sizes
- Mobile-optimized navigation
- Swipeable product carousels
- Responsive grid layouts
- Bottom navigation for mobile devices

## 🎨 UI/UX Features

- **Smooth Animations**: Fade-ins, scale effects, and transitions
- **Modern Design**: Glass morphism and gradient backgrounds
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Loading States**: Skeleton UI and loading spinners
- **Toast Notifications**: Real-time feedback for user actions
- **Error Handling**: Graceful error messages and fallbacks

## 🔧 Development

### Available Scripts

#### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Structure

```
store-management-system/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── server.js        # Main server file
│   ├── seed.js          # Database seeding
│   └── package.json
├── src/
│   ├── components/      # React components
│   ├── context/         # React Context providers
│   ├── data/           # Mock data (development)
│   ├── services/       # API service layer
│   └── App.tsx         # Main app component
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using React, Express, MongoDB, and Tailwind CSS**
