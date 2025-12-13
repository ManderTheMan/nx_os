import React from 'react';
import type { ReactNode } from 'react'; // Fixes the ReactNode error
import { useFascia, type ViewState } from './FasciaContext'; // Fixes the 'home' type error
import { 
  Home, Activity, Zap, Brain, 
  Settings, Command 
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentView, setCurrentView } = useFascia();

  // Navigation Items
  const navItems = [
    { id: 'home', icon: Home, label: 'Oracle' },
    { id: 'action', icon: Activity, label: 'Forge' },
    { id: 'stream', icon: Zap, label: 'Stream' },
    { id: 'create', icon: Brain, label: 'Lab' },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-text overflow-hidden font-sans selection:bg-primary/20">
      
      {/* THE SPINE (Sidebar) */}
      <nav className="w-16 h-full flex flex-col items-center py-6 border-r border-muted/10 bg-surface z-50">
        
        {/* LOGO */}
        <div className="mb-8 p-3 bg-primary/10 rounded-xl text-primary">
          <Command size={20} />
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 flex flex-col gap-6 w-full px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewState)}
              className={`
                relative group flex items-center justify-center p-3 rounded-xl transition-all duration-300
                ${currentView === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-muted hover:bg-muted/10 hover:text-text'}
              `}
            >
              <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
              
              {/* Tooltip */}
              <span className="absolute left-14 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* SETTINGS */}
        <button className="p-3 text-muted hover:text-text transition-colors">
          <Settings size={20} />
        </button>
      </nav>

      {/* THE VIEWPORT (Content) */}
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>

    </div>
  );
}