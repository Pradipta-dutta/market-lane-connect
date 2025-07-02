
// Data context for managing mock data across the application
import React, { createContext, useContext, useState } from 'react';
import { products as initialProducts } from '../data/products';
import { customers as initialCustomers } from '../data/customers';
import { orders as initialOrders } from '../data/orders';
import { employees as initialEmployees } from '../data/employees';
import { alerts as initialAlerts } from '../data/alerts';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [orders, setOrders] = useState(initialOrders);
  const [employees, setEmployees] = useState(initialEmployees);
  const [alerts, setAlerts] = useState(initialAlerts);

  // Product management functions
  const updateProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(p => 
      p.productId === productId ? { ...p, ...updatedData } : p
    ));
  };

  const addProduct = (newProduct) => {
    const productId = `P${String(products.length + 1).padStart(3, '0')}`;
    setProducts(prev => [...prev, { ...newProduct, productId }]);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.productId !== productId));
  };

  // Order management functions
  const addOrder = (newOrder) => {
    const orderId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
    const orderWithId = { ...newOrder, orderId };
    setOrders(prev => [...prev, orderWithId]);
    
    // Update customer's order history and loyalty points
    const customer = customers.find(c => c.phoneNumber === newOrder.customerId);
    if (customer) {
      const loyaltyPointsToAdd = Math.floor(newOrder.totalAmount / 10); // 1 point per $10
      setCustomers(prev => prev.map(c => 
        c.phoneNumber === newOrder.customerId 
          ? { 
              ...c, 
              orderHistory: [...c.orderHistory, orderId],
              loyaltyPoints: c.loyaltyPoints + loyaltyPointsToAdd
            }
          : c
      ));
    }
    
    return orderWithId;
  };

  // Alert management functions
  const addAlert = (newAlert) => {
    const alertId = `ALT${String(alerts.length + 1).padStart(3, '0')}`;
    const alertWithId = { ...newAlert, alertId, timestamp: new Date().toISOString() };
    setAlerts(prev => [...prev, alertWithId]);
    
    // Update employee's alerts array
    setEmployees(prev => prev.map(e => 
      e.employeeId === newAlert.employeeId 
        ? { ...e, alerts: [...e.alerts, alertWithId] }
        : e
    ));
    
    return alertWithId;
  };

  const updateAlert = (alertId, updatedData) => {
    setAlerts(prev => prev.map(a => 
      a.alertId === alertId ? { ...a, ...updatedData } : a
    ));
    
    // Also update in employee's alerts array
    setEmployees(prev => prev.map(e => ({
      ...e,
      alerts: e.alerts.map(a => 
        a.alertId === alertId ? { ...a, ...updatedData } : a
      )
    })));
  };

  // User management functions
  const addEmployee = (newEmployee) => {
    const employeeId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees(prev => [...prev, { ...newEmployee, employeeId, alerts: [] }]);
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(e => e.employeeId !== employeeId));
  };

  const value = {
    // Data
    products,
    customers,
    orders,
    employees,
    alerts,
    
    // Product functions
    updateProduct,
    addProduct,
    deleteProduct,
    
    // Order functions
    addOrder,
    
    // Alert functions
    addAlert,
    updateAlert,
    
    // User functions
    addEmployee,
    deleteEmployee,
    
    // Utility functions
    getLowStockProducts: () => products.filter(p => p.stockQuantity < 10),
    getCustomerOrders: (phoneNumber) => orders.filter(o => o.customerId === phoneNumber),
    getEmployeeAlerts: (employeeId) => alerts.filter(a => a.employeeId === employeeId)
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
