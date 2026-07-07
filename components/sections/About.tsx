'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '500+', label: 'GitHub Commits' },
  { value: '6+', label: 'Happy Clients' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-stat',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stat', start: 'top 88%' } }
      );
      gsap.fromTo('.about-text-block',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-text-block', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Holographic card tilt
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(10px)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    el.style.transition = 'transform 0.6s ease';
  };

  return (
    <section ref={sectionRef} id="about" className="section" style={{ background: 'var(--c-surface)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">About Me</div>
          <h2 className="heading-lg">
            Crafting the future,{' '}
            <span className="text-gradient">one line at a time.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left – Bio */}
          <div className="about-text-block">
            <p style={{ fontSize: 17, color: 'var(--c-secondary)', lineHeight: 1.85, marginBottom: 24 }}>
              I'm <strong style={{ color: 'var(--c-text)' }}>Mohsin Ansari</strong>, a Full Stack Developer based in India
              with 3+ years of experience engineering scalable web applications that users actually love.
            </p>
            <p style={{ fontSize: 16, color: 'var(--c-muted)', lineHeight: 1.85, marginBottom: 36 }}>
              My stack spans the entire modern web — from cinematic React frontends powered by GSAP and
              Three.js, to robust Node.js/NestJS backends, PostgreSQL schemas, and cloud infrastructure.
              I believe every pixel should be intentional and every API response should be fast.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {STATS.map(stat => (
                <div key={stat.label} className="about-stat" style={{
                  padding: '20px 24px',
                  background: 'var(--c-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 16,
                  backdropFilter: 'var(--blur)',
                }}>
                  <div className="stat-number text-gradient">{stat.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 4, letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Holographic card */}
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="glass-card"
            style={{
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              transition: 'transform 0.1s ease',
              transformStyle: 'preserve-3d',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,245,255,0.03) 0%, transparent 50%, rgba(139,92,246,0.03) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 64, height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--c-cyan), var(--c-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#000',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(0,245,255,0.3)',
              }}>
                MA
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Mohsin Ansari</div>
                <div style={{ fontSize: 13, color: 'var(--c-cyan)', fontFamily: 'var(--font-mono)' }}>
                  Full Stack Developer
                </div>
                <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 2 }}>📍 India</div>
              </div>
            </div>

            {/* Info rows */}
            {[
              { label: 'Status', value: '● Open to Work', valueColor: 'var(--c-green)' },
              { label: 'Focus', value: 'SaaS & AI Products' },
              { label: 'Stack', value: 'React · Node.js · PostgreSQL' },
              { label: 'Email', value: 'mohsinhamza7248@gmail.com' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 16,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ fontSize: 12, color: 'var(--c-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                  {row.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: row.valueColor || 'var(--c-text)' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive fix */}
      <style>{`
        @media (max-width: 768px) {
          #about .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
