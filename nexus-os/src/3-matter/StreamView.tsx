import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFascia } from '../6-energy/FasciaContext';
import { User, Shield, Zap, Brain, Heart, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function StreamView() {
  const { particles } = useFascia();

  const getIcon = (name?: string) => {
    switch (name) {
      case 'Marcus': return <Shield size={16} />;
      case 'Azure': return <Heart size={16} />;
      case 'Gemini': return <Brain size={16} />;
      default: return <Database size={16} />;
    }
  };

  const getColor = (name?: string) => {
    switch (name) {
      case 'Marcus': return 'bg-orange-500 text-white';
      case 'Azure': return 'bg-teal-500 text-white';
      case 'Gemini': return 'bg-purple-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar">
       <div className="sticky top-0 bg-background/95 backdrop-blur z-20 py-4 flex items-center justify-between mb-8 border-b border-muted/10">
        <h1 className="text-3xl font-bold text-text">The Stream</h1>
        <span className="text-xs font-mono text-muted">D4 TEMPORAL LAYER</span>
      </div>

      <div className="relative border-l-2 border-primary/20 ml-6 space-y-8 pb-32">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              layout
              className="relative pl-8"
            >
              <div className={`absolute -left-[9px] top-0 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10 ${p.type === 'user' ? 'bg-white text-text border-muted/20' : getColor(p.agentName)}`}>
                {p.type === 'user' ? <User size={14} /> : getIcon(p.agentName)}
              </div>

              <div className={`p-4 rounded-xl border shadow-sm overflow-hidden ${p.type === 'user' ? 'bg-surface border-muted/10' : 'bg-surface/50 border-primary/10'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold uppercase ${p.type === 'user' ? 'text-muted' : 'text-primary'}`}>
                    {p.type === 'user' ? 'You' : p.agentName}
                  </span>
                  <span className="text-[10px] text-muted opacity-50">
                    {new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {/* MARKDOWN RENDERER */}
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-text">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        return !inline ? (
                          <div className="bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto my-2 border border-slate-700 font-mono text-xs">
                            {children}
                          </div>
                        ) : (
                          <code className="bg-muted/20 px-1 py-0.5 rounded text-primary font-mono text-xs" {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {p.content}
                  </ReactMarkdown>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}