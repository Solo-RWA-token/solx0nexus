/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar, BottomNav, Footer } from './components/Shared';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { Hangar } from './components/Hangar';
import { Checkout } from './components/Checkout';
import { Profile } from './components/Profile';
import { OrderSuccess } from './components/OrderSuccess';
import { Login } from './components/Login';
import { Orders } from './components/Orders';
import { VehicleDetails } from './components/VehicleDetails';
import { Vehicle } from './constants';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [cart, setCart] = useState<Vehicle[]>([]);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [previousScreen, setPreviousScreen] = useState('catalog');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  // Handle pending checkout after login
  useEffect(() => {
    if (pendingCheckout && user) {
      setPendingCheckout(false);
      setCurrentScreen('checkout');
    }
  }, [user, pendingCheckout]);

  const handleAddToCart = (vehicle: Vehicle) => {
    setCart((prev) => [...prev, vehicle]);
    setSelectedVehicle(null);
    setCurrentScreen('hangar');
  };

  const handleViewDetails = (vehicle: Vehicle, fromScreen: string) => {
    setSelectedVehicle(vehicle);
    setPreviousScreen(fromScreen);
    setCurrentScreen('vehicle-details');
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login before checkout
      setPendingCheckout(true);
      setCurrentScreen('login');
    } else {
      setCurrentScreen('checkout');
    }
  };

  const handleCompleteOrder = async () => {
    // Save order to localStorage (mock storage)
    if (user && cart.length > 0) {
      try {
        const ORDERS_KEY = 'solx_mock_orders';
        const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        const newOrders = cart.map(item => ({
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.uid,
          assetId: item.id,
          assetName: item.name,
          assetImage: item.image,
          price: item.price,
          status: 'processing',
          createdAt: new Date().toISOString(),
        }));
        localStorage.setItem(ORDERS_KEY, JSON.stringify([...newOrders, ...existingOrders]));
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
    setCart([]);
    setCurrentScreen('success');
  };

  const handleLoginSuccess = () => {
    if (pendingCheckout) {
      setPendingCheckout(false);
      setCurrentScreen('checkout');
    } else {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'catalog':
        return <Catalog onAddToCart={handleAddToCart} onViewDetails={(v) => handleViewDetails(v, 'catalog')} />;
      case 'hangar':
        return <Hangar cart={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} onViewDetails={(v) => handleViewDetails(v, 'hangar')} />;
      case 'vehicle-details':
        if (selectedVehicle) {
          const isInCart = cart.some(item => item.id === selectedVehicle.id);
          return (
            <VehicleDetails 
              vehicle={selectedVehicle} 
              onBack={() => setCurrentScreen(previousScreen)} 
              onAddToCart={handleAddToCart}
              isInCart={isInCart}
            />
          );
        }
        return <Catalog onAddToCart={handleAddToCart} onViewDetails={(v) => handleViewDetails(v, 'catalog')} />;
      case 'checkout':
        if (!user) {
          return <Login onNavigate={setCurrentScreen} onLoginSuccess={handleLoginSuccess} />;
        }
        return <Checkout cart={cart} onComplete={handleCompleteOrder} />;
      case 'profile':
        return <Profile />;
      case 'success':
        return <OrderSuccess onNavigate={setCurrentScreen} />;
      case 'login':
        return <Login onNavigate={setCurrentScreen} onLoginSuccess={handleLoginSuccess} />;
      case 'orders':
        if (!user) {
          return <Login onNavigate={setCurrentScreen} onLoginSuccess={() => setCurrentScreen('orders')} />;
        }
        return <Orders onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={setCurrentScreen} 
        currentScreen={currentScreen} 
        cartCount={cart.length}
        user={user}
      />
      
      <main className="flex-grow">
        {renderScreen()}
      </main>

      {currentScreen !== 'login' && (
        <Footer />
      )}

      {currentScreen !== 'success' && currentScreen !== 'checkout' && currentScreen !== 'login' && (
        <BottomNav onNavigate={setCurrentScreen} currentScreen={currentScreen} />
      )}
    </div>
  );
}
