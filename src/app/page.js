'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import GovSchemes from '@/components/GovSchemes';

export default function HomePage() {
  const { theme } = useTheme();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  
  useEffect(() => {
    const targets = [3247, 15600, 892, 127];
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
    <div className="theme-bg theme-text min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-lg">
        <div className="container-main">
          <div className="text-center fade-in-up">
            <h1 className="text-6xl font-extrabold mb-6">
              Welcome to <span className="gradient-text">ENTRODE</span>
            </h1>
            
            <p className="text-xl theme-text-secondary max-w-3xl mx-auto mb-12">
              India's premier startup ecosystem connecting innovators with opportunities.
              Build, launch, and scale your venture in the digital Bharat.
            </p>

            <div className="btn-group justify-center">
              <Link href="/auth">
                <button className="btn btn-primary btn-lg">
                  Get Started
                </button>
              </Link>
              <Link href="/explore">
                <button className="btn btn-outline btn-lg">
                  Explore Startups
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="theme-bg-secondary section">
        <div className="container-main">
          <div className="stats-grid">
            {['Active Startups', 'Entrepreneurs', 'Investments Made', 'Cities Connected'].map((label, idx) => (
              <div key={idx} className="stat-card fade-in">
                <div className="stat-value">
                  {counters[idx].toLocaleString()}+
                </div>
                <div className="stat-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GovSchemes />

      {/* How It Works */}
      <section className="theme-bg-secondary section">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid-3">
            <div className="card text-center">
              <div className="text-5xl font-bold theme-accent mb-4">01</div>
              <h3 className="text-xl font-bold mb-2">Create Profile</h3>
              <p className="theme-text-secondary">
                Sign up and build your entrepreneur profile
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-5xl font-bold theme-accent mb-4">02</div>
              <h3 className="text-xl font-bold mb-2">Launch Startup</h3>
              <p className="theme-text-secondary">
                Share your vision and startup details
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-5xl font-bold theme-accent mb-4">03</div>
              <h3 className="text-xl font-bold mb-2">Get Funded</h3>
              <p className="theme-text-secondary">
                Connect with investors and grow
              </p>
            </div>
          </div>
        </div>
      </section>

      {theme === 'neon' && (
        <div className="fixed inset-0 pointer-events-none opacity-20" 
             style={{
               backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
               backgroundSize: '50px 50px',
               zIndex: 1
             }} 
        />
      )}
    </div>
  );
}
