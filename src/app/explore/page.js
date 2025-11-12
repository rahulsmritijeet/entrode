'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { fetchVentures } from '@/lib/sheets';
import VentureCard from '@/components/VentureCard';

export default function ExplorePage() {
  const { theme } = useTheme();
  const [ventures, setVentures] = useState([]);
  const [filteredVentures, setFilteredVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVentures();
  }, []);

  useEffect(() => {
    filterVentures();
  }, [ventures, selectedCategory, searchTerm]);

  const loadVentures = async () => {
    setLoading(true);
    try {
      const data = await fetchVentures();
      setVentures(data);
    } catch (error) {
      console.error('Failed to load ventures:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVentures = () => {
    let filtered = ventures;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(v => 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredVentures(filtered);
  };

  const categories = ['All', ...new Set(ventures.map(v => v.category).filter(Boolean))];

  return (
    <div className="theme-bg theme-text min-h-screen">
      <div className="container-main section">

        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${theme === 'neon' ? 'neon-text' : ''}`}>
            <span className="gradient-text">Discover Startups</span>
          </h1>
          <p className="theme-text-secondary text-lg">
            {ventures.length} innovative startups changing India
          </p>
        </div>


        <div className="mb-8">
          <input
            type="search"
            placeholder="Search startups..."
            className="input-field input-lg w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'chip chip-active' : 'chip'}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>


        {loading ? (
          <div className="flex-center py-20">
            <div className="spinner spinner-lg"></div>
          </div>
        ) : (
          <>
            {/* Ventures Grid */}
            <div className="grid-auto">
              {filteredVentures.map((venture, idx) => (
                <div key={venture.id} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <VentureCard venture={venture} />
                </div>
              ))}
            </div>


            {!loading && filteredVentures.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl theme-text-secondary">
                  No startups found matching your criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>


      {theme === 'neon' && (
        <div className="fixed inset-0 pointer-events-none" 
             style={{
               background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
               zIndex: 0
             }} 
        />
      )}
    </div>
  );
}
