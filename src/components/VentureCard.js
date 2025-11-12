'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { pulseVenture, investInVenture } from '@/lib/sheets';

export default function VentureCard({ venture }) {
  const { user } = useAuth();
  const [pulse, setPulse] = useState(venture.pulse || 0);
  const [busy, setBusy] = useState(false);

  const stageClass = () => {
    const s = (venture.stage || '').toLowerCase();
    if (s.includes('idea')) return 'badge badge-idea';
    if (s.includes('valid')) return 'badge badge-validate';
    if (s.includes('growth')) return 'badge badge-growth';
    if (s.includes('scale')) return 'badge badge-scale';
    return 'badge badge-idea';
    };

  const onPulse = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const updated = await pulseVenture(venture.id);
      setPulse(updated.pulse || 0);
    } finally { setBusy(false); }
  };

  const onInvest = async () => {
    if (!user) return;
    if (busy) return;
    setBusy(true);
    try {
      await investInVenture(venture.id, { name: user.name, email: user.email });
    } finally { setBusy(false); }
  };

  return (
    <div className="tile">
      <div className="tile-head">
        <span className={stageClass()}>{venture.stage || 'Ideation'}</span>
        <span className="pill">{venture.category || 'Tech'}</span>
      </div>
      <div className="mb-2" style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-.01em' }}>
        {venture.name}
      </div>
      <div className="mb-4" style={{ color: 'var(--ink2)' }}>
        {venture.description}
      </div>
      {venture.fundingTarget && venture.fundingTarget !== 'Not Seeking' && (
        <div className="mb-4" style={{ fontWeight: 700 }}>
          Seeking: {venture.fundingTarget}
        </div>
      )}
      <div className="action-row">
        <div>
          <div className="pulse">{pulse}</div>
          <div style={{ color: 'var(--ink3)', fontSize: 12 }}>pulse</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onPulse} disabled={busy} className="btn btn-outline">Amplify</button>
          <button onClick={onInvest} disabled={busy || !user} className="btn btn-primary">
            {user ? 'Express Interest' : 'Sign In'}
          </button>
        </div>
      </div>
      <div className="divider" />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
        <span style={{ color: 'var(--ink3)' }}>Founder</span>
        <span style={{ fontWeight: 700 }}>{venture.founder || '—'}</span>
      </div>
    </div>
  );
}
