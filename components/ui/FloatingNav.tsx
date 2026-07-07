'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Skills', href: '#skills', num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Experience', href: '#experience', num: '04' },
  { label: 'Services', href: '#services', num: '05' },
  { label: 'Contact', href: '#contact', num: '06' },
];

const RESUME_URL = 'https://drive.google.com/file/d/1-z9P7n43FXcHC8dWjlL3_fe1YbBrTBMT/view?usp=drive_link';

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.4 }
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const ids = NAV_LINKS.map(l => l.href.slice(1)).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobile(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .nav-wrap {
          position: fixed;
          top: 20px; left: 0; right: 0;
          margin: 0 auto;
          width: min(1080px, 94vw);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 4px;
        }

        /* ── Logo pill ── */
        .nav-logo-wrap {
          height: 52px;
          padding: 0 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(8, 10, 20, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0,245,255,0.14);
          border-radius: 100px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: border-color 0.4s ease;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-wrap:hover { border-color: rgba(0,245,255,0.4); }

        .nav-logo-mark {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #00F5FF, #3B82F6);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 900; color: #000;
          letter-spacing: -0.02em;
          box-shadow: 0 0 14px rgba(0,245,255,0.4);
          flex-shrink: 0;
        }

        .nav-logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #F8FAFC;
        }
        .nav-logo-text span { color: #00F5FF; }

        /* ── Links capsule ── */
        .nav-links-pill {
          height: 52px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0 8px;
          background: rgba(8, 10, 20, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0,245,255,0.1);
          border-radius: 100px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 0.4s ease;
        }

        .nav-links-pill.scrolled {
          border-color: rgba(0,245,255,0.2);
          box-shadow: 0 8px 40px rgba(0,0,0,0.55), 0 0 20px rgba(0,245,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .nav-item {
          position: relative;
          padding: 8px 14px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          transition: all 0.25s ease;
          overflow: hidden;
        }

        .nav-item-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 600;
          color: rgba(0,245,255,0.4);
          letter-spacing: 0.05em;
          transition: color 0.25s ease;
          line-height: 1;
        }

        .nav-item-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
          transition: color 0.25s ease;
          line-height: 1;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: rgba(0,245,255,0.07);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .nav-item:hover::before,
        .nav-item.active::before { opacity: 1; }

        .nav-item:hover .nav-item-label,
        .nav-item.active .nav-item-label { color: #00F5FF; }

        .nav-item:hover .nav-item-num,
        .nav-item.active .nav-item-num { color: rgba(0,245,255,0.7); }

        .nav-item.active {
          background: rgba(0,245,255,0.06);
          box-shadow: inset 0 0 0 1px rgba(0,245,255,0.18);
        }

        /* ── CTA pill ── */
        .nav-cta-wrap {
          height: 52px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          background: rgba(8, 10, 20, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0,245,255,0.14);
          border-radius: 100px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: border-color 0.4s ease;
          flex-shrink: 0;
        }
        .nav-cta-wrap:hover { border-color: rgba(0,245,255,0.35); }

        .nav-cta-btn {
          height: 40px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #000;
          background: linear-gradient(135deg, #00F5FF 0%, #3B82F6 100%);
          border-radius: 100px;
          white-space: nowrap;
          box-shadow: 0 0 18px rgba(0,245,255,0.35);
          transition: all 0.3s ease;
        }
        .nav-cta-btn:hover {
          box-shadow: 0 0 32px rgba(0,245,255,0.6);
          transform: translateY(-1px);
        }

        /* ── Status dot ── */
        .nav-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px 0 8px;
          flex-shrink: 0;
        }
        .nav-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00FFA3;
          box-shadow: 0 0 8px #00FFA3;
          animation: glow-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .nav-status-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00FFA3;
          white-space: nowrap;
        }

        /* ── Mobile btn ── */
        .nav-mob-btn {
          display: none;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(0,245,255,0.2);
          background: rgba(8,10,20,0.9);
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .nav-mob-btn span {
          display: block;
          width: 18px; height: 1.5px;
          background: #F8FAFC;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .nav-mob-btn.open span:first-child  { transform: rotate(45deg) translate(4.5px, 4.5px); background: #00F5FF; }
        .nav-mob-btn.open span:last-child   { transform: rotate(-45deg) translate(4.5px, -4.5px); background: #00F5FF; }

        /* Responsive */
        @media (max-width: 900px) {
          .nav-links-pill, .nav-status { display: none !important; }
          .nav-mob-btn { display: flex !important; }
          .nav-cta-wrap { display: none !important; }
        }
        @media (max-width: 560px) {
          .nav-wrap { width: 94vw; top: 14px; }
          .nav-logo-wrap { padding: 0 16px; }
        }

        /* Mobile overlay */
        .mob-overlay {
          position: fixed;
          inset: 0;
          z-index: 8998;
          background: rgba(5, 7, 13, 0.96);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 100px 24px 40px;
        }

        .mob-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 32px;
          width: 100%;
          max-width: 320px;
          border-radius: 16px;
          text-decoration: none;
          border: 1px solid rgba(0,245,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: all 0.25s ease;
        }
        .mob-link:hover {
          border-color: rgba(0,245,255,0.25);
          background: rgba(0,245,255,0.05);
          transform: translateX(6px);
        }
        .mob-link-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(0,245,255,0.5);
          letter-spacing: 0.1em;
          width: 20px;
          flex-shrink: 0;
        }
        .mob-link-label {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #CBD5E1;
          text-transform: uppercase;
        }
        .mob-link:hover .mob-link-label { color: #00F5FF; }
      `}</style>

      {/* ── NAV WRAPPER ── */}
      <div ref={navRef} className="nav-wrap">

        {/* LOGO PILL */}
        <a href="#hero" onClick={e => scrollTo(e, '#hero')} className="nav-logo-wrap">
          <div className="nav-logo-mark">MA</div>
          <span className="nav-logo-text">Mohsin<span>.</span></span>
        </a>

        {/* LINKS PILL */}
        <nav className={`nav-links-pill ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
          {/* Status dot inside pill */}
          <div className="nav-status" style={{ paddingRight: 8, borderRight: '1px solid rgba(255,255,255,0.06)', marginRight: 4 }}>
            <div className="nav-status-dot" />
            <span className="nav-status-text">Available</span>
          </div>

          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className={`nav-item ${active === link.href.slice(1) ? 'active' : ''}`}
            >
              <span className="nav-item-num">{link.num}</span>
              <span className="nav-item-label">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA PILL */}
        <div className="nav-cta-wrap">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="nav-cta-btn">
            Resume ↗
          </a>
        </div>

        {/* MOBILE TRIGGER */}
        <button
          className={`nav-mob-btn ${mobile ? 'open' : ''}`}
          onClick={() => setMobile(v => !v)}
          aria-label="Toggle navigation"
        >
          <span /><span />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {mobile && (
        <div className="mob-overlay">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className="mob-link"
              style={{ animationDelay: `${i * 0.05}s`, animation: 'fade-in-up 0.35s ease both' }}
            >
              <span className="mob-link-num">{link.num}</span>
              <span className="mob-link-label">{link.label}</span>
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: 24, animation: 'fade-in-up 0.35s 0.32s ease both' }}
          >
            Download Resume ↗
          </a>
        </div>
      )}
    </>
  );
}
