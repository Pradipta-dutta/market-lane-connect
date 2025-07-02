
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Employee = require('./models/Employee');
const Alert = require('./models/Alert');

// TODO: Add MongoDB URI from .env
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/storemanagement');

// Sample data generators
const generateCustomers = () => {
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Emily Davis', 'Chris Miller', 'Lisa Garcia', 'Tom Anderson', 'Amy Taylor'];
  const customers = [];
  
  for (let i = 0; i < 50; i++) {
    customers.push({
      phoneNumber: `555${String(1234567 + i).padStart(7, '0')}`,
      name: names[i % names.length] + ` ${i + 1}`,
      loyaltyPoints: Math.floor(Math.random() * 101),
      orderHistory: []
    });
  }
  
  return customers;
};

const generateProducts = () => {
  const products = [
    // Dairy
    { name: 'Whole Milk 1L', category: 'Dairy', price: 3.99 },
    { name: 'Greek Yogurt', category: 'Dairy', price: 5.49 },
    { name: 'Cheddar Cheese', category: 'Dairy', price: 6.99 },
    { name: 'Butter 500g', category: 'Dairy', price: 4.99 },
    { name: 'Eggs Dozen', category: 'Dairy', price: 3.49 },
    
    // Grains
    { name: 'Basmati Rice 2kg', category: 'Grains', price: 8.99 },
    { name: 'Whole Wheat Bread', category: 'Grains', price: 2.99 },
    { name: 'Quinoa 500g', category: 'Grains', price: 7.99 },
    { name: 'Oats 1kg', category: 'Grains', price: 4.49 },
    { name: 'Pasta 500g', category: 'Grains', price: 1.99 },
    
    // Produce
    { name: 'Bananas 1kg', category: 'Produce', price: 2.49 },
    { name: 'Apples 1kg', category: 'Produce', price: 3.99 },
    { name: 'Carrots 500g', category: 'Produce', price: 1.99 },
    { name: 'Onions 1kg', category: 'Produce', price: 2.99 },
    { name: 'Tomatoes 500g', category: 'Produce', price: 3.49 },
    
    // Snacks
    { name: 'Potato Chips', category: 'Snacks', price: 2.99 },
    { name: 'Chocolate Bar', category: 'Snacks', price: 1.99 },
    { name: 'Cookies Pack', category: 'Snacks', price: 3.99 },
    { name: 'Nuts Mix 200g', category: 'Snacks', price: 5.99 },
    { name: 'Crackers', category: 'Snacks', price: 2.49 }
  ];
  
  const fullProducts = [];
  const aisles = ['Aisle 1', 'Aisle 2', 'Aisle 3', 'Aisle 4', 'Aisle 5', 'Aisle 6', 'Aisle 7', 'Aisle 8', 'Aisle 9', 'Aisle 10'];
  const shelves = ['Shelf A', 'Shelf B', 'Shelf C', 'Shelf D', 'Shelf E'];
  
  // Replicate products to reach 100 items
  for (let i = 0; i < 100; i++) {
    const baseProduct = products[i % products.length];
    fullProducts.push({
      productId: `PRD${String(i + 1).padStart(3, '0')}`,
      name: baseProduct.name + (i >= products.length ? ` ${Math.floor(i / products.length) + 1}` : ''),
      category: baseProduct.category,
      price: baseProduct.price + (Math.random() * 2 - 1), // Add some price variation
      stockQuantity: Math.floor(Math.random() * 91) + 10, // 10-100 stock
      aisle: aisles[Math.floor(Math.random() * aisles.length)],
      shelf: shelves[Math.floor(Math.random() * shelves.length)]
    });
  }
  
  return fullProducts;
};

const generateEmployees = () => {
  const employees = [];
  const names = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Jones', 'Eva Brown', 'Frank Davis', 'Grace Miller', 'Henry Wilson', 'Ivy Moore', 'Jack Taylor'];
  
  for (let i = 0; i < 10; i++) {
    employees.push({
      employeeId: `EMP${String(i + 1).padStart(3, '0')}`,
      name: names[i],
      email: `${names[i].toLowerCase().replace(' ', '.')}@store.com`,
      alerts: []
    });
  }
  
  return employees;
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Customer.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Employee.deleteMany({});
    await Alert.deleteMany({});
    
    // Insert new data
    const customers = await Customer.insertMany(generateCustomers());
    const products = await Product.insertMany(generateProducts());
    const employees = await Employee.insertMany(generateEmployees());
    
    console.log(`Seeded ${customers.length} customers`);
    console.log(`Seeded ${products.length} products`);
    console.log(`Seeded ${employees.length} employees`);
    
    // Generate sample orders
    const orders = [];
    for (let i = 0; i < 100; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const numItems = Math.floor(Math.random() * 5) + 1;
      const items = [];
      let totalAmount = 0;
      
      for (let j = 0; j < numItems; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        const itemTotal = product.price * quantity;
        
        items.push({
          productId: product.productId,
          name: product.name,
          quantity: quantity,
          price: product.price
        });
        
        totalAmount += itemTotal;
      }
      
      orders.push({
        orderId: `ORD${String(i + 1).padStart(6, '0')}`,
        customerId: customer.phoneNumber,
        items: items,
        orderDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        totalAmount: Math.round(totalAmount * 100) / 100,
        status: ['Pending', 'Processing', 'Completed'][Math.floor(Math.random() * 3)]
      });
    }
    
    const savedOrders = await Order.insertMany(orders);
    console.log(`Seeded ${savedOrders.length} orders`);
    
    // Generate sample alerts
    const alertMessages = [
      'Restock sugar in Aisle 3',
      'Clean up spill in Aisle 5',
      'Customer needs assistance with heavy items',
      'Low stock on milk products',
      'Price check needed in Produce section',
      'Delivery truck arriving in 30 minutes',
      'Register maintenance required',
      'Temperature check for dairy section',
      'Inventory count needed for Aisle 7',
      'Customer complaint about expired product'
    ];
    
    const alerts = [];
    for (let i = 0; i < 20; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)];
      alerts.push({
        alertId: `ALT${String(i + 1).padStart(3, '0')}`,
        message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
        employeeId: employee.employeeId,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Within last 7 days
        status: ['pending', 'delivered'][Math.floor(Math.random() * 2)]
      });
    }
    
    await Alert.insertMany(alerts);
    console.log(`Seeded ${alerts.length} alerts`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
