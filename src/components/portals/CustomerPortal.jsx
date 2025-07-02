
// Customer Portal - Authentication, order history, product search, store navigation
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from '../ui/use-toast';

const CustomerPortal = ({ onBack }) => {
  const { user, login, isAuthenticated } = useAuth();
  const { products, customers, orders } = useData();
  const [loginData, setLoginData] = useState({ phoneNumber: '', otp: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');

  // Login handler for customers (phone + OTP)
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData, 'customer');
    if (result.success) {
      toast({
        title: "Login Successful",
        description: "Welcome to your customer portal!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your phone number and OTP (use 1234 for demo)",
        variant: "destructive",
      });
    }
  };

  // Product search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Get customer data
  const customerData = isAuthenticated 
    ? customers.find(c => c.phoneNumber === user?.phoneNumber) 
    : null;

  // Get customer orders
  const customerOrders = customerData 
    ? orders.filter(order => order.customerId === customerData.phoneNumber)
    : [];

  // Get product recommendations based on order history
  const getRecommendations = () => {
    if (!customerOrders.length) return [];
    
    const purchasedCategories = new Set();
    customerOrders.forEach(order => {
      order.items.forEach(item => {
        const product = products.find(p => p.productId === item.productId);
        if (product) purchasedCategories.add(product.category);
      });
    });

    return products
      .filter(p => purchasedCategories.has(p.category))
      .slice(0, 5);
  };

  // Store map component (10x5 grid)
  const StoreMap = ({ highlightProduct }) => {
    const getGridPosition = (aisle, shelf) => {
      const aisleNum = parseInt(aisle.replace('Aisle ', ''));
      const shelfLetter = shelf.replace('Shelf ', '');
      const row = Math.ceil(aisleNum / 2) - 1;
      const col = (aisleNum - 1) % 2 * 5 + (shelfLetter.charCodeAt(0) - 65);
      return { row, col };
    };

    const isHighlighted = (row, col) => {
      if (!highlightProduct) return false;
      const pos = getGridPosition(highlightProduct.aisle, highlightProduct.shelf);
      return pos.row === row && pos.col === col;
    };

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Store Map</h3>
        <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
          {Array.from({ length: 50 }, (_, index) => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            const aisleNum = Math.floor(col / 5) + 1 + (row * 2);
            const shelfLetter = String.fromCharCode(65 + (col % 5));
            const isHighlight = isHighlighted(row, col);
            
            return (
              <div
                key={index}
                className={`
                  w-8 h-8 border border-gray-300 flex items-center justify-center text-xs
                  ${isHighlight ? 'bg-blue-400 text-white font-bold' : 'bg-white hover:bg-gray-100'}
                `}
                title={`Aisle ${aisleNum}, Shelf ${shelfLetter}`}
              >
                {aisleNum <= 10 ? `${aisleNum}${shelfLetter}` : ''}
              </div>
            );
          })}
        </div>
        {highlightProduct && (
          <div className="mt-4 text-center">
            <Badge className="bg-blue-400 text-white">
              {highlightProduct.name} - {highlightProduct.aisle}, {highlightProduct.shelf}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              Navigate to {highlightProduct.aisle}, {highlightProduct.shelf}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="mb-4"
          >
            ← Back to Portal Selection
          </Button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Login</h2>
          <p className="text-gray-600">Enter your phone number and OTP to continue</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="e.g., 5551234567"
                value={loginData.phoneNumber}
                onChange={(e) => setLoginData({...loginData, phoneNumber: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP (use 1234 for demo)"
                value={loginData.otp}
                onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                required
              />
              <p className="text-sm text-blue-600 mt-1">
                Demo OTP: 1234
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Customer Portal</h2>
          <p className="text-gray-600">Welcome back, {customerData?.name}!</p>
        </div>
        <Button onClick={onBack} variant="outline">
          ← Back to Portal Selection
        </Button>
      </div>

      {/* Loyalty Points Display */}
      <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Loyalty Points</h3>
            <p className="text-3xl font-bold text-blue-600">{customerData?.loyaltyPoints || 0}</p>
            <p className="text-sm text-blue-700">
              Available discount: ${((customerData?.loyaltyPoints || 0) * 0.5).toFixed(2)}
            </p>
          </div>
          <div className="text-blue-400 text-4xl">🎁</div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'orders', label: 'Order History' },
          { id: 'search', label: 'Find Products' },
          { id: 'recommendations', label: 'Recommendations' }
        ].map(tab => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className={activeTab === tab.id ? 'bg-blue-400 text-white' : ''}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Order History Tab */}
      {activeTab === 'orders' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Order History</h3>
          {customerOrders.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">No orders found</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {customerOrders.map(order => (
                <Card key={order.orderId} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">Order #{order.orderId}</h4>
                      <p className="text-sm text-gray-600">{order.orderDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                      <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Search Tab */}
      {activeTab === 'search' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Find Products</h3>
          
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search for products (e.g., sugar, milk, bread...)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-lg"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Search Results</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {searchResults.map(product => (
                  <Card key={product.productId} className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedProduct(product)}>
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold">{product.name}</h5>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <p className="text-lg font-bold text-blue-600 mb-2">${product.price}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.aisle}, {product.shelf}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stockQuantity} units
                    </p>
                    <Button 
                      className="w-full mt-3 bg-blue-400 hover:bg-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      View Location
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Store Map */}
          <StoreMap highlightProduct={selectedProduct} />
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
          {getRecommendations().length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                Make some purchases to see personalized recommendations!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getRecommendations().map(product => (
                <Card key={product.productId} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold">{product.name}</h5>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-lg font-bold text-blue-600 mb-2">${product.price}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.aisle}, {product.shelf}
                  </p>
                  <Button 
                    className="w-full bg-blue-400 hover:bg-blue-500"
                    onClick={() => {
                      setSelectedProduct(product);
                      setActiveTab('search');
                    }}
                  >
                    Find in Store
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerPortal;
