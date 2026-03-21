
import React from 'react';
import { motion } from 'motion/react';
import { Menu, ShoppingCart, Home, Grid, Receipt, User, ArrowRight, ArrowLeft, Trash2, Verified, ShieldCheck, Lock, Zap, Cpu, Battery, Activity, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserProfile } from '../types';

// --- Shared Components ---

export const Navbar = ({ onNavigate, currentScreen, cartCount, user }: { onNavigate: (s: string) => void, currentScreen: string, cartCount: number, user?: UserProfile | null }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  return (
    <header className="bg-surface fixed top-0 w-full z-50 shadow-[0_10px_40px_rgba(0,42,52,0.4)] border-b border-outline-variant/10">
      <nav className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button className="text-primary active:scale-95 duration-200 cursor-pointer">
            <Menu size={24} />
          </button>
          <span 
            className="font-headline font-black tracking-tighter text-xl text-primary uppercase cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            SOLX NEXUS
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {['home', 'catalog', 'orders', 'profile'].map((item) => (
            <button 
              key={item}
              onClick={() => onNavigate(item)}
              className={`font-headline font-bold text-sm tracking-widest uppercase transition-colors ${currentScreen === item ? 'text-primary' : 'text-outline hover:text-primary'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-surface font-bold text-xs">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant max-w-[80px] truncate">
                  {user.displayName.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-outline hover:text-error active:scale-95 duration-200 cursor-pointer"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="text-primary hover:text-primary-dim active:scale-95 duration-200 cursor-pointer flex items-center gap-2"
            >
              <LogIn size={20} />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest">Login</span>
            </button>
          )}
          <button 
            onClick={toggleTheme}
            className="text-outline hover:text-primary active:scale-95 duration-200 cursor-pointer p-2 rounded-lg hover:bg-surface-container transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-primary active:scale-95 duration-200 cursor-pointer relative"
            onClick={() => onNavigate('hangar')}
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-tertiary text-surface text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export const BottomNav = ({ onNavigate, currentScreen }: { onNavigate: (s: string) => void, currentScreen: string }) => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/15 z-50">
    {[
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'catalog', icon: Grid, label: 'Catalog' },
      { id: 'orders', icon: Receipt, label: 'Orders' },
      { id: 'profile', icon: User, label: 'Profile' },
    ].map(({ id, icon: Icon, label }) => (
      <button 
        key={id}
        onClick={() => onNavigate(id)}
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:translate-y-0.5 ${currentScreen === id ? 'text-primary font-bold bg-surface-container-high rounded-xl' : 'text-outline'}`}
      >
        <Icon size={20} fill={currentScreen === id ? "currentColor" : "none"} />
        <span className="font-sans text-[10px] uppercase tracking-widest mt-1">{label}</span>
      </button>
    ))}
  </nav>
);

export const SpecTile = ({ label, value, unit, accent = false }: { label: string, value: string, unit?: string, accent?: boolean }) => (
  <div className={`p-8 w-64 border-l-2 ${accent ? 'bg-surface-variant/60 border-primary/20' : 'bg-surface-container-high/60 border-primary/10'} backdrop-blur-xl`}>
    <div className="relative">
      <span className={`font-headline text-5xl font-black leading-none ${accent ? 'text-primary' : 'text-on-surface'}`}>
        {value}{unit && <span className="text-xl">{unit}</span>}
      </span>
      <span className="absolute right-0 top-1/2 -rotate-90 origin-right translate-y-[-50%] font-sans text-[10px] text-on-surface-variant tracking-[0.3em] uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  </div>
);

export const Footer = () => (
  <footer className="mt-12 py-12 px-6 border-t border-outline-variant/10 bg-surface">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-outline">© 2026 SOLX NEXUS AUTOMOTIVE GROUP</p>
      <div className="flex gap-8">
        <a className="text-[10px] font-sans uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Privacy Protocol</a>
        <a className="text-[10px] font-sans uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Service Terms</a>
        <a className="text-[10px] font-sans uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Support</a>
      </div>
    </div>
  </footer>
);
