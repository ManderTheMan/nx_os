import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Settings, ChevronRight, Upload,
  CheckCircle, Network, FileText, PanelRightOpen, 
  Hammer, Brain, Loader, Shield // <--- Shield added
} from 'lucide-react';
import { useFascia } from '../6-energy/FasciaContext';

export default function ActionView() {
  const { activeGuardian, askOracle, addParticle } = useFascia();
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [workshopContent, setWorkshopContent] = useState("");

  const [projects, setProjects] = useState<any[]>([
    { 
      id: 'default', title: 'Awaiting Input', state: 'idle', 
      tasks: [] 
    }
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    addParticle(`Ingesting ${file.name} for analysis...`, 'agent', 'Gemini');

    try {
      const text = await file.text();
      const prompt = `
        Analyze this document. 
        Break it down into a recursive JSON structure with these exact keys:
        {
          "title": "Document Title",
          "concepts": [
             { "id": "c1", "title": "Key Concept Name", "status": "active" },
             { "id": "c2", "title": "Another Concept", "status": "pending" }
          ],
          "patterns": [
             { "id": "p1", "title": "Recurring Pattern 1", "status": "done" }
          ]
        }
        Return ONLY valid JSON.
      `;

      const jsonString = await askOracle(prompt, text);
      const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const analysis = JSON.parse(cleanJson);

      if (analysis.error) throw new Error(analysis.error);

      setProjects([{
        id: 'analysis',
        title: analysis.title || file.name,
        state: 'active',
        tasks: [...(analysis.concepts || []), ...(analysis.patterns || [])]
      }]);
      
      addParticle("Analysis complete. Fractal nodes generated.", 'agent', 'Gemini');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to parse document");
      addParticle("Analysis failed. Data structure unstable.", 'agent', 'Keeper');
    }

    setIsAnalyzing(false);
  };

  const addToWorkshop = (text: string) => {
    setWorkshopContent(prev => prev + `\n- [ ] ${text}`);
    if (!isWorkshopOpen) setIsWorkshopOpen(true);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#f8f9fa]">
      
      {/* 1. LEFT: TOOL BELT */}
      <div className="w-16 border-r border-slate-200/50 flex flex-col items-center py-6 gap-6 bg-white z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${activeGuardian === 'marcus' ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'}`}>
          {activeGuardian === 'marcus' ? <Hammer size={20} /> : <Brain size={20} />}
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
           <label className="p-3 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer" title="Ingest Document">
             <input type="file" className="hidden" onChange={handleFileUpload} accept=".md,.txt,.json,.csv" />
             <Upload size={20} />
           </label>
           
           <button className="p-3 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
             <Terminal size={20} />
           </button>
        </div>
        
        <button className="p-3 text-slate-400 hover:text-slate-800">
          <Settings size={20} />
        </button>
      </div>

      {/* 2. CENTER: FRACTAL NODE GRAPH */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            {activeGuardian === 'marcus' ? 'The Forge' : 'The Lab'}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {activeGuardian === 'marcus' ? 'System Fabrication' : 'Dimensional Analysis'} // Command Center
          </p>
        </header>

        {errorMsg && (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
             <Shield size={20} />
             <span className="font-mono text-sm font-bold">{errorMsg}</span>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex items-center gap-4 text-teal-500 animate-pulse mb-8">
            <Loader size={24} className="animate-spin" />
            <span className="font-mono text-sm">Parsing dimensional structure...</span>
          </div>
        )}

        <div className="space-y-12">
          {projects.map((project: any) => (
            <div key={project.id} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-4 border-[#f8f9fa]" />
              
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">{project.title}</h2>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${project.state === 'active' ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-500'}`}>
                  {project.state}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.tasks.map((task: any, i: number) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -2, borderColor: '#0d9488' }}
                    onClick={() => addToWorkshop(task.title)}
                    className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 group cursor-pointer transition-all"
                  >
                    {task.status === 'done' ? <CheckCircle size={18} className="text-slate-300" /> : 
                     task.status === 'active' ? <Network size={18} className="text-teal-500" /> :
                     <FileText size={18} className="text-slate-400 group-hover:text-teal-500" />}
                    
                    <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700">
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RIGHT: WORKSHOP DRAWER */}
      <div className={`relative transition-all duration-500 ease-in-out border-l border-slate-200 bg-white ${isWorkshopOpen ? 'w-[400px]' : 'w-12'}`}>
        <button 
          onClick={() => setIsWorkshopOpen(!isWorkshopOpen)}
          className="absolute -left-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-500 shadow-sm z-20"
        >
          {isWorkshopOpen ? <ChevronRight size={14} /> : <PanelRightOpen size={14} />}
        </button>

        <div className={`h-full overflow-hidden ${isWorkshopOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">The Loom</h3>
              <Network size={16} className="text-slate-400" />
            </div>

            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-dashed border-slate-200 flex flex-col">
              <p className="text-xs text-slate-400 font-mono mb-2">// Weaver Protocol Active</p>
              <textarea 
                value={workshopContent}
                onChange={(e) => setWorkshopContent(e.target.value)}
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-slate-600 font-mono"
                placeholder="Click nodes to add them here..." 
              />
            </div>
          </div>
        </div>

        {!isWorkshopOpen && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Workshop</span>
          </div>
        )}
      </div>

    </div>
  );
}