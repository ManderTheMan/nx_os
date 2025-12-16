import { motion } from 'framer-motion';
import { useFascia } from '../6-energy/FasciaContext';
import { Archive, RotateCcw, Clock } from 'lucide-react';

export default function ArchiveView() {
  const { archives, restoreThread } = useFascia();

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-8">
      <div className="flex items-center justify-between border-b border-muted/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-text">The Archives</h1>
          <p className="text-muted text-sm">Mental Cartography & Thread History</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase tracking-widest border border-primary/20 flex items-center gap-2">
          <Archive size={14} /> Total: {archives.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archives.map((thread) => (
          <motion.div 
            key={thread.id}
            layoutId={thread.id}
            className="group p-6 bg-surface rounded-2xl border border-muted/10 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-48"
            onClick={() => restoreThread(thread.id)}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-muted/10 text-muted rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  <Archive size={20} />
                </div>
                <span className="text-[10px] font-mono text-muted flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(thread.timestamp).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {thread.title}
              </h3>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-muted/5">
              <span className="text-xs text-muted font-bold">{thread.particles.length} Particles</span>
              <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-wider">
                <RotateCcw size={12} /> Restore
              </div>
            </div>
          </motion.div>
        ))}

        {archives.length === 0 && (
          <div className="col-span-full p-12 text-center text-muted border-2 border-dashed border-muted/10 rounded-2xl">
            No threads archived yet. Use the Weave button in the Stream.
          </div>
        )}
      </div>
    </div>
  );
}