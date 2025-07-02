
// Portal selection component for choosing which portal to access
import React from 'react';
import { Button } from './ui/button';

const PortalSelector = ({ onSelectPortal }) => {
  const portals = [
    {
      id: 'customer',
      name: 'Customer Portal',
      description: 'View orders, search products, earn loyalty points',
      icon: '👤',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      id: 'storekeeper',
      name: 'Storekeeper Portal',
      description: 'Manage inventory, register orders, send alerts',
      icon: '📦',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      id: 'employee',
      name: 'Employee Portal',
      description: 'View alerts, track tasks, manage work assignments',
      icon: '👷',
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    {
      id: 'admin',
      name: 'Admin Portal',
      description: 'Full system management, reports, user administration',
      icon: '⚙️',
      color: 'bg-blue-400 hover:bg-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Store Management System
          </h1>
          <p className="text-xl text-gray-600">
            Choose your portal to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{portal.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {portal.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {portal.description}
                </p>
              </div>
              
              <Button
                onClick={() => onSelectPortal(portal.id)}
                className={`w-full ${portal.color} text-white font-medium py-2 px-4 rounded-md transition-colors duration-200`}
              >
                Access {portal.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> Using mock data for demonstration. 
              Backend MongoDB integration will be implemented separately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
