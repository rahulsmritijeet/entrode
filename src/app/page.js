'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import GovSchemes from '@/components/GovSchemes';

export default function HomePage() {
  const { theme } = useTheme();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const targets = [3247, 15600, 892, 127];
  const labels = ['Active Startups', 'Entrepreneurs', 'Investments Made', 'Cities Connected'];

  useEffect(() => {
    const intervals = targets.map((target, idx) => {
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[idx] < target) {
            newCounters[idx] = Math.min(newCounters[idx] + Math.ceil(target / 50), target);
          }
          return newCounters;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="theme-bg theme-text">
      <section className="hero-gradient py-24">
        <div className="container-main text-center">
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 5rem)', 
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            Welcome to{' '}
            <span className="gradient-text">ENTRODE</span>
          </h1>
          
          <p className="theme-text-secondary" style={{ 
            fontSize: '20px',
            maxWidth: '720px',
            margin: '0 auto 48px'
          }}>
            India's premier startup ecosystem connecting innovators with opportunities.
            Build, launch, and scale your venture in the digital Bharat.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Get Started
            </Link>
            <Link href="/explore" className="btn btn-outline" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Explore Startups
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 theme-bg-secondary">
        <div className="container-main">
          <div className="stats-grid">
            {counters.map((count, idx) => (
              <div key={idx} className="text-center">
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold',
                  background: `linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent)) 50%, rgba(var(--accent), 0.6))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {count.toLocaleString()}+
                </div>
                <div className="theme-text-secondary" style={{ marginTop: '8px' }}>
                  {labels[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GovSchemes />

      <section className="py-20 theme-bg-secondary">
        <div className="container-main text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="theme-accent text-5xl font-bold mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Create Profile</h3>
              <p className="theme-text-secondary">
                Sign up and build your entrepreneur profile
              </p>
            </div>
            
            <div className="card">
              <div className="theme-accent text-5xl font-bold mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Launch Startup</h3>
              <p className="theme-text-secondary">
                Share your vision and startup details
              </p>
            </div>
            
            <div className="card">
              <div className="theme-accent text-5xl font-bold mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Get Funded</h3>
              <p className="theme-text-secondary">
                Connect with investors and grow
              </p>
            </div>
          </div>
        </div>
      </section>

      {theme === 'neon' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,255,255,0.05)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")',
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}
    </div>
  );
}