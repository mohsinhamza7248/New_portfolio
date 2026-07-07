'use client';

import { TESTIMONIALS } from '@/lib/data';

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div style={{
      width: 420,
      maxWidth: 'min(420px, 85vw)',
      padding: '28px 32px',
      background: 'var(--c-card)',
      border: '1px solid var(--c-border)',
      borderRadius: 20,
      backdropFilter: 'var(--blur)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      transition: 'border-color 0.3s ease',
      marginRight: 24,
      flexShrink: 0,
      whiteSpace: 'normal',
    }}>
      {/* Quote mark */}
      <div style={{ fontSize: 32, color: t.color, lineHeight: 1, opacity: 0.6, fontFamily: 'Georgia, serif' }}>"</div>

      <p style={{ fontSize: 14, color: 'var(--c-secondary)', lineHeight: 1.75, flex: 1 }}>{t.text}</p>

      <StarRating count={t.rating} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 800,
          color: '#000',
          flexShrink: 0,
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'var(--c-muted)' }}>{t.role}, {t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="section">
      <div style={{ marginBottom: 64, textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Testimonials</div>
        <h2 className="heading-lg">
          What clients{' '}
          <span className="text-gradient">say.</span>
        </h2>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-wrap" style={{ marginBottom: 20 }}>
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div className="marquee-wrap">
        <div className="marquee-track marquee-track-reverse">
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
