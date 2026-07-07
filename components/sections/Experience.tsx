'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const TYPE_ICON: Record<string, string> = {
  work:      '💼',
  education: '🎓',
};

const TYPE_COLOR: Record<string, string> = {
  work:      'var(--c-cyan)',
  education: 'var(--c-purple)',
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.fromTo('.exp-line', { scaleY: 0 }, {
        scaleY: 1, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-container', start: 'top 80%' }
      });

      // Cards alternate in
      gsap.fromTo('.exp-card-left',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-container', start: 'top 80%' } }
      );
      gsap.fromTo('.exp-card-right',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-container', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Journey</div>
          <h2 className="heading-lg">
            How I got{' '}
            <span className="text-gradient">here.</span>
          </h2>
        </div>

        <div className="exp-container" style={{ position: 'relative', paddingTop: 20 }}>
          {/* Center line */}
          <div className="exp-line" style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, var(--c-cyan), var(--c-blue), var(--c-purple))',
            transform: 'translateX(-50%)',
            transformOrigin: 'top center',
            boxShadow: '0 0 12px rgba(0,245,255,0.3)',
          }} />

          {EXPERIENCE.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const color = TYPE_COLOR[exp.type] || 'var(--c-cyan)';

            return (
              <div key={i} className="exp-row">
                {/* Card */}
                <div className={`exp-card-col ${isLeft ? 'left exp-card-left' : 'right exp-card-right'}`}>
                  <div className="glass-card" style={{ padding: '24px 28px' }}>
                    <div className="exp-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                          {TYPE_ICON[exp.type]} {exp.type}
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 700 }}>{exp.role}</h3>
                        <div style={{ fontSize: 13, color: 'var(--c-secondary)', marginTop: 2 }}>{exp.company}</div>
                      </div>
                      <span className="exp-card-year" style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--c-muted)',
                        padding: '4px 10px',
                        border: '1px solid var(--c-border)',
                        borderRadius: 100,
                        whiteSpace: 'nowrap',
                        marginLeft: 12,
                      }}>
                        {exp.year}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--c-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                      {exp.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {exp.tech.map(t => <span key={t} className="tech-chip">{t}</span>)}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="exp-dot-col" style={{ paddingTop: 16 }}>
                  <div style={{
                    width: 14, height: 14,
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    background: 'var(--c-bg)',
                    boxShadow: `0 0 12px ${color}80`,
                    flexShrink: 0,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .exp-row {
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          gap: 0;
          margin-bottom: 48px;
          align-items: start;
        }
        .exp-card-col.left {
          grid-column: 1;
          padding-right: 40px;
        }
        .exp-card-col.right {
          grid-column: 3;
          padding-left: 40px;
        }
        .exp-dot-col {
          grid-column: 2;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .exp-row {
            grid-template-columns: 20px 1fr !important;
            gap: 20px !important;
            margin-bottom: 32px;
          }
          .exp-card-col {
            grid-column: 2 !important;
            padding: 0 !important;
          }
          .exp-dot-col {
            grid-column: 1 !important;
            padding-top: 16px !important;
          }
          .exp-line {
            left: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .exp-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .exp-card-year {
            margin-left: 0 !important;
            align-self: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
