'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import GovSchemes from '@/components/GovSchemes';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-up');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ end, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start;
    const step = t => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.floor(end * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{val.toLocaleString()}</span>;
}

export default function HomePage() {
  useReveal();
  const { theme } = useTheme();
  const stats = [
    { label: 'Active Startups', value: 3247 },
    { label: 'Entrepreneurs', value: 15600 },
    { label: 'Investments Made', value: 892 },
    { label: 'Cities Connected', value: 127 }
  ];

  return (
    <div className="theme-bg theme-text">
      <section className="vh-100 hero">
        <div className="container-main" style={{ height: '100%' }}>
          <div className="hero-first">
            <h1 className={`title-hero ${theme === 'neon' ? 'neon-text' : 'gradient-text'}`}>ENTRODE</h1>
          </div>
          <div className="scroll-indicator">
            <span>Scroll</span>
            <i className="chevron" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="text-center reveal-up">
            <h2 className="title">Build. Launch. Fund.</h2>
            <p className="subtitle mt-3">
              A focused space to create your profile, launch your startup, and connect with investors across India.
            </p>
            <div className="hero-actions">
              <Link href="/auth" className="btn btn-primary btn-lg">Get Started</Link>
              <Link href="/explore" className="btn btn-outline btn-lg">Explore Startups</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container-main">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat reveal-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="stat-value">
                  <Counter end={s.value} />+
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="text-center reveal-up">
            <h2 className="title">Start Creating</h2>
            <p className="subtitle mt-3">
              Tell your story, outline your problem and solution, and list key milestones. Keep it crisp and real.
            </p>
          </div>
          <div className="grid-3 mt-6">
            <div className="card reveal">
              <div className="text-2xl font-bold mb-2">Create Profile</div>
              <p className="theme-text-secondary">Show your background, expertise, and intent.</p>
              <div className="mt-4">
                <Link href="/profile" className="link">Go to Profile</Link>
              </div>
            </div>
            <div className="card reveal" style={{ transitionDelay: '80ms' }}>
              <div className="text-2xl font-bold mb-2">Launch Startup</div>
              <p className="theme-text-secondary">Add category, stage, vision, and funding needs.</p>
              <div className="mt-4">
                <Link href="/create" className="link">Create Startup</Link>
              </div>
            </div>
            <div className="card reveal" style={{ transitionDelay: '160ms' }}>
              <div className="text-2xl font-bold mb-2">Get Interest</div>
              <p className="theme-text-secondary">Investors can express interest and amplify your pulse.</p>
              <div className="mt-4">
                <Link href="/explore" className="link">View Startups</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GovSchemes />

      <section className="section">
        <div className="container-main">
          <div className="text-center reveal-up">
            <h2 className="title">How It Works</h2>
            <p className="subtitle mt-3">A straight, credible path to visibility and funding.</p>
          </div>
          <div className="grid-3 mt-6">
            <div className="tile reveal">
              <div className="tile-head">
                <span className="badge badge-validate">Step 1</span>
                <span className="pill">Identity</span>
              </div>
              <div className="mb-2" style={{ fontWeight: 900, fontSize: 22 }}>Create Profile</div>
              <div className="theme-text-secondary">Your base presence for investors to understand you.</div>
            </div>
            <div className="tile reveal" style={{ transitionDelay: '80ms' }}>
              <div className="tile-head">
                <span className="badge badge-growth">Step 2</span>
                <span className="pill">Launch</span>
              </div>
              <div className="mb-2" style={{ fontWeight: 900, fontSize: 22 }}>Publish Startup</div>
              <div className="theme-text-secondary">Add the essentials and keep it outcome-driven.</div>
            </div>
            <div className="tile reveal" style={{ transitionDelay: '160ms' }}>
              <div className="tile-head">
                <span className="badge badge-scale">Step 3</span>
                <span className="pill">Connect</span>
              </div>
              <div className="mb-2" style={{ fontWeight: 900, fontSize: 22 }}>Engage & Grow</div>
              <div className="theme-text-secondary">Gather interest, follow-up, and scale.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="section">
        <div className="container-main">
          <div className="text-center" style={{ color: 'var(--ink3)', fontWeight: 700 }}>
            Made by Rahul Smritijeet
          </div>
        </div>
      </footer>

      {theme === 'neon' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, magenta 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          opacity: .04
        }} />
      )}
    </div>
  );
}
