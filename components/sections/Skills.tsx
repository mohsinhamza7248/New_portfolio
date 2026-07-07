'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: '⚡',
  Backend: '🔧',
  Database: '🗄️',
  Cloud: '☁️',
  DevOps: '🔄',
  '3D & Design': '🎨',
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-category',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Skills &amp; Stack</div>
          <h2 className="heading-lg">
            Tools I{' '}
            <span className="text-gradient">master daily.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', marginTop: 12, maxWidth: 500 }}>
            Every tool chosen deliberately. Every skill battle-tested in production.
          </p>
        </div>

        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 20,
        }}>
          {Object.entries(SKILLS).map(([category, { color, skills }]) => (
            <div key={category} className="skill-category glass-card" style={{ padding: 28 }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}>
                  {CATEGORY_ICONS[category] || '●'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--c-text)' }}>{category}</div>
                  <div style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color,
                    marginTop: 2,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {skills.length} skills
                  </div>
                </div>
              </div>

              {/* Skill chips */}
              <div className="skills-hex-grid">
                {skills.map(skill => (
                  <div
                    key={skill}
                    className="skill-node"
                    style={{
                      '--node-color': color,
                    } as React.CSSProperties}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.background = `${color}0d`;
                      e.currentTarget.style.boxShadow = `0 4px 20px ${color}22, 0 0 10px ${color}22`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.background = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
