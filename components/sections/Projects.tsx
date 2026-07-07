'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Project = typeof PROJECTS[number];

/* ══════════════════════════════════════════
   CASE STUDY MODAL — Full immersive overlay
══════════════════════════════════════════ */
function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';

    // Entrance animation
    gsap.fromTo(panelRef.current,
      { y: 60, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
    );

    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="cs-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div ref={panelRef} className="cs-panel">
        {/* Header band */}
        <div className="cs-header" style={{ borderBottom: `2px solid ${project.color}` }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: project.color,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                width: 6, height: 6,
                borderRadius: '50%',
                background: project.color,
                boxShadow: `0 0 8px ${project.color}`,
                display: 'inline-block',
              }} />
              Case Study · {project.category}
            </div>
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 36px)',
              fontWeight: 800,
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              {project.title}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--c-muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="cs-close-btn"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cs-body">
          {/* Overview */}
          <div className="cs-section-block">
            <div className="cs-block-label">Overview</div>
            <p style={{ fontSize: 15, color: 'var(--c-secondary)', lineHeight: 1.85 }}>
              {project.longDescription}
            </p>
          </div>

          {/* Challenge / Solution grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            {[
              { icon: '⚡', label: 'Challenge', text: project.challenges, accent: '#F59E0B' },
              { icon: '✓',  label: 'Solution',  text: project.solution,   accent: '#00FFA3' },
            ].map(b => (
              <div key={b.label} style={{
                padding: '20px 22px',
                borderRadius: 14,
                background: `${b.accent}08`,
                border: `1px solid ${b.accent}25`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: -20, right: -20,
                  width: 80, height: 80,
                  borderRadius: '50%',
                  background: `${b.accent}15`,
                  filter: 'blur(16px)',
                  pointerEvents: 'none',
                }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: b.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{b.icon}</span> {b.label}
                </div>
                <p style={{ fontSize: 13, color: 'var(--c-secondary)', lineHeight: 1.7 }}>{b.text}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="cs-section-block">
            <div className="cs-block-label">Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  padding: '6px 14px',
                  borderRadius: 100,
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}35`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: project.color,
                  letterSpacing: '0.05em',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Live Project ↗
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              GitHub Repository →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FEATURED PROJECT CARD — Large Hero-style
══════════════════════════════════════════ */
function FeaturedCard({ project, idx }: { project: Project; idx: number }) {
  const [hovered, setHovered]   = useState(false);
  const [selected, setSelected] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shimRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const sh = shimRef.current;
    if (!el || !sh) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) *  10;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.08s ease';
    sh.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    const sh = shimRef.current;
    if (!el || !sh) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.6s ease';
    sh.style.background = 'transparent';
    setHovered(false);
  };

  const isRight = idx % 2 !== 0;

  return (
    <>
      <div
        className={`feat-card proj-reveal`}
        style={{ animationDelay: `${idx * 0.15}s` }}
      >
        {/* Number */}
        <div className="feat-number">
          {String(idx + 1).padStart(2, '0')}
        </div>

        <div
          ref={cardRef}
          className="feat-card-inner"
          style={{
            flexDirection: isRight ? 'row-reverse' : 'row',
            borderColor: hovered ? `${project.color}50` : 'var(--c-border)',
            boxShadow: hovered
              ? `0 40px 100px rgba(0,0,0,0.55), 0 0 60px ${project.color}18, inset 0 1px 0 rgba(255,255,255,0.06)`
              : '0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onMouseEnter={() => setHovered(true)}
        >
          {/* Shimmer layer */}
          <div ref={shimRef} className="feat-shimmer" />

          {/* LEFT — Glow visual panel */}
          <div className="feat-visual" style={{
            background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}08 40%, rgba(5,7,13,0.2) 100%)`,
          }}>
            {/* Animated rings */}
            <div className="feat-ring" style={{
              borderColor: `${project.color}40`,
              width: 140, height: 140,
              animationDuration: '6s',
            }} />
            <div className="feat-ring" style={{
              borderColor: `${project.color}25`,
              width: 200, height: 200,
              animationDuration: '9s',
              animationDirection: 'reverse',
            }} />
            <div className="feat-ring" style={{
              borderColor: `${project.color}12`,
              width: 260, height: 260,
              animationDuration: '14s',
            }} />

            {/* Center icon */}
            <div className="feat-icon" style={{
              background: `${project.color}22`,
              border: `1px solid ${project.color}60`,
              boxShadow: `0 0 30px ${project.color}40`,
              color: project.color,
            }}>
              {['🏪', '📊', '🤖', '🍕', '💬', '📣'][idx % 6]}
            </div>

            {/* Category badge */}
            <div className="feat-category-badge" style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}>
              {project.category}
            </div>

            {/* Live pulse */}
            {project.live && (
              <div className="feat-live-badge">
                <span style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: '#00FFA3',
                  boxShadow: '0 0 8px #00FFA3',
                  animation: 'glow-pulse 1.5s ease-in-out infinite',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                Live
              </div>
            )}
          </div>

          {/* RIGHT — Content */}
          <div className="feat-content">
            <h3 className="feat-title">{project.title}</h3>
            <p className="feat-tagline" style={{ color: project.color }}>{project.tagline}</p>
            <p className="feat-desc">{project.description}</p>

            {/* Tech chips */}
            <div className="feat-tech">
              {project.tech.slice(0, 6).map(t => (
                <span key={t} className="tech-chip feat-chip"
                  style={{
                    borderColor: `${project.color}30`,
                    color: hovered ? project.color : 'var(--c-muted)',
                    background: hovered ? `${project.color}08` : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="tech-chip">+{project.tech.length - 6}</span>
              )}
            </div>

            {/* Actions */}
            <div className="feat-actions">
              <button
                onClick={() => setSelected(true)}
                className="feat-btn-primary"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                  boxShadow: hovered ? `0 0 24px ${project.color}60` : `0 0 12px ${project.color}30`,
                }}
              >
                <span>Case Study</span>
                <span>→</span>
              </button>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="feat-btn-ghost"
                style={{ borderColor: `${project.color}40`, color: hovered ? project.color : 'var(--c-secondary)' }}
              >
                Live ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {selected && <CaseStudyModal project={project} onClose={() => setSelected(false)} />}
    </>
  );
}

/* ══════════════════════════════════════════
   MINI PROJECT CARD
══════════════════════════════════════════ */
function MiniCard({ project, idx }: { project: Project; idx: number }) {
  const [hovered, setHovered]   = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div
        className="mini-card proj-reveal"
        style={{
          animationDelay: `${idx * 0.1}s`,
          borderColor: hovered ? `${project.color}45` : 'var(--c-border)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${project.color}18`
            : '0 8px 30px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent line */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          margin: '-1px -1px 0',
          borderRadius: '20px 20px 0 0',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />

        {/* Header */}
        <div style={{ padding: '22px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: `${project.color}15`,
            border: `1px solid ${project.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            transition: 'all 0.3s ease',
            boxShadow: hovered ? `0 0 16px ${project.color}40` : 'none',
          }}>
            {['🍕', '💬', '📣'][idx % 3]}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="mini-icon-btn" title="Live">↗</a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="mini-icon-btn" title="GitHub">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 22px 22px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '3px 10px',
            borderRadius: 100,
            background: `${project.color}12`,
            border: `1px solid ${project.color}30`,
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: project.color,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            {project.category}
          </div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: 'var(--c-text)' }}>{project.title}</h3>
          <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.65, marginBottom: 16 }}>
            {project.description.slice(0, 100)}...
          </p>

          {/* Tech */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="tech-chip" style={{ fontSize: 9 }}>{t}</span>
            ))}
            {project.tech.length > 4 && <span className="tech-chip" style={{ fontSize: 9 }}>+{project.tech.length - 4}</span>}
          </div>

          <button
            onClick={() => setSelected(true)}
            className="mini-case-btn"
            style={{
              borderColor: `${project.color}35`,
              color: hovered ? project.color : 'var(--c-secondary)',
              background: hovered ? `${project.color}08` : 'transparent',
            }}
          >
            Case Study →
          </button>
        </div>
      </div>

      {selected && <CaseStudyModal project={project} onClose={() => setSelected(false)} />}
    </>
  );
}

/* ══════════════════════════════════════════
   MAIN PROJECTS SECTION
══════════════════════════════════════════ */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const featured = PROJECTS.filter(p => p.featured);
  const rest     = PROJECTS.filter(p => !p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-reveal',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.proj-grid-area', start: 'top 88%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section">
      {/* Section styles */}
      <style>{`
        /* ── Featured card ── */
        .feat-card {
          position: relative;
          margin-bottom: 28px;
        }
        .feat-number {
          position: absolute;
          top: -20px; left: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(80px, 12vw, 140px);
          font-weight: 900;
          letter-spacing: -0.06em;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }
        .feat-card-inner {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 0;
          border-radius: 24px;
          border: 1px solid var(--c-border);
          background: rgba(10,15,28,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.1s ease;
          min-height: 320px;
        }
        .feat-shimmer {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          pointer-events: none;
          z-index: 2;
          transition: background 0.15s ease;
        }

        /* Visual panel */
        .feat-visual {
          width: 320px;
          min-width: 280px;
          max-width: 35%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        @media (max-width: 780px) {
          .feat-visual { min-width: 100%; max-width: 100%; height: 200px; }
          .feat-card-inner { flex-direction: column !important; }
        }

        .feat-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          animation: spin-slow linear infinite;
          pointer-events: none;
        }

        .feat-icon {
          width: 72px; height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          position: relative;
          z-index: 1;
          transition: all 0.4s ease;
        }

        .feat-category-badge {
          position: absolute;
          bottom: 18px; left: 18px;
          padding: 4px 12px;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .feat-live-badge {
          position: absolute;
          top: 18px; right: 18px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(0,255,163,0.1);
          border: 1px solid rgba(0,255,163,0.25);
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00FFA3;
        }

        /* Content */
        .feat-content {
          flex: 1;
          padding: 36px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
          justify-content: center;
        }
        @media (max-width: 780px) {
          .feat-content { padding: 24px 22px; }
        }
        .feat-title {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 8px;
        }
        .feat-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }
        .feat-desc {
          font-size: 14px;
          color: var(--c-secondary);
          line-height: 1.75;
          margin-bottom: 20px;
        }
        .feat-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 28px;
        }
        .feat-chip { transition: all 0.3s ease !important; }
        .feat-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .feat-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 100px;
          border: none;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #000;
          cursor: none;
          transition: all 0.3s ease;
        }
        .feat-btn-primary:hover { transform: translateY(-2px); }

        .feat-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 22px;
          border-radius: 100px;
          border: 1px solid;
          background: transparent;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: none;
        }
        .feat-btn-ghost:hover { transform: translateY(-2px); }

        /* ── Mini card ── */
        .mini-card {
          background: rgba(10,15,28,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--c-border);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          cursor: none;
        }
        .mini-icon-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          border: 1px solid var(--c-border);
          background: rgba(255,255,255,0.03);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px;
          color: var(--c-muted);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mini-icon-btn:hover {
          border-color: var(--c-border-h);
          color: var(--c-cyan);
          background: rgba(0,245,255,0.06);
        }
        .mini-case-btn {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.3s ease;
        }

        /* ── Case study modal ── */
        .cs-overlay {
          position: fixed;
          inset: 0;
          z-index: 9500;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fade-in 0.25s ease;
        }
        .cs-panel {
          background: rgba(10,15,28,0.97);
          border: 1px solid var(--c-border);
          border-radius: 24px;
          width: min(840px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,245,255,0.15) transparent;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 50px rgba(0,245,255,0.06);
        }
        .cs-header {
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          position: sticky; top: 0;
          background: rgba(10,15,28,0.97);
          backdrop-filter: blur(16px);
          z-index: 1;
          border-radius: 24px 24px 0 0;
        }
        .cs-close-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--c-border);
          background: rgba(255,255,255,0.04);
          color: var(--c-muted);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          cursor: none;
        }
        .cs-close-btn:hover {
          border-color: var(--c-cyan);
          color: var(--c-cyan);
          background: rgba(0,245,255,0.08);
          transform: rotate(90deg);
        }
        .cs-body { padding: 28px 32px 36px; }
        .cs-section-block { margin-bottom: 28px; }
        .cs-block-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-muted);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cs-block-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--c-border);
        }

        /* ── Filter tabs ── */
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid var(--c-border);
          background: transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--c-muted);
          cursor: none;
          transition: all 0.25s ease;
        }
        .filter-tab:hover {
          border-color: var(--c-border-h);
          color: var(--c-text);
        }
        .filter-tab.active {
          background: rgba(0,245,255,0.08);
          border-color: rgba(0,245,255,0.4);
          color: var(--c-cyan);
          box-shadow: 0 0 16px rgba(0,245,255,0.12);
        }

        /* ── Count badge ── */
        .count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 18px;
          padding: 0 6px;
          border-radius: 100px;
          background: rgba(0,245,255,0.12);
          border: 1px solid rgba(0,245,255,0.2);
          font-size: 9px;
          font-weight: 700;
          color: var(--c-cyan);
          font-family: 'JetBrains Mono', monospace;
          margin-left: 4px;
          vertical-align: middle;
        }

        /* proj-reveal animation */
        .proj-reveal {
          opacity: 0;
          transform: translateY(60px);
        }
      `}</style>

      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 60 }}>
          <div className="section-label">Selected Work</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h2 className="heading-lg">
                Projects that{' '}
                <span className="text-gradient">ship.</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--c-muted)', marginTop: 12, maxWidth: 500 }}>
                Production-grade systems built for real users. Click any card for the full breakdown.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Projects <span className="count-badge">{PROJECTS.length}</span>
              </button>
              <button
                className={`filter-tab ${filter === 'featured' ? 'active' : ''}`}
                onClick={() => setFilter('featured')}
              >
                Featured <span className="count-badge">{featured.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── FEATURED PROJECTS ── */}
        <div className="proj-grid-area">
          {/* Divider label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--c-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ width: 20, height: 1, background: 'var(--c-cyan)', display: 'inline-block', boxShadow: '0 0 6px var(--c-cyan)' }} />
              Featured Projects
            </div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--c-border), transparent)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {featured.map((p, i) => <FeaturedCard key={p.id} project={p} idx={i} />)}
          </div>

          {/* ── MORE PROJECTS ── */}
          {filter === 'all' && rest.length > 0 && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                margin: '56px 0 32px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--c-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{ width: 20, height: 1, background: 'var(--c-muted)', display: 'inline-block' }} />
                  More Projects
                </div>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--c-border), transparent)' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 20,
              }}>
                {rest.map((p, i) => <MiniCard key={p.id} project={p} idx={i} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
