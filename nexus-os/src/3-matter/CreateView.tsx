import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Box, Layers, GitBranch, Plus, FileText, Trash2, Archive, Database } from 'lucide-react';
import { useFascia } from '../6-energy/FasciaContext';
import { MOCK_FILES } from '../9-spirit/mockVault';

export default function CreateView() {
  const { resolution, addParticle } = useFascia();
  const [text, setText] = useState('');
  const [files, setFiles] = useState(MOCK_FILES);

  const handleClean = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    addParticle("File optimized and deduplicated.", 'agent', 'Keeper');
  };

  // --- STATE 1: ACTIVE WORKSPACE (Low Res 0-40%) ---
  // "Zen Writer / IDE" - The Surface
  if (resolution < 40) {
    return (
      <div className="h-[80vh] max-w-2xl mx-auto flex flex-col justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Initialize sequence..."
            className="w-full h-96 bg-transparent text-2xl font-serif text-text placeholder:text-muted/30 outline-none resize-none leading-relaxed p-8 border-l-2 border-secondary/20 focus:border-secondary transition-colors"
          />
          <div className="absolute top-0 -left-10 text-muted/20">
            <PenTool size={24} />
          </div>
        </motion.div>
        <p className="text-center text-xs text-muted mt-8 uppercase tracking-widest opacity-50">
          Active Workspace
        </p>
      </div>
    );
  }

  // --- STATE 2: STAGING AREA (Mid Res 40-85%) ---
  // "Project Blueprints" - The Middle Layer
  if (resolution < 85) {
    return (
      <div className="max-w-5xl mx-auto pb-24 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-muted/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-text">Staging Area</h1>
            <p className="text-muted text-sm">Active Blueprints & Research</p>
          </div>
          <button className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-xs font-bold uppercase tracking-widest border border-secondary/20 hover:bg-secondary/20 transition-colors flex items-center gap-2">
            <Plus size={14} /> New Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-surface rounded-2xl border border-muted/10 hover:border-secondary/30 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl group-hover:bg-secondary group-hover:text-white transition-colors">
                <Box size={24} />
              </div>
              <span className="text-xs font-mono text-muted">ACTIVE</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Nexus OS</h3>
            <div className="flex items-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1"><GitBranch size={12} /> v0.1.0</div>
              <div className="flex items-center gap-1"><Layers size={12} /> Phase 3</div>
            </div>
          </div>

          <div className="group p-6 bg-surface rounded-2xl border border-muted/10 hover:border-purple-500/30 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Layers size={24} />
              </div>
              <span className="text-xs font-mono text-muted">PLANNING</span>
            </div>
            <h3 className="text-lg font-bold mb-2">The Garden</h3>
            <div className="flex items-center gap-4 text-xs text-muted">
               <div className="w-full bg-muted/10 h-1 rounded-full overflow-hidden">
                 <div className="w-1/3 bg-purple-500 h-full" />
               </div>
               <span>33%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- STATE 3: THE VAULT (High Res 85-100%) ---
  // "Deep Storage / File System" - The Deepest Layer
  return (
    <div className="max-w-3xl mx-auto pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">The Vault</h1>
          <p className="text-xs text-muted font-mono uppercase tracking-widest mt-1">Deep Storage / Vector Index</p>
        </div>
        <div className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-xs font-bold uppercase flex items-center gap-2 border border-purple-500/20">
          <Database size={12} /> Indexing Active
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-muted/10 overflow-hidden shadow-sm">
        {/* Vault Header */}
        <div className="p-4 bg-muted/5 border-b border-muted/10 grid grid-cols-12 text-xs font-bold text-muted uppercase tracking-wider">
          <div className="col-span-6">File Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* File List */}
        {files.map((file) => (
          <motion.div 
            key={file.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-muted/5 grid grid-cols-12 items-center hover:bg-muted/5 transition-colors group"
          >
            <div className="col-span-6 flex items-center gap-3">
              <FileText size={16} className="text-muted" />
              <div>
                <div className="font-medium text-text">{file.name}</div>
                <div className="text-xs text-muted font-mono">{file.path}</div>
              </div>
            </div>
            <div className="col-span-2 text-xs text-muted uppercase">{file.type}</div>
            <div className="col-span-2">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                file.status === 'duplicate' ? 'bg-action/10 text-action' : 'bg-secondary/10 text-secondary'
              }`}>
                {file.status}
              </span>
            </div>
            <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleClean(file.id)} title="Archive" className="p-2 hover:bg-secondary/10 text-secondary rounded">
                <Archive size={16} />
              </button>
              <button onClick={() => handleClean(file.id)} title="Delete" className="p-2 hover:bg-action/10 text-action rounded">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}