'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { pulseVenture, investInVenture } from '@/lib/sheets';
import toast from 'react-hot-toast';

export default function VentureCard({ venture }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [localPulse, setLocalPulse] = useState(venture.pulse || 0);

  const handlePulse = async () => {
    setLoading(true);
    try {
      const updated = await pulseVenture(venture.id);
      setLocalPulse(updated.pulse || 0);
      toast.success('Pulse amplified!');
    } catch (err) {
      toast.error('Failed to amplify');
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async () => {
    if (!user) {
      toast.error('Please sign in to invest');
      return;
    }
    
    setLoading(true);
    try {
      await investInVenture(venture.id, {
        name: user.name,
        email: user.email
      });
      toast.success('Investment interest registered!');
    } catch (err) {
      toast.error('Failed to register interest');
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = () => {
    const colors = {
      'Ideation': 'badge-warning',
      'Validation': 'badge-info',
      'Growth': 'badge-success',
      'Scale': 'badge-primary'
    };
    return colors[venture.stage] || 'badge-primary';
  };

  return (
    <div className={`card card-hover ${theme === 'neon' ? 'neon-border neon-glow' : ''}`}>

      <div className="flex-between mb-4">
        <span className={`badge ${getStageColor()}`}>
          {venture.stage || 'Ideation'}
        </span>
        <span className="chip">
          {venture.category || 'Tech'}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-2 gradient-text">
        {venture.name}
      </h3>
      

      <p className="theme-text-secondary mb-4 line-clamp-2">
        {venture.description}
      </p>


      {venture.fundingTarget && venture.fundingTarget !== 'Not Seeking' && (
        <div className="alert alert-info mb-4">
          <span className="font-semibold">Seeking: {venture.fundingTarget}</span>
        </div>
      )}


      <div className="flex-between mb-4">
        <div>
          <div className="text-3xl font-bold theme-accent">
            {localPulse}
          </div>
          <div className="text-sm theme-text-secondary">
            pulse
          </div>
        </div>
        
        <button 
          onClick={handlePulse}
          disabled={loading}
          className="btn btn-outline btn-sm"
        >
          Amplify
        </button>
      </div>


      <div className="divider"></div>


      <button 
        onClick={handleInvest}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        Express Interest
      </button>

      <div className="mt-4 pt-4 border-t theme-border">
        <div className="flex-between">
          <span className="text-sm theme-text-secondary">
            Founded by
          </span>
          <span className="text-sm font-semibold">
            {venture.founder || 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  );
}
