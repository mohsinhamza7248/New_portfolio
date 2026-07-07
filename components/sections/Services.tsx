'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section" style={{ background: 'var(--c-surface)' }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Services</div>
          <h2 className="heading-lg">
            What I do{' '}
            <span className="text-gradient">best.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', marginTop: 12, maxWidth: 500 }}>
            Specialized expertise delivered as focused, high-impact engagements.
          </p>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="service-card glass-card"
              style={{
                padding: '32px',
                cursor: 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = `${service.color}50`;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${service.color}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = '';
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              {/* BG accent */}
              <div style={{
                position: 'absolute',
                top: -40, right: -40,
                width: 120, height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${service.color}12 0%, transparent 70%)`,
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: `${service.color}15`,
                border: `1px solid ${service.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 20,
                transition: 'all 0.3s ease',
              }}>
                {service.icon}
              </div>

              {/* Number */}
              <div style={{
                position: 'absolute',
                top: 28, right: 28,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--c-border-h)',
                letterSpacing: '0.1em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--c-text)' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--c-secondary)', lineHeight: 1.7 }}>
                {service.description}
              </p>

              {/* Color line */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(to right, ${service.color}, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }} className="service-accent-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
