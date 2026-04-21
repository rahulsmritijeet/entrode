'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Email required'); return; }
    setLoading(true);
    try {
      await login({ email, name });
      toast.success('Welcome to Entrode!');
      router.push('/profile');
    } catch {
      toast.error('Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: 440 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, textAlign: 'center' }}>Welcome to Entrode</h2>
        <p className="subtitle mb-6">Sign in or create your account</p>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 14 }}>
            <label className="block theme-text-secondary text-sm mb-2">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="block theme-text-secondary text-sm mb-2">Name <span style={{ color: 'var(--ink3)' }}>(new users)</span></label>
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </form>

        <p className="subtitle mt-4" style={{ fontSize: 13 }}>
          Existing email → login. New email → account is created.
        </p>
      </div>
    </div>
  );
}
