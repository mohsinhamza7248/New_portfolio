'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SOCIAL } from '@/lib/data';

const WORDS = ['Engineer', 'Creator', 'Builder', 'Architect'];

const CODE_LINES = [
  { indent: 0, keyword: 'const', text: ' buildExperience = async () => {', c: '#00F5FF' },
  { indent: 1, keyword: 'const', text: ' stack = [', c: '#00F5FF' },
  { indent: 2, keyword: '"React"', text: ', "Next.js", "Node",', c: '#00FFA3' },
  { indent: 2, keyword: '"NestJS"', text: ', "PostgreSQL",', c: '#00FFA3' },
  { indent: 1, keyword: '];', text: '', c: '#94A3B8' },
  { indent: 1, keyword: 'return', text: ' await ship({', c: '#8B5CF6' },
  { indent: 2, keyword: 'quality:', text: ' "pixel-perfect",', c: '#F8FAFC' },
  { indent: 2, keyword: 'speed:', text: ' "blazing-fast",', c: '#F8FAFC' },
  { indent: 2, keyword: 'style:', text: ' "immersive 🚀",', c: '#F8FAFC' },
  { indent: 1, keyword: '});', text: '', c: '#8B5CF6' },
  { indent: 0, keyword: '}', text: '', c: '#00F5FF' },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    url: SOCIAL.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.86 10.95.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.79 1.08.79 2.17v3.22c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: SOCIAL.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.75h2.88V18H5.5zM10.2 9.75h2.76v1.12h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4V18h-2.88v-7.18c0-1.71-.03-3.91-2.38-3.91-2.39 0-2.75 1.86-2.75 3.79V18H10.2z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    url: SOCIAL.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9Zm4.5 2.75a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 2a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm5.25-1.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    url: SOCIAL.discord,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <path d="M19.27 5.33A17.5 17.5 0 0 0 15.2 4.1a.12.12 0 0 0-.13.06c-.2.36-.42.83-.58 1.2a16.14 16.14 0 0 0-4.95 0c-.16-.37-.39-.84-.6-1.2a.12.12 0 0 0-.13-.06 17.5 17.5 0 0 0-4.07 1.23.11.11 0 0 0-.05.04C1.54 9.38.9 13.3 1.2 17.2a.13.13 0 0 0 .05.08c1.67 1.23 3.29 1.98 4.88 2.47a.13.13 0 0 0 .14-.04c.38-.52.71-1.07.99-1.65a.11.11 0 0 0-.06-.14 10.3 10.3 0 0 1-1.47-.7.1.1 0 0 1-.01-.16l.1-.08c.1-.08.2-.16.3-.24a.11.11 0 0 1 .12-.02c3.08 1.4 6.41 1.4 9.45 0a.11.11 0 0 1 .12.02c.1.08.2.16.3.24l.1.08a.1.1 0 0 1-.01.16 9.82 9.82 0 0 1-1.47.7.11.11 0 0 0-.06.14c.28.58.62 1.13.99 1.65a.13.13 0 0 0 .14.04c1.59-.49 3.21-1.24 4.88-2.47a.12.12 0 0 0 .05-.08c.38-4.4-.64-8.28-2.74-11.87a.09.09 0 0 0-.05-.04ZM8.5 14.8c-.95 0-1.73-.87-1.73-1.94s.76-1.94 1.73-1.94c.97 0 1.74.88 1.74 1.94s-.77 1.94-1.74 1.94Zm7 0c-.95 0-1.73-.87-1.73-1.94s.76-1.94 1.73-1.94c.97 0 1.74.88 1.74 1.94s-.77 1.94-1.74 1.94Z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    url: `mailto:${SOCIAL.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 18, height: 18 }}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    ),
  },
];

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // ── Entrance timeline ──
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(titleRef.current,
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo(laptopRef.current,
        { x: 80, opacity: 0, rotateY: -20 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: 'power3.out' }, '-=1.2');

    // ── Cycling words ──
    let idx = 0;
    const cycleWord = () => {
      const el = wordRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0, y: -14, duration: 0.28, ease: 'power2.in',
        onComplete: () => {
          idx = (idx + 1) % WORDS.length;
          el.textContent = WORDS[idx];
          gsap.fromTo(el,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    };
    const interval = setInterval(cycleWord, 2600);

    // ── Laptop mouse parallax ──
    const onMove = (e: MouseEvent) => {
      const el = laptopRef.current;
      if (!el) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -6;
      const ry = ((e.clientX - cx) / cx) * 8;
      gsap.to(el, {
        rotateX: rx, rotateY: ry,
        duration: 1.8, ease: 'power1.out',
        transformPerspective: 1200,
      });
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 100,
    }}>
      {/* ── Ambient glow blobs ── */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', top: -80, left: -120, pointerEvents: 'none',
        animation: 'aurora-drift 20s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)',
        filter: 'blur(50px)', bottom: -60, right: '30%', pointerEvents: 'none',
        animation: 'aurora-drift 28s ease-in-out infinite alternate-reverse',
      }} />

      <div className="container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'center',
          minHeight: 'calc(100vh - 160px)',
        }}>

          {/* ══ LEFT — Text Content ══ */}
          <div>
            {/* Badge */}
            <div style={{ marginBottom: 28 }}>
              <span className="available-badge">Available for new projects</span>
            </div>

            {/* Headline */}
            <div ref={titleRef}>
              <h1 className="heading-xl" style={{ marginBottom: 4, lineHeight: 1.05 }}>
                Full Stack
              </h1>
              <h1 className="heading-xl" style={{ marginBottom: 4, lineHeight: 1.05 }}>
                <span className="text-gradient">Developer</span>
              </h1>
              <h1 className="heading-xl" style={{ lineHeight: 1.05, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                &amp;&nbsp;
                <span ref={wordRef} style={{ display: 'inline-block', minWidth: 180 }}>
                  {WORDS[0]}
                </span>
              </h1>
            </div>

            {/* Sub copy */}
            <div ref={subtitleRef} style={{ marginTop: 28, marginBottom: 40 }}>
              <p style={{
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                color: 'var(--c-secondary)',
                lineHeight: 1.8,
                maxWidth: 480,
              }}>
                I don't just build websites —{' '}
                <strong style={{ color: 'var(--c-text)', fontWeight: 600 }}>I engineer digital experiences</strong>.
                Scalable full-stack systems, immersive interfaces, and production-grade apps that ship.
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
                <a
                  href="#projects"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                >
                  View Projects ↓
                </a>
                <a href={`mailto:${SOCIAL.email}`} className="btn-secondary">
                  Get In Touch →
                </a>
              </div>

              {/* Social row */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: 'var(--c-muted)', letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                  Find me on
                </span>
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    style={{
                      width: 42,
                      height: 42,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--c-secondary)',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
                      transition: 'all 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--c-cyan)';
                      e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(0,245,255,0.12)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--c-secondary)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT — 3D Laptop ══ */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Outer glow halo */}
            <div style={{
              position: 'absolute',
              width: 440, height: 440,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, rgba(139,92,246,0.05) 50%, transparent 75%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              animation: 'orb-pulse 6s ease-in-out infinite alternate',
            }} />

            {/* Orbit rings */}
            {[
              { size: 360, dur: '16s', color: 'rgba(0,245,255,0.1)' },
              { size: 300, dur: '12s', color: 'rgba(139,92,246,0.08)', dir: 'reverse' },
            ].map((o, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: o.size, height: o.size,
                borderRadius: '50%',
                border: `1px solid ${o.color}`,
                animation: `spin-slow ${o.dur} linear infinite`,
                animationDirection: o.dir || 'normal',
                pointerEvents: 'none',
              }} />
            ))}

            {/* Orbit dot on ring 1 */}
            <div style={{
              position: 'absolute',
              width: 360, height: 360,
              animation: 'spin-slow 16s linear infinite',
              pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute',
                top: -5, left: '50%',
                transform: 'translateX(-50%)',
                width: 10, height: 10,
                borderRadius: '50%',
                background: 'var(--c-cyan)',
                boxShadow: '0 0 16px var(--c-cyan)',
              }} />
            </div>

            {/* ── THE LAPTOP ── */}
            <div
              ref={laptopRef}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <style>{`
                /* Laptop shell */
                .laptop-wrap {
                  transform-style: preserve-3d;
                  perspective: 900px;
                  animation: laptop-float 6s ease-in-out infinite alternate;
                }
                @keyframes laptop-float {
                  0%   { transform: translateY(0px) rotateX(4deg) rotateY(-12deg); }
                  50%  { transform: translateY(-12px) rotateX(2deg) rotateY(-8deg); }
                  100% { transform: translateY(-6px) rotateX(5deg) rotateY(-14deg); }
                }

                .laptop-lid {
                  width: 340px;
                  height: 220px;
                  border-radius: 14px 14px 4px 4px;
                  background: linear-gradient(160deg, #1a1f2e 0%, #0d1120 100%);
                  border: 1.5px solid rgba(0,245,255,0.2);
                  box-shadow:
                    0 0 0 1px rgba(0,0,0,0.8),
                    0 -2px 0 rgba(255,255,255,0.06) inset,
                    0 40px 80px rgba(0,0,0,0.8),
                    0 0 60px rgba(0,245,255,0.12);
                  position: relative;
                  overflow: hidden;
                  transform-style: preserve-3d;
                }

                /* Screen bezel inset */
                .laptop-screen {
                  position: absolute;
                  inset: 10px 10px 10px 10px;
                  border-radius: 8px;
                  background: #05070D;
                  overflow: hidden;
                  border: 1px solid rgba(0,245,255,0.08);
                }

                /* Screen glow reflection */
                .laptop-screen::before {
                  content: '';
                  position: absolute;
                  inset: 0;
                  background: linear-gradient(135deg, rgba(0,245,255,0.04) 0%, transparent 50%);
                  pointer-events: none;
                  z-index: 10;
                }

                /* Camera dot */
                .laptop-camera {
                  position: absolute;
                  top: 5px; left: 50%;
                  transform: translateX(-50%);
                  width: 5px; height: 5px;
                  border-radius: 50%;
                  background: rgba(0,245,255,0.3);
                  box-shadow: 0 0 4px rgba(0,245,255,0.5);
                  z-index: 2;
                }

                /* Base / keyboard deck */
                .laptop-base {
                  width: 340px;
                  height: 14px;
                  background: linear-gradient(180deg, #161b2a 0%, #0d1120 100%);
                  border-radius: 4px 4px 10px 10px;
                  border: 1.5px solid rgba(0,245,255,0.12);
                  border-top: none;
                  box-shadow: 0 6px 30px rgba(0,0,0,0.7);
                  position: relative;
                }

                /* Trackpad gleam */
                .laptop-base::after {
                  content: '';
                  position: absolute;
                  width: 70px; height: 6px;
                  border-radius: 3px;
                  background: rgba(255,255,255,0.04);
                  border: 1px solid rgba(255,255,255,0.06);
                  top: 50%; left: 50%;
                  transform: translate(-50%, -50%);
                }

                /* Bottom edge shadow */
                .laptop-shadow {
                  width: 320px;
                  height: 14px;
                  background: radial-gradient(ellipse, rgba(0,245,255,0.15) 0%, transparent 70%);
                  margin: 4px auto 0;
                  border-radius: 50%;
                  filter: blur(8px);
                }

                /* Code lines */
                .code-line {
                  display: flex;
                  align-items: baseline;
                  gap: 4px;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 9px;
                  line-height: 1.7;
                  white-space: nowrap;
                  padding: 0 2px;
                  border-radius: 3px;
                  animation: code-appear 0.4s ease both;
                }
                @keyframes code-appear {
                  from { opacity: 0; transform: translateX(-6px); }
                  to   { opacity: 1; transform: none; }
                }

                /* Scanline overlay */
                .screen-scanlines {
                  position: absolute;
                  inset: 0;
                  background: repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 2px,
                    rgba(0,0,0,0.08) 2px,
                    rgba(0,0,0,0.08) 4px
                  );
                  pointer-events: none;
                  z-index: 5;
                }

                /* Cursor blink */
                .code-cursor {
                  display: inline-block;
                  width: 6px; height: 11px;
                  background: #00F5FF;
                  box-shadow: 0 0 6px #00F5FF;
                  border-radius: 1px;
                  animation: cursor-blink 1.1s step-start infinite;
                  vertical-align: text-bottom;
                }
                @keyframes cursor-blink {
                  0%, 100% { opacity: 1; }
                  50%       { opacity: 0; }
                }

                /* Status bar */
                .screen-statusbar {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 6px 10px;
                  background: rgba(0,0,0,0.4);
                  border-bottom: 1px solid rgba(255,255,255,0.04);
                }

                /* Floating badge pills next to laptop */
                .laptop-badge {
                  position: absolute;
                  display: flex;
                  align-items: center;
                  gap: 7px;
                  padding: 8px 14px;
                  background: rgba(8, 12, 24, 0.92);
                  border: 1px solid rgba(0,245,255,0.2);
                  border-radius: 100px;
                  backdrop-filter: blur(12px);
                  font-size: 11px;
                  font-weight: 700;
                  color: #F8FAFC;
                  white-space: nowrap;
                  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(0,245,255,0.08);
                  animation: badge-float 5s ease-in-out infinite;
                }
                @keyframes badge-float {
                  0%, 100% { transform: translateY(0); }
                  50%       { transform: translateY(-8px); }
                }

                /* Responsive */
                @media (max-width: 900px) {
                  #hero > div > div {
                    grid-template-columns: 1fr !important;
                    padding: 0 20px !important;
                  }
                  .laptop-wrap { display: none !important; }
                }
              `}</style>

              <div className="laptop-wrap">
                {/* ── Floating stat badges ── */}
                {/* Top-right */}
                <div className="laptop-badge" style={{
                  top: -24, right: -70,
                  animationDelay: '0s',
                  borderColor: 'rgba(0,255,163,0.3)',
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#00FFA3', boxShadow: '0 0 10px #00FFA3',
                    animation: 'glow-pulse 1.5s ease-in-out infinite',
                    display: 'inline-block', flexShrink: 0,
                  }} />
                  <span style={{ color: '#00FFA3' }}>10+ Projects Shipped</span>
                </div>

                {/* Bottom-left */}
                <div className="laptop-badge" style={{
                  bottom: 40, left: -90,
                  animationDelay: '1.5s',
                  borderColor: 'rgba(139,92,246,0.3)',
                }}>
                  <span style={{ fontSize: 14 }}>⚡</span>
                  <span style={{ color: 'var(--c-secondary)', fontWeight: 500 }}>
                    <strong style={{ color: '#8B5CF6' }}>3+</strong> Yrs Exp
                  </span>
                </div>

                {/* Right-middle */}
                <div className="laptop-badge" style={{
                  top: '40%', right: -100,
                  animationDelay: '0.8s',
                  borderColor: 'rgba(59,130,246,0.3)',
                }}>
                  <span style={{ fontSize: 14 }}>🚀</span>
                  <span style={{ color: '#3B82F6' }}>Full Stack Dev</span>
                </div>

                {/* ── LID ── */}
                <div className="laptop-lid">
                  <div className="laptop-camera" />
                  <div className="laptop-screen">

                    {/* Status bar */}
                    <div className="screen-statusbar">
                      <div style={{ display: 'flex', gap: 5 }}>
                        {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
                          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                        ))}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: 8,
                        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em',
                      }}>
                        portfolio.tsx
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['React', 'TS', 'Node'].map(t => (
                          <span key={t} style={{
                            fontFamily: 'var(--font-mono)', fontSize: 7,
                            color: 'rgba(0,245,255,0.5)',
                            background: 'rgba(0,245,255,0.08)',
                            padding: '1px 5px',
                            borderRadius: 3,
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Code content */}
                    <div style={{
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      height: 'calc(100% - 30px)',
                      overflowY: 'hidden',
                    }}>
                      {/* Line numbers + code */}
                      {CODE_LINES.map((line, i) => (
                        <div key={i} className="code-line" style={{
                          animationDelay: `${0.8 + i * 0.08}s`,
                          paddingLeft: `${line.indent * 14}px`,
                        }}>
                          <span style={{
                            color: 'rgba(255,255,255,0.12)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 8,
                            minWidth: 16,
                            textAlign: 'right',
                            marginRight: 10,
                            userSelect: 'none',
                          }}>
                            {i + 1}
                          </span>
                          <span style={{ color: line.c, fontWeight: 600 }}>{line.keyword}</span>
                          <span style={{ color: 'rgba(200,200,220,0.7)' }}>{line.text}</span>
                        </div>
                      ))}
                      {/* Cursor */}
                      <div className="code-line" style={{ paddingLeft: 26, animationDelay: '1.7s' }}>
                        <span style={{
                          color: 'rgba(255,255,255,0.12)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 8, minWidth: 16,
                          textAlign: 'right', marginRight: 10, userSelect: 'none',
                        }}>
                          {CODE_LINES.length + 1}
                        </span>
                        <span className="code-cursor" />
                      </div>

                      {/* Bottom status */}
                      <div style={{
                        marginTop: 'auto',
                        padding: '6px 0 0',
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center',
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 8, color: '#00FFA3', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00FFA3', display: 'inline-block' }} />
                          No issues
                        </span>
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>TypeScript</span>
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>Ln 12, Col 1</span>
                      </div>
                    </div>

                    {/* Screen scanlines */}
                    <div className="screen-scanlines" />

                    {/* Screen reflection */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '40%', height: '60%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                      borderRadius: '0 0 100% 0',
                      pointerEvents: 'none',
                      zIndex: 6,
                    }} />
                  </div>
                </div>

                {/* ── BASE ── */}
                <div className="laptop-base" />

                {/* ── SHADOW ── */}
                <div className="laptop-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
