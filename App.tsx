
import React, { useState, useMemo, useEffect } from 'react';
import { AIRCRAFT_DATA } from './data';
import { Aircraft } from './types';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import Catalog from './components/Catalog';
import Detail from './components/Detail';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGen, setSelectedGen] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Handle URL Hash for deep linking and back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && AIRCRAFT_DATA.find(a => a.id === hash)) {
        setSelectedId(hash);
      } else {
        setSelectedId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredAircraft = useMemo(() => {
    return AIRCRAFT_DATA.filter(ac => {
      const matchesSearch = 
        ac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ac.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ac.primaryRole.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGen = selectedGen === 'All' || ac.generation === selectedGen;
      const matchesRole = selectedRole === 'All' || ac.primaryRole === selectedRole;
      const matchesCountry = selectedCountry === 'All' || ac.country.includes(selectedCountry);
      const matchesStatus = selectedStatus === 'All' || ac.status === selectedStatus;

      return matchesSearch && matchesGen && matchesRole && matchesCountry && matchesStatus;
    });
  }, [searchTerm, selectedGen, selectedRole, selectedCountry, selectedStatus]);

  const selectedAircraft = useMemo(() => {
    return AIRCRAFT_DATA.find(a => a.id === selectedId) || null;
  }, [selectedId]);

  const handleSelectAircraft = (id: string) => {
    window.location.hash = id;
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen">
      {selectedAircraft ? (
        <Detail 
          aircraft={selectedAircraft} 
          onBack={handleBack} 
          onSelectRelated={handleSelectAircraft}
        />
      ) : (
        <>
          <Navbar 
            searchTerm={searchTerm} 
            onSearch={setSearchTerm} 
          />
          <FilterBar 
            selectedGen={selectedGen} setSelectedGen={setSelectedGen}
            selectedRole={selectedRole} setSelectedRole={setSelectedRole}
            selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          />
          <div className="container mx-auto px-4 mb-4">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">
              Intelligence Records: {filteredAircraft.length} Matches Found
            </h2>
          </div>
          <Catalog 
            aircrafts={filteredAircraft} 
            onSelect={handleSelectAircraft} 
          />
        </>
      )}
      
      <footer className="bg-slate-900 text-slate-500 py-10 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Confidentiality: Public Disclosure // Source: Intelligence Community Consensus
          </p>
          <p className="mt-2 text-[10px]">
            &copy; {new Date().getFullYear()} Global Aircraft Intelligence Database. No rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
