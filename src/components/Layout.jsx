
// Main layout component with navigation between portals
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Layout = ({ children }) => {
  const { user, userType, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏪</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Store Manager</h1>
                  <p className="text-blue-100 text-sm">Professional Management System</p>
                </div>
              </div>
              
              {user && (
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <div className="px-4 py-2">
                    <div className="text-sm">
                      <span className="text-blue-100">Welcome, </span>
                      <span className="font-semibold text-white">{user.name || user.phoneNumber}</span>
                    </div>
                    <div className="text-xs text-blue-200 capitalize">
                      {userType} Portal
                    </div>
                  </div>
                </Card>
              )}
            </div>
            
            {user && (
              <Button 
                onClick={logout}
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-200"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-blue-100 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white">🏪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Store Management System</h3>
            </div>
            <p className="text-gray-600 mb-2">
              &copy; 2024 Store Management System. Built with React, Express, and MongoDB.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Frontend: React + Vite + Tailwind
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                Backend: Express + MongoDB
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
