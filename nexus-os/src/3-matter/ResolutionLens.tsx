import React from 'react';
import { Maximize2, Minimize2, Circle, Diamond, Square } from 'lucide-react';
import { useFascia } from '../6-energy/FasciaContext';

interface LensProps {
  isMobile?: boolean;
}

export default function ResolutionLens({ isMobile }: LensProps) {
  const { resolution, setResolution } = useFascia();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution(Number(e.target.value));
  };

  // THE DIMENSION NODES (Snap Points)
  const nodes = [
    { pos: 10, icon: Circle, label: 'Flow' },      // 0-30%
    { pos: 50, icon: Diamond, label: 'Manage' },   // 30-80%
    { pos: 90, icon: Square, label: 'Architect' }  // 80-100%
  ];

  return (
    <div className={`flex items-center gap-3 ${isMobile ? 'flex-row w-full px-4' : 'flex-col h-64 py-4'}`}>
      
      {/* Low Res Icon */}
      <Minimize2 size={16} className="text-muted" />

      {/* THE SLIDER TRACK */}
      <div className={`relative flex items-center justify-center ${isMobile ? 'flex-1' : 'h-full w-12'}`}>
        
        {/* NATIVE INPUT (Invisible Touch Target) */}
        <input
          type="range"
          min="0"
          max="100"
          value={resolution}
          onChange={handleChange}
          className={`appearance-none bg-transparent cursor-pointer z-30 opacity-0 ${isMobile ? 'w-full h-8' : 'h-full w-full'}`}
          style={isMobile ? {} : { writingMode: 'vertical-lr', direction: 'rtl' }}
        />

        {/* VISUAL TRACK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`bg-muted/10 rounded-full ${isMobile ? 'w-full h-1' : 'w-1 h-full'}`} />
        </div>

        {/* DIMENSION NODES (Visual Ticks) */}
        {nodes.map((node) => (
          <div 
            key={node.label}
            className={`absolute flex items-center justify-center z-10 transition-all duration-300
              ${resolution >= node.pos ? 'text-primary scale-110' : 'text-muted/30 scale-100'}
            `}
            style={{
              [isMobile ? 'left' : 'bottom']: `${node.pos}%`,
              transform: isMobile ? 'translateX(-50%)' : 'translateY(50%)'
            }}
          >
             {/* Tiny dot on the track */}
             <div className={`w-2 h-2 rounded-full ${resolution >= node.pos ? 'bg-primary' : 'bg-muted/30'}`} />
             
             {/* Hover Label (Desktop only) */}
             {!isMobile && (
               <span className="absolute left-6 text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 {node.label}
               </span>
             )}
          </div>
        ))}

        {/* ACTIVE FILL (Gold Energy) */}
        <div 
          className={`absolute bg-primary rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)] pointer-events-none transition-all duration-75`}
          style={{
            [isMobile ? 'width' : 'height']: `${resolution}%`,
            [isMobile ? 'height' : 'width']: '4px',
            [isMobile ? 'left' : 'bottom']: 0
          }}
        />

        {/* THE THUMB (Current Position) */}
        <div 
          className={`absolute bg-background border-2 border-primary w-5 h-5 rounded-full shadow-lg z-20 pointer-events-none flex items-center justify-center`}
          style={{
             [isMobile ? 'left' : 'bottom']: `calc(${resolution}% - 10px)`,
          }}
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </div>
      </div>

      {/* High Res Icon */}
      <Maximize2 size={16} className="text-primary" />
    </div>
  );
}