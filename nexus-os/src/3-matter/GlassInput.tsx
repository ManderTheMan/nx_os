import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowUp, Paperclip, GitBranch, 
  Shield, Heart, Brain, Database, MessageSquare, File, Wifi, Cpu
} from 'lucide-react';
import { useFascia } from '../6-energy/FasciaContext';

interface GlassInputProps {
  isOpen: boolean;
  onClose: () => void;
}

// THE PREDICTIVE ROUTER (Mini-Brain)
const analyzeIntent = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.match(/gym|squat|lift|build|code|fix|bug|api|render|loop/)) 
    return { agent: 'Marcus', color: 'text-action', bg: 'bg-action/10', layer: '3: MATTER' };
  if (lower.match(/tired|feel|sad|happy|energy|rest|sleep|flow/)) 
    return { agent: 'Azure', color: 'text-teal-500', bg: 'bg-teal-500/10', layer: '6: ENERGY' };
  if (lower.match(/plan|strategy|idea|vision|blueprint|map/)) 
    return { agent: 'Gemini', color: 'text-secondary', bg: 'bg-secondary/10', layer: '9: SPIRIT' };
  return { agent: 'Keeper', color: 'text-muted', bg: 'bg-muted/10', layer: '0: ARCHIVE' };
};

export default function GlassInput({ isOpen, onClose }: GlassInputProps) {
  const { addParticle, intelligenceMode, toggleIntelligence } = useFascia();
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [route, setRoute] = useState(analyzeIntent(''));
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus and reset when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setRoute(analyzeIntent(''));
    }
  }, [isOpen]);

  // Real-time Routing Analysis
  useEffect(() => {
    setRoute(analyzeIntent(text));
  }, [text]);

  const handleSubmit = () => {
    if (!text.trim() && !file) return;
    
    // Simulate File Upload + Text
    const content = file ? `[FILE: ${file.name}] ${text}` : text;
    
    addParticle(content, 'user'); // Send to Stream
    setText('');
    setFile(null);
    setIsChatting(false);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const getAgentIcon = (name: string) => {
    switch(name) {
      case 'Marcus': return <Shield size={14} />;
      case 'Azure': return <Heart size={14} />;
      case 'Gemini': return <Brain size={14} />;
      default: return <Database size={14} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP BLUR */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60]"
          />

          {/* THE GLASS MODAL */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:bottom-10 md:w-[600px] z-[70]"
          >
            <div className="bg-surface/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative">
              
              {/* HEADER: ROUTING INTELLIGENCE */}
              <div className={`px-4 py-2 flex items-center justify-between text-xs font-bold border-b border-muted/10 ${route.bg} ${route.color} transition-colors duration-300`}>
                <div className="flex items-center gap-2">
                  <GitBranch size={12} />
                  <span>ROUTING TO: {route.layer}</span>
                </div>
                {/* RIGHT SIDE: INTELLIGENCE SWITCH */}
                <button 
                  onClick={toggleIntelligence}
                  className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
                >
                  <span className="opacity-70">{intelligenceMode}</span>
                  {intelligenceMode === 'ORACLE' ? <Wifi size={12} /> : <Cpu size={12} />}
                </button>
              </div>

              {/* CHAT CONTEXT (If enabled) */}
              <AnimatePresence>
                {isChatting && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="bg-muted/5 px-4 py-3 border-b border-muted/10"
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 ${route.color}`}>{getAgentIcon(route.agent)}</div>
                      <div className="text-sm text-muted">
                        <span className="font-bold text-text">{route.agent}:</span> Standing by.
                        {route.agent === 'Marcus' && " Ready to log structural changes."}
                        {route.agent === 'Azure' && " Listening for resonance."}
                        {route.agent === 'Gemini' && " Preparing architectural patterns."}
                        <br/>
                        <span className="text-xs opacity-70">How would you like to refine this particle?</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* INPUT AREA */}
              <div className="p-4">
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }}}
                  placeholder={`What are we building, Commander?`}
                  className="w-full bg-transparent outline-none text-lg text-text placeholder:text-muted/40 resize-none min-h-[60px] max-h-[200px]"
                />
                
                {/* UPLOADED FILE PREVIEW */}
                {file && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-primary/5 rounded-lg border border-primary/10 w-fit">
                    <File size={14} className="text-primary" />
                    <span className="text-xs font-medium text-primary">{file.name}</span>
                    <button onClick={() => setFile(null)} className="hover:text-action"><X size={12}/></button>
                  </div>
                )}
              </div>

              {/* TOOL BELT (Actions) */}
              <div className="px-4 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  
                  {/* UPLOAD BUTTON */}
                  <label className="p-2 rounded-lg hover:bg-muted/10 text-muted hover:text-primary cursor-pointer transition-colors">
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                    <Paperclip size={20} />
                  </label>

                  {/* CHAT TOGGLE */}
                  <button 
                    onClick={() => setIsChatting(!isChatting)}
                    className={`p-2 rounded-lg transition-colors ${isChatting ? 'bg-secondary/10 text-secondary' : 'hover:bg-muted/10 text-muted hover:text-secondary'}`}
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                  onClick={handleSubmit}
                  disabled={!text && !file}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/20"
                >
                  <ArrowUp size={24} />
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}