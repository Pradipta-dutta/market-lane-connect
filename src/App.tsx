
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import PortalSelector from './components/PortalSelector';
import CustomerPortal from './components/portals/CustomerPortal';
import StorekeeperPortal from './components/portals/StorekeeperPortal';
import EmployeePortal from './components/portals/EmployeePortal';
import AdminPortal from './components/portals/AdminPortal';
import Layout from './components/Layout';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  const [selectedPortal, setSelectedPortal] = useState(null);

  const handlePortalSelect = (portalId) => {
    setSelectedPortal(portalId);
  };

  const handleBackToSelection = () => {
    setSelectedPortal(null);
  };

  const renderPortal = () => {
    switch (selectedPortal) {
      case 'customer':
        return <CustomerPortal onBack={handleBackToSelection} />;
      case 'storekeeper':
        return <StorekeeperPortal onBack={handleBackToSelection} />;
      case 'employee':
        return <EmployeePortal onBack={handleBackToSelection} />;
      case 'admin':
        return <AdminPortal onBack={handleBackToSelection} />;
      default:
        return <PortalSelector onSelectPortal={handlePortalSelect} />;
    }
  };

  return (
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-white">
            <Toaster />
            <Sonner />
            {selectedPortal ? (
              <Layout>
                {renderPortal()}
              </Layout>
            ) : (
              renderPortal()
            )}
          </div>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  );
};

export default App;
