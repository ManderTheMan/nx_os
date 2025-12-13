import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// CRITICAL FIX: Added 'type' and 'resolution'
import { useFascia, type Domain } from '../6-energy/FasciaContext';
import { 
  Hammer, FlaskConical, Scroll, Eye, AudioLines, Flame, 
  Shield, Heart, Brain, Zap, Database, ArrowLeft, 
  Play, Plus, Search 
} from 'lucide-react';

const DOMAIN_MAP = {
  crucible: {
    label: 'The Crucible',
    color: 'text-red-500',
    bg: 'bg-red-500/5',
    icon: Flame,
    children: [
      { id: 'azure', label: 'Azure', icon: Heart },
      { id: 'routine', label: 'Protocol', icon: Play }
    ]
  },
  forge: {
    label: 'The Forge',
    color: 'text-orange-500',
    bg: 'bg-orange-500/5',
    icon: Hammer,
    children: [
      { id: 'marcus', label: 'Marcus', icon: Shield },
      { id: 'new_build', label: 'New Build', icon: Plus }
    ]
  },
  lab: {
    label: 'The Lab',
    color: 'text-teal-500',
    bg: 'bg-teal-500/5',
    icon: FlaskConical,
    children: [
      { id: 'julia', label: 'Julia', icon: Brain },
      { id: 'gemini', label: 'Gemini', icon: Zap }
    ]
  },
  codex: {
    label: 'The Codex',
    color: 'text-blue-500',
    bg: 'bg-blue-500/5',
    icon: Scroll,
    children: [
      { id: 'keeper', label: 'Keeper', icon: Database },
      { id: 'search', label: 'Search', icon: Search }
    ]
  },
  observatory: {
    label: 'Observatory',
    color: 'text-purple-500',
    bg: 'bg-purple-500/5',
    icon: Eye,
    children: [
      { id: 'hermes', label: 'Hermes', icon: Zap }
    ]
  },
  resonance: {
    label: 'Resonance',
    color: 'text-amber-500',
    bg: 'bg-amber-500/5',
    icon: AudioLines,
    children: [{ id: 'osiris', label: 'Osiris', icon: Database }]
  }
};

// CRITICAL FIX: 'export default' keyword added here
export default function OracleEntry() {
  // CRITICAL FIX: Added 'resolution' to destructuring
  const { setCurrentView, setCurrentDomain, setActiveGuardian, resolution } = useFascia();
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Radius based on resolution (slider)
  const ORBIT_RADIUS = 120 + (resolution * 0.5); 

  const handleDomainClick = (domain: string) => {
    setActiveDomain(domain as Domain);
    setCurrentDomain(domain as Domain);
  };

  const handleChildClick = (childId: string) => {
    setActiveGuardian(childId); 
    setCurrentView('action');   
  };

  const currentBg = activeDomain ? DOMAIN_MAP[activeDomain].bg : 'bg-[#f8f9fa]';

  const itemsToShow = activeDomain 
    ? DOMAIN_MAP[activeDomain]?.children || []
    : Object.entries(DOMAIN_MAP).map(([key, val]) => ({ ...val, id: key }));

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700 ${currentBg}`}>
      
      <div 
        className="relative flex items-center justify-center transition-all duration-300"
        style={{ width: ORBIT_RADIUS * 2 + 100, height: ORBIT_RADIUS * 2 + 100 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.button
          layoutId="oracle-core"
          onClick={() => activeDomain ? setActiveDomain(null) : null} 
          className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center relative z-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeDomain ? (
             <ArrowLeft size={24} className="text-slate-400" />
          ) : (
             <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isHovered ? 'bg-slate-800' : 'bg-slate-300'}`} />
          )}
        </motion.button>

        {/* Removed mode='wait' to fix the framer-motion warning */}
        <AnimatePresence>
          {itemsToShow.map((item: any, i) => {
            const total = itemsToShow.length;
            const angle = (i * (360 / total)) - 90;
            const radian = (angle * Math.PI) / 180;
            const x = ORBIT_RADIUS * Math.cos(radian);
            const y = ORBIT_RADIUS * Math.sin(radian);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.05 }}
                className="absolute z-10"
                style={{ top: '50%', left: '50%', marginTop: -24, marginLeft: -24 }}
              >
                <button
                  onClick={() => activeDomain ? handleChildClick(item.id) : handleDomainClick(item.id)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center hover:shadow-md transition-all ${activeDomain ? 'ring-2 ring-current ' + DOMAIN_MAP[activeDomain].color : ''}`}>
                    <item.icon size={20} className={item.color || 'text-slate-600'} />
                  </div>
                  
                  <div className={`absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-opacity duration-300 ${isHovered || activeDomain ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/90 px-2 py-1 rounded backdrop-blur whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {(isHovered || activeDomain) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute border rounded-full pointer-events-none transition-colors duration-500 ${activeDomain ? 'border-current ' + DOMAIN_MAP[activeDomain].color : 'border-slate-200/50'}`}
              style={{ width: ORBIT_RADIUS * 2 + 48, height: ORBIT_RADIUS * 2 + 48, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2 }}
            />
          )}
        </AnimatePresence>
        
        {activeDomain && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: -90 }}
             className={`absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none ${DOMAIN_MAP[activeDomain].color}`}
           >
             <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{DOMAIN_MAP[activeDomain].label}</h2>
           </motion.div>
        )}

      </div>
    </div>
  );
}