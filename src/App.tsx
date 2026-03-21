/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, BottomNav, Footer } from './components/Shared';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { Hangar } from './components/Hangar';
import { Checkout } from './components/Checkout';
import { Profile } from './components/Profile';
import { OrderSuccess } from './components/OrderSuccess';
import { Vehicle } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [cart, setCart] = useState<Vehicle[]>([]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const handleAddToCart = (vehicle: Vehicle) => {
    setCart((prev) => [...prev, vehicle]);
    setCurrentScreen('hangar');
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteOrder = () => {
    setCart([]);
    setCurrentScreen('success');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'catalog':
        return <Catalog onAddToCart={handleAddToCart} />;
      case 'hangar':
        return <Hangar cart={cart} onRemove={handleRemoveFromCart} onCheckout={() => setCurrentScreen('checkout')} />;
      case 'checkout':
        return <Checkout cart={cart} onComplete={handleCompleteOrder} />;
      case 'profile':
        return <Profile />;
      case 'success':
        return <OrderSuccess onNavigate={setCurrentScreen} />;
      case 'orders':
        return (
          <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h2 className="font-headline text-4xl font-bold uppercase tracking-tight text-primary mb-8">Mission History</h2>
            <div className="bg-surface-container-low p-12 rounded-xl border border-outline-variant/10 text-center">
              <p className="text-on-surface-variant font-headline text-xl uppercase tracking-widest">No active deployments detected.</p>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentScreen !== 'success' && (
        <Navbar 
          onNavigate={setCurrentScreen} 
          currentScreen={currentScreen} 
          cartCount={cart.length} 
        />
      )}
      
      <main className="flex-grow">
        {renderScreen()}
      </main>

      {currentScreen !== 'success' && currentScreen !== 'checkout' && currentScreen !== 'hangar' && (
        <Footer />
      )}

      {currentScreen !== 'success' && currentScreen !== 'checkout' && (
        <BottomNav onNavigate={setCurrentScreen} currentScreen={currentScreen} />
      )}
    </div>
  );
}
