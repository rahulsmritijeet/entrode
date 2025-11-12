'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { pulseVenture, investInVenture } from '@/lib/sheets';
import toast from 'react-hot-toast';

export default function VentureCard({ venture, onUpdate }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [localPulse, setLocalPulse] = useState(venture.pulse || 0);

  const handlePulse = async () => {
    setLoading(true);
    try {
      const updated = await pulseVenture(venture.id);
      setLocalPulse(updated.pulse);
      onUpdate && onUpdate(updated);
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
      const updated = await investInVenture(venture.id, {
        name: user.name,
        email: user.email
      });
      onUpdate && onUpdate(updated);
      toast.success('Investment interest registered!');
    } catch (err) {
      toast.error('Failed to register interest');
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = () => {
    const colors = {
      'Ideation': 'linear-gradient(90deg, #f59e0b, #dc2626)',
      'Validation': 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      'Growth': 'linear-gradient(90deg, #10b981, #14b8a6)',
      'Scale': 'linear-gradient(90deg, #8b5cf6, #ec4899)'
    };
    return colors[venture.stage] || colors['Ideation'];
  };

  return (
    <div className={`card fade-in ${theme === 'neon' ? 'neon-glow' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          color: 'white',
          backgroundImage: getStageColor(),
          fontWeight: 600
        }}>
          {venture.stage}
        </span>
        <span className="theme-text-secondary" style={{ fontSize: '12px' }}>
          {venture.category}
        </span>
      </div>

      <h3 className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        {venture.name}
      </h3>
      
      <p className="theme-text-secondary" style={{ marginBottom: '16px' }}>
        {venture.description}
      </p>

      {venture.fundingTarget && (
        <div style={{ 
          padding: '8px', 
          background: 'rgba(var(--accent), 0.1)', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>
            Seeking: {venture.fundingTarget}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div className="theme-accent" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {localPulse}
          </div>
          <div className="theme-text-secondary" style={{ fontSize: '12px' }}>
            pulse
          </div>
        </div>
        
        <button 
          onClick={handlePulse}
          disabled={loading}
          className="btn btn-outline"
          style={{ padding: '8px 16px', fontSize: '14px' }}
        >
          Amplify
        </button>
      </div>

      <button 
        onClick={handleInvest}
        disabled={loading}
        className="btn btn-primary"
        style={{ width: '100%' }}
      >
        Express Interest
      </button>

      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgb(var(--border))' }}>
        <span className="theme-text-secondary" style={{ fontSize: '14px' }}>
          Founded by: 
        </span>
        <span style={{ fontSize: '14px', fontWeight: 600, marginLeft: '4px' }}>
          {venture.founder}
        </span>
      </div>
    </div>
  );
}