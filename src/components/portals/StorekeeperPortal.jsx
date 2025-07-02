// Storekeeper Portal - Stock management, order registration, alerts
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../ui/use-toast';

const StorekeeperPortal = ({ onBack }) => {
  const { user, login, isAuthenticated } = useAuth();
  const { products, customers, employees, updateProduct, addProduct, deleteProduct, addOrder, addAlert } = useData();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('stock');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    aisle: '',
    shelf: ''
  });
  const [orderForm, setOrderForm] = useState({
    customerPhone: '',
    items: [],
    currentItem: { productId: '', quantity: 1 }
  });
  const [alertForm, setAlertForm] = useState({
    employeeId: '',
    message: ''
  });

  // Login handler for storekeeper
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(loginData, 'storekeeper');
    if (result.success) {
      toast({
        title: "Login Successful",
        description: "Welcome to the storekeeper portal!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials",
        variant: "destructive",
      });
    }
  };

  // Stock management functions
  const handleUpdateStock = (productId, newQuantity) => {
    updateProduct(productId, { stockQuantity: parseInt(newQuantity) });
    toast({
      title: "Stock Updated",
      description: "Product stock quantity has been updated successfully.",
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
      stockQuantity: parseInt(newProduct.stockQuantity) || 0
    });

    setNewProduct({
      name: '',
      category: '',
      price: '',
      stockQuantity: '',
      aisle: '',
      shelf: ''
    });

    toast({
      title: "Product Added",
      description: "New product has been added successfully.",
    });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    });
  };

  // Order registration functions
  const handleAddItemToOrder = () => {
    const product = products.find(p => p.productId === orderForm.currentItem.productId);
    if (!product) {
      toast({
        title: "Error",
        description: "Please select a valid product",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      productId: product.productId,
      name: product.name,
      quantity: orderForm.currentItem.quantity,
      price: product.price
    };

    setOrderForm(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      currentItem: { productId: '', quantity: 1 }
    }));
  };

  const handleRemoveItemFromOrder = (index) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitOrder = () => {
    if (!orderForm.customerPhone || orderForm.items.length === 0) {
      toast({
        title: "Error",
        description: "Please add customer phone and at least one item",
        variant: "destructive",
      });
      return;
    }

    const customer = customers.find(c => c.phoneNumber === orderForm.customerPhone);
    if (!customer) {
      toast({
        title: "Error",
        description: "Customer not found. Please check the phone number.",
        variant: "destructive",
      });
      return;
    }

    const totalAmount = orderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = {
      customerId: orderForm.customerPhone,
      items: orderForm.items,
      orderDate: new Date().toISOString().split('T')[0],
      totalAmount: totalAmount,
      status: 'Processing'
    };

    addOrder(newOrder);

    // Update product stock
    orderForm.items.forEach(item => {
      const product = products.find(p => p.productId === item.productId);
      if (product) {
        updateProduct(item.productId, { 
          stockQuantity: Math.max(0, product.stockQuantity - item.quantity) 
        });
      }
    });

    setOrderForm({
      customerPhone: '',
      items: [],
      currentItem: { productId: '', quantity: 1 }
    });

    toast({
      title: "Order Registered",
      description: `Order created successfully. Total: $${totalAmount.toFixed(2)}`,
    });
  };

  // Alert management functions
  const handleSendAlert = (e) => {
    e.preventDefault();
    if (!alertForm.employeeId || !alertForm.message) {
      toast({
        title: "Error",
        description: "Please select an employee and enter a message",
        variant: "destructive",
      });
      return;
    }

    addAlert({
      employeeId: alertForm.employeeId,
      message: alertForm.message,
      status: 'pending'
    });

    setAlertForm({
      employeeId: '',
      message: ''
    });

    toast({
      title: "Alert Sent",
      description: "Alert has been sent to the employee successfully.",
    });
  };

  // Calculate loyalty points discount
  const calculateDiscount = (customerPhone, totalAmount) => {
    const customer = customers.find(c => c.phoneNumber === customerPhone);
    if (!customer) return 0;
    
    const maxDiscount = Math.min(customer.loyaltyPoints * 0.5, totalAmount * 0.2); // Max 20% discount
    return maxDiscount;
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Storekeeper Login</h2>
          <p className="text-gray-600">Enter your email and password to continue</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="storekeeper@store.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <p className="text-sm text-blue-600 mt-1">
                Demo: Any email and password will work
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
          <h2 className="text-3xl font-bold text-gray-900">Storekeeper Portal</h2>
          <p className="text-gray-600">Manage inventory, register orders, and coordinate with staff</p>
        </div>
        <Button onClick={onBack} variant="outline">
          ← Back to Portal Selection
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'stock', label: 'Stock Management' },
          { id: 'orders', label: 'Order Registration' },
          { id: 'alerts', label: 'Send Alerts' }
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

      {/* Stock Management Tab */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          {/* Add New Product Form */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g., Organic Milk"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="e.g., Dairy"
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="aisle">Aisle</Label>
                <Input
                  id="aisle"
                  value={newProduct.aisle}
                  onChange={(e) => setNewProduct({...newProduct, aisle: e.target.value})}
                  placeholder="e.g., Aisle 1"
                />
              </div>
              <div>
                <Label htmlFor="shelf">Shelf</Label>
                <Input
                  id="shelf"
                  value={newProduct.shelf}
                  onChange={(e) => setNewProduct({...newProduct, shelf: e.target.value})}
                  placeholder="e.g., Shelf A"
                />
              </div>
              <div className="md:col-span-3">
                <Button type="submit" className="bg-blue-400 hover:bg-blue-500">
                  Add Product
                </Button>
              </div>
            </form>
          </Card>

          {/* Products Table */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Current Inventory</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.productId} className={product.stockQuantity < 10 ? 'bg-red-50' : ''}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={product.stockQuantity}
                            onChange={(e) => handleUpdateStock(product.productId, e.target.value)}
                            className="w-20"
                            min="0"
                          />
                          {product.stockQuantity < 10 && (
                            <Badge variant="destructive" className="text-xs">Low</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {product.aisle}, {product.shelf}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteProduct(product.productId)}
                          variant="destructive"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* Order Registration Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Register New Order</h3>
            
            {/* Customer Selection */}
            <div className="mb-6">
              <Label htmlFor="customerPhone">Customer Phone Number</Label>
              <Input
                id="customerPhone"
                value={orderForm.customerPhone}
                onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
                placeholder="e.g., 5551234567"
              />
              {orderForm.customerPhone && (
                <div className="mt-2">
                  {(() => {
                    const customer = customers.find(c => c.phoneNumber === orderForm.customerPhone);
                    return customer ? (
                      <div className="text-sm text-green-600">
                        ✓ Customer: {customer.name} (Loyalty Points: {customer.loyaltyPoints})
                      </div>
                    ) : (
                      <div className="text-sm text-red-600">
                        ✗ Customer not found
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Add Items */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Add Items to Order</h4>
              <div className="flex space-x-4 items-end">
                <div className="flex-1">
                  <Label>Product</Label>
                  <Select
                    value={orderForm.currentItem.productId}
                    onValueChange={(value) => setOrderForm({
                      ...orderForm,
                      currentItem: {...orderForm.currentItem, productId: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.productId} value={product.productId}>
                          {product.name} - ${product.price} (Stock: {product.stockQuantity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={orderForm.currentItem.quantity}
                    onChange={(e) => setOrderForm({
                      ...orderForm,
                      currentItem: {...orderForm.currentItem, quantity: parseInt(e.target.value) || 1}
                    })}
                    className="w-20"
                  />
                </div>
                <Button onClick={handleAddItemToOrder} className="bg-blue-400 hover:bg-blue-500">
                  Add Item
                </Button>
              </div>
            </div>

            {/* Order Items */}
            {orderForm.items.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Order Items</h4>
                <div className="space-y-2">
                  {orderForm.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          onClick={() => handleRemoveItemFromOrder(index)}
                          variant="destructive"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-4 p-4 bg-blue-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${orderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  {orderForm.customerPhone && (
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span>Available Loyalty Discount:</span>
                        <span className="text-green-600">
                          -${calculateDiscount(
                            orderForm.customerPhone, 
                            orderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button 
              onClick={handleSubmitOrder}
              className="w-full bg-blue-400 hover:bg-blue-500"
              disabled={!orderForm.customerPhone || orderForm.items.length === 0}
            >
              Register Order
            </Button>
          </Card>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Send Alert to Employee</h3>
            <form onSubmit={handleSendAlert} className="space-y-4">
              <div>
                <Label htmlFor="employee">Select Employee</Label>
                <Select
                  value={alertForm.employeeId}
                  onValueChange={(value) => setAlertForm({...alertForm, employeeId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(employee => (
                      <SelectItem key={employee.employeeId} value={employee.employeeId}>
                        {employee.name} ({employee.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Alert Message</Label>
                <textarea
                  id="message"
                  value={alertForm.message}
                  onChange={(e) => setAlertForm({...alertForm, message: e.target.value})}
                  placeholder="e.g., Restock sugar in Aisle 5, Shelf A"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                  required
                />
              </div>
              
              <Button type="submit" className="bg-blue-400 hover:bg-blue-500">
                Send Alert
              </Button>
            </form>

            {/* Quick Alert Templates */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Quick Alert Templates</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Restock needed in dairy section",
                  "Clean spill in produce area",
                  "Price check required",
                  "Customer assistance needed",
                  "Inventory count required",
                  "Equipment maintenance needed"
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setAlertForm({...alertForm, message: template})}
                    className="text-left justify-start"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StorekeeperPortal;
