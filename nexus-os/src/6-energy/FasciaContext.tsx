import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// --- DATA STRUCTURES ---
export interface Particle {
  id: string;
  content: string;
  type: 'user' | 'agent';
  agentName?: 'Marcus' | 'Azure' | 'Gemini' | 'Keeper';
  timestamp: number;
}

export interface ThreadArchive {
  id: string;
  title: string;
  timestamp: number;
  particles: Particle[];
}

// 1. DEFINE TYPES
export type IntelligenceMode = 'STEALTH' | 'ORACLE';
export type Domain = 'crucible' | 'forge' | 'lab' | 'codex' | 'observatory' | 'resonance';
export type ViewState = 'home' | 'action' | 'stream' | 'create';

interface FasciaContextType {
  resolution: number;
  setResolution: (level: number) => void;
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  currentDomain: Domain;
  setCurrentDomain: (domain: Domain) => void;
  activeGuardian: string | null;
  setActiveGuardian: (id: string | null) => void;
  particles: Particle[];
  addParticle: (content: string, type?: 'user' | 'agent', agentName?: Particle['agentName']) => void;
  intelligenceMode: IntelligenceMode;
  toggleIntelligence: () => void;
  askOracle: (prompt: string, context?: string) => Promise<string>;
  archives: ThreadArchive[];
  weaveThread: () => void;
  restoreThread: (id: string) => void;
}

const FasciaContext = createContext<FasciaContextType | undefined>(undefined);

export const FasciaProvider = ({ children }: { children: ReactNode }) => {
  const [resolutionState, setResolutionState] = useState(() => Number(localStorage.getItem('nexus_resolution')) || 0);
  
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    return (localStorage.getItem('nexus_view') as ViewState) || 'home';
  });

  const [currentDomain, setCurrentDomain] = useState<Domain>(() => {
    return (localStorage.getItem('nexus_domain') as Domain) || 'forge';
  });

  const [activeGuardian, setActiveGuardian] = useState<string | null>(null);

  const [particles, setParticles] = useState<Particle[]>(() => {
    const saved = localStorage.getItem('nexus_particles');
    return saved ? JSON.parse(saved) : [];
  });

  const [archives, setArchives] = useState<ThreadArchive[]>(() => {
    const saved = localStorage.getItem('nexus_archives');
    return saved ? JSON.parse(saved) : [];
  });

  const [intelligenceMode, setIntelligenceMode] = useState<IntelligenceMode>(() => {
    const savedResolution = Number(localStorage.getItem('nexus_resolution')) || 0;
    return savedResolution > 60 ? 'ORACLE' : 'STEALTH';
  });

  const setResolution = (level: number) => {
    setResolutionState(level);
    // Update intelligence mode based on resolution
    if (level > 60 && intelligenceMode !== 'ORACLE') {
      setIntelligenceMode('ORACLE');
    } else if (level <= 60 && intelligenceMode !== 'STEALTH') {
      setIntelligenceMode('STEALTH');
    }
  };

  useEffect(() => { localStorage.setItem('nexus_resolution', resolutionState.toString()); }, [resolutionState]);
  useEffect(() => { localStorage.setItem('nexus_view', currentView); }, [currentView]);
  useEffect(() => { localStorage.setItem('nexus_domain', currentDomain); }, [currentDomain]);
  useEffect(() => { localStorage.setItem('nexus_particles', JSON.stringify(particles)); }, [particles]);
  useEffect(() => { localStorage.setItem('nexus_archives', JSON.stringify(archives)); }, [archives]);

  const toggleIntelligence = () => {
    setIntelligenceMode(prev => prev === 'STEALTH' ? 'ORACLE' : 'STEALTH');
  };

  const addParticle = (content: string, type: 'user' | 'agent' = 'user', agentName?: Particle['agentName']) => {
    const newParticle: Particle = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type,
      agentName,
      timestamp: Date.now(),
    };
    setParticles(prev => [newParticle, ...prev]);
  };

  const weaveThread = () => {
    if (particles.length === 0) return;
    const firstUserMsg = [...particles].reverse().find(p => p.type === 'user');
    const title = firstUserMsg ? firstUserMsg.content.slice(0, 40) + "..." : `Thread ${new Date().toLocaleDateString()}`;

    const newArchive: ThreadArchive = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      timestamp: Date.now(),
      particles: particles 
    };

    setArchives(prev => [newArchive, ...prev]);
    setParticles([]); 
    setTimeout(() => {
        addParticle(`Thread "${title}" woven into the Tapestry.`, 'agent', 'Keeper');
    }, 500);
  };

  const restoreThread = (id: string) => {
    const target = archives.find(a => a.id === id);
    if (target) setParticles(target.particles);
  };

  const askOracle = async (prompt: string, context: string = '') => {
    const STORED_KEY = import.meta.env.VITE_GEMINI_KEY || localStorage.getItem('nexus_api_key');
    const systemInstruction = resolutionState < 50 
      ? "MODE: ANALYSIS. Extract key data points. Output JSON." 
      : "MODE: SYNTHESIS. Find deep patterns and connections. Output JSON.";

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${STORED_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `SYSTEM: ${systemInstruction}\n\nDATA CONTEXT: ${context}\n\nTASK: ${prompt}` }] }]
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    } catch (e) {
      console.error(e);
      return JSON.stringify({ error: "Uplink Failed" });
    }
  };

  // Chat Router (Cleaned unused vars) - Disabled for now
  // const _callAI = async (_input: string, _agent: string, _basePersona: string) => {
  //   console.log("Chat inactive in simplified mode");
  // };

  return (
    <FasciaContext.Provider value={{ 
      resolution: resolutionState, setResolution, 
      currentView, setCurrentView,
      currentDomain, setCurrentDomain,
      activeGuardian, setActiveGuardian,
      particles, addParticle, intelligenceMode, toggleIntelligence,
      archives, weaveThread, restoreThread,
      askOracle
    }}>
      {children}
    </FasciaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFascia = () => {
  const context = useContext(FasciaContext);
  if (!context) throw new Error('useFascia must be used within a FasciaProvider');
  return context;
};