
// Main layout component with navigation between portals
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const { user, userType, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-400 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Store Manager</h1>
              {user && (
                <div className="text-sm">
                  <span className="opacity-75">Welcome, </span>
                  <span className="font-medium">{user.name}</span>
                  <span className="opacity-75"> ({userType})</span>
                </div>
              )}
            </div>
            
            {user && (
              <Button 
                onClick={logout}
                variant="outline"
                className="bg-white text-blue-400 border-white hover:bg-blue-50"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Store Management System. Built with React & Tailwind CSS.</p>
          <p className="text-sm mt-1">
            {/* TODO: Replace mock data with MongoDB integration */}
            Currently using mock data. Backend integration pending.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
