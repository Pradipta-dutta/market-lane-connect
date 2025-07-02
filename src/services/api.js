
// API service for communicating with Express backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.render.com' 
  : 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Customer API methods
  async getCustomers() {
    return this.request('/customers');
  }

  async getCustomer(phoneNumber) {
    return this.request(`/customers/${phoneNumber}`);
  }

  async createCustomer(customerData) {
    return this.request('/customers', {
      method: 'POST',
      body: customerData,
    });
  }

  async updateCustomer(phoneNumber, customerData) {
    return this.request(`/customers/${phoneNumber}`, {
      method: 'PUT',
      body: customerData,
    });
  }

  async deleteCustomer(phoneNumber) {
    return this.request(`/customers/${phoneNumber}`, {
      method: 'DELETE',
    });
  }

  // Product API methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    return this.request(endpoint);
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: productData,
    });
  }

  async updateProduct(productId, productData) {
    return this.request(`/products/${productId}`, {
      method: 'PUT',
      body: productData,
    });
  }

  async deleteProduct(productId) {
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // Order API methods
  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/orders?${queryString}` : '/orders';
    return this.request(endpoint);
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async updateOrder(orderId, orderData) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: orderData,
    });
  }

  async deleteOrder(orderId) {
    return this.request(`/orders/${orderId}`, {
      method: 'DELETE',
    });
  }

  // Employee API methods
  async getEmployees() {
    return this.request('/employees');
  }

  async getEmployee(employeeId) {
    return this.request(`/employees/${employeeId}`);
  }

  async createEmployee(employeeData) {
    return this.request('/employees', {
      method: 'POST',
      body: employeeData,
    });
  }

  async updateEmployee(employeeId, employeeData) {
    return this.request(`/employees/${employeeId}`, {
      method: 'PUT',
      body: employeeData,
    });
  }

  async deleteEmployee(employeeId) {
    return this.request(`/employees/${employeeId}`, {
      method: 'DELETE',
    });
  }

  // Alert API methods
  async getAlerts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/alerts?${queryString}` : '/alerts';
    return this.request(endpoint);
  }

  async getAlert(alertId) {
    return this.request(`/alerts/${alertId}`);
  }

  async createAlert(alertData) {
    return this.request('/alerts', {
      method: 'POST',
      body: alertData,
    });
  }

  async updateAlert(alertId, alertData) {
    return this.request(`/alerts/${alertId}`, {
      method: 'PUT',
      body: alertData,
    });
  }

  async deleteAlert(alertId) {
    return this.request(`/alerts/${alertId}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
