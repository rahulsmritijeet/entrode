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

  const categories = ['All', ...new Set(ventures.map(v => v.category))];

  const handleVentureUpdate = (updatedVenture) => {
    setVentures(prev => 
      prev.map(v => v.id === updatedVenture.id ? updatedVenture : v)
    );
  };

  return (
    <div className="min-h-screen theme-bg theme-text py-12">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className={theme === 'neon' ? 'gradient-text neon-glow' : 'gradient-text'}>
              Discover Startups
            </span>
          </h1>
          <p className="theme-text-secondary text-lg">
            {ventures.length} innovative startups changing India
          </p>
        </div>

        <div className="mb-8">
          <input
            type="search"
            placeholder="Search startups..."
            className="input-field mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'btn btn-primary'
                    : 'theme-bg-secondary theme-text hover:theme-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
            <p className="mt-4 theme-text-secondary">Loading startups...</p>
          </div>
        ) : (
          <div className="grid-auto">
            {filteredVentures.map((venture) => (
              <VentureCard
                key={venture.id}
                venture={venture}
                onUpdate={handleVentureUpdate}
              />
            ))}
          </div>
        )}

        {!loading && filteredVentures.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl theme-text-secondary">
              No startups found matching your criteria
            </p>
          </div>
        )}

        {theme === 'neon' && (
          <div className="fixed inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
            `,
            zIndex: 0
          }} />
        )}
      </div>
    </div>
  );
}