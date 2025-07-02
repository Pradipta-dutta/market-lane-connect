
// Portal selection component for choosing which portal to access
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const PortalSelector = ({ onSelectPortal }) => {
  const portals = [
    {
      id: 'customer',
      name: 'Customer Portal',
      description: 'View orders, search products, earn loyalty points',
      icon: '👤',
      gradient: 'from-blue-400 to-blue-600',
      features: ['Order History', 'Product Search', 'Store Navigation', 'Loyalty Points']
    },
    {
      id: 'storekeeper',
      name: 'Storekeeper Portal',
      description: 'Manage inventory, register orders, send alerts',
      icon: '📦',
      gradient: 'from-blue-500 to-blue-700',
      features: ['Stock Management', 'Order Registration', 'Inventory Control', 'Alert System']
    },
    {
      id: 'employee',
      name: 'Employee Portal',
      description: 'View alerts, track tasks, manage work assignments',
      icon: '👷',
      gradient: 'from-blue-600 to-blue-800',
      features: ['Task Management', 'Alert Notifications', 'Work Tracking', 'Status Updates']
    },
    {
      id: 'admin',
      name: 'Admin Portal',
      description: 'Full system management, reports, user administration',
      icon: '⚙️',
      gradient: 'from-blue-700 to-blue-900',
      features: ['User Management', 'System Reports', 'Analytics', 'Full Control']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <span className="text-3xl text-white">🏪</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Store Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your portal to access a complete store management solution with real-time inventory, 
            customer management, and advanced analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {portals.map((portal, index) => (
            <Card
              key={portal.id}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${portal.gradient} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl text-white">{portal.icon}</span>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {portal.name}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {portal.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {portal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={() => onSelectPortal(portal.id)}
                  className={`w-full bg-gradient-to-r ${portal.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white font-medium py-3 rounded-lg`}
                  size="lg"
                >
                  Access {portal.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 inline-block">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-800">System Status: Online</span>
              </div>
              <p className="text-sm text-blue-700">
                <strong>Full-Stack Ready:</strong> Backend API with MongoDB integration. 
                Frontend built with React, Vite, and Tailwind CSS.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
