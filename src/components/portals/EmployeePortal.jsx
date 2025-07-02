
// Employee Portal - Alerts and task management
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const EmployeePortal = ({ onBack }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Button onClick={onBack} variant="outline" className="mb-4">
          ← Back to Portal Selection
        </Button>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Employee Login</h2>
          <p className="text-gray-600 mb-4">Email and password authentication required</p>
          <p className="text-sm text-blue-600">
            Feature coming soon - full implementation in next update
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Employee Portal</h2>
        <Button onClick={onBack} variant="outline">
          ← Back to Portal Selection
        </Button>
      </div>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
        <p className="text-gray-600">
          Full employee functionality including alert management and task tracking 
          will be implemented in the next iteration.
        </p>
      </Card>
    </div>
  );
};

export default EmployeePortal;
