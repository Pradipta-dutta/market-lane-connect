
# Store Management System - Knowledge Base

## 🎨 Design System

### Color Palette
- **Primary Blue**: #60A5FA (Light Blue)
- **Background**: #FFFFFF (White)
- **Gradients**: 
  - Header: `from-blue-500 to-blue-600`
  - Cards: `from-blue-400 to-blue-600`
  - Background: `from-blue-50 to-white`

### Typography
- **Font Family**: Inter
- **Font Weights**: 
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700

### Component Styling
- **Border Radius**: 8px (rounded-lg)
- **Shadows**: shadow-lg, shadow-xl
- **Animations**: fade-in, scale-in, hover effects
- **Spacing**: Tailwind's 4px grid system

## 🗄 Database Schema Details

### Customer Schema
```javascript
{
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validation: /^\d{10}$/
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  orderHistory: [{
    type: String,
    ref: 'Order'
  }],
  timestamps: true
}
```

### Product Schema
```javascript
{
  productId: {
    type: String,
    required: true,
    unique: true,
    format: "PRD001"
  },
  name: {
    type: String,
    required: true,
    searchable: true
  },
  category: {
    type: String,
    enum: ['Dairy', 'Grains', 'Produce', 'Snacks', 'Beverages', 'Meat', 'Frozen', 'Bakery']
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    precision: 2
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  aisle: {
    type: String,
    format: "Aisle 1-10"
  },
  shelf: {
    type: String,
    format: "Shelf A-E"
  }
}
```

### Order Schema
```javascript
{
  orderId: {
    type: String,
    unique: true,
    format: "ORD000001"
  },
  customerId: {
    type: String,
    ref: 'Customer'
  },
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number,
    subtotal: Number (calculated)
  }],
  orderDate: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    calculated: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled']
  }
}
```

## 🗺 Store Map Configuration

### Grid Layout
- **Dimensions**: 10x5 grid (10 columns, 5 rows)
- **Total Cells**: 50 positions
- **Aisles**: 1-10
- **Shelves**: A-E

### Position Calculation
```javascript
const getGridPosition = (aisle, shelf) => {
  const aisleNum = parseInt(aisle.replace('Aisle ', ''));
  const shelfLetter = shelf.replace('Shelf ', '');
  const row = Math.ceil(aisleNum / 2) - 1;
  const col = (aisleNum - 1) % 2 * 5 + (shelfLetter.charCodeAt(0) - 65);
  return { row, col };
};
```

### Visual Representation
```
A1  B1  C1  D1  E1  A2  B2  C2  D2  E2
A3  B3  C3  D3  E3  A4  B4  C4  D4  E4
A5  B5  C5  D5  E5  A6  B6  C6  D6  E6
A7  B7  C7  D7  E7  A8  B8  C8  D8  E8
A9  B9  C9  D9  E9  A10 B10 C10 D10 E10
```

## 🔧 API Architecture

### Base URL Structure
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-app.render.com/api`

### Authentication Flow
1. **Customer**: Phone + OTP (static "1234" for demo)
2. **Employee**: Email + Password
3. **Storekeeper**: Email + Password  
4. **Admin**: Email + Password

### Error Handling
```javascript
{
  400: "Bad Request - Invalid data",
  401: "Unauthorized - Authentication required",
  403: "Forbidden - Insufficient permissions", 
  404: "Not Found - Resource doesn't exist",
  409: "Conflict - Duplicate entry",
  500: "Internal Server Error"
}
```

## 🎯 Business Logic

### Loyalty Points System
- **Earning Rate**: 1 point per $10 spent
- **Redemption Rate**: 1 point = $0.50 discount
- **Minimum Redemption**: 10 points
- **Maximum Discount**: 50% of order total

### Stock Management Rules  
- **Low Stock Threshold**: < 10 units
- **Reorder Level**: Configurable per product
- **Stock Adjustment**: Real-time updates on orders
- **Negative Stock**: Prevented by validation

### Order Processing Workflow
1. **Order Creation**: Validate customer and products
2. **Stock Check**: Ensure availability
3. **Price Calculation**: Apply discounts and loyalty points
4. **Stock Update**: Decrement inventory
5. **Customer Update**: Add to order history and loyalty points
6. **Notification**: Send confirmation

## 📱 Responsive Breakpoints

### Tailwind CSS Breakpoints
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile Optimizations
- **Touch Targets**: Minimum 48x48px
- **Font Sizes**: Scalable for readability
- **Navigation**: Bottom tabs on mobile
- **Cards**: Stack vertically on small screens
- **Tables**: Horizontal scroll on mobile

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Lazy load portal components
- **Image Optimization**: WebP format when possible
- **Bundle Splitting**: Separate vendor chunks
- **Caching**: Service worker for offline functionality

### Backend
- **Database Indexing**: On frequently queried fields
- **Pagination**: Limit results per page
- **Caching**: Redis for frequently accessed data
- **Compression**: Gzip compression enabled

## 🔒 Security Considerations

### Data Protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection**: Prevented by Mongoose ODM
- **XSS Protection**: Input sanitization
- **CORS**: Configured for specific origins

### Authentication
- **JWT Tokens**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **HTTPS**: Required in production

## 📊 Analytics & Reporting

### Key Metrics
- **Sales Data**: Daily, weekly, monthly reports
- **Inventory Turnover**: Product movement analysis
- **Customer Behavior**: Purchase patterns and preferences
- **Employee Performance**: Task completion rates

### Data Visualization
- **Charts**: Recharts library for graphs
- **Dashboards**: Real-time metric displays
- **Export Options**: CSV, PDF report generation
- **Filtering**: Date ranges, categories, customers

---

*This knowledge base should be updated as the system evolves and new features are added.*
