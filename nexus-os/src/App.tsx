import Layout from './6-energy/Layout';
import { useFascia } from './6-energy/FasciaContext';
import ActionView from './3-matter/ActionView';
import StreamView from './3-matter/StreamView';
import CreateView from './3-matter/CreateView';
import ArchiveView from './3-matter/ArchiveView';
import { Archive } from 'lucide-react';
import OracleEntry from './3-matter/OracleEntry';

function App() {
  const { currentView, resolution, weaveThread } = useFascia();

  return (
    <Layout>
      {/* SHAPESHIFTER ROUTER */}
      
      {/* 0. ORACLE ENTRY (Home) */}
      {currentView === 'home' && <OracleEntry />}
      
      {/* 1. ACTION (Gym) */}
      {currentView === 'action' && <ActionView />}
      
      {/* 2. STREAM (Time/Memory) */}
      {currentView === 'stream' && (
        <>
          {/* 0-90%: Active Stream */}
          {resolution < 90 && (
             <div className="relative h-full">
               <StreamView />
               {/* WEAVE BUTTON (Floating Bottom Right) */}
               <button 
                 onClick={weaveThread}
                 className="fixed bottom-8 right-8 bg-surface border border-primary/20 hover:bg-primary hover:text-white text-primary p-4 rounded-full shadow-xl transition-all z-50 group"
                 title="Weave Thread to Archive"
               >
                 <Archive size={24} />
                 <span className="absolute right-full mr-4 bg-surface text-text text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                   Weave & Archive
                 </span>
               </button>
             </div>
          )}
          
          {/* 90-100%: The Archives */}
          {resolution >= 90 && <ArchiveView />}
        </>
      )}
      
      {/* 3. CREATE (Lab) */}
      {currentView === 'create' && <CreateView />}
    </Layout>
  );
}

export default App;