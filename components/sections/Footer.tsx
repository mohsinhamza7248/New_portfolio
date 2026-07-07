'use client';

import { SOCIAL } from '@/lib/data';

const SOCIAL_LINKS = [
  { label: 'GitHub',    href: SOCIAL.github },
  { label: 'LinkedIn',  href: SOCIAL.linkedin },
  { label: 'Instagram', href: SOCIAL.instagram },
  { label: 'Email',     href: `mailto:${SOCIAL.email}` },
];

export default function Footer() {
  return (
    <footer style={{
      padding: '60px 0 40px',
      position: 'relative',
    }}>
      <div className="container">
        <div className="footer-divider" />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          textAlign: 'center',
        }}>
          {/* Logo */}
          <div style={{
            fontSize: 28,
            fontWeight: 800,
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            MOHSIN<span style={{ color: 'var(--c-cyan)' }}>.</span>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: 24 }}>
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: 'var(--c-muted)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--c-muted)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Open to work */}
          <span className="available-badge">
            Open to new opportunities
          </span>

          {/* Copyright */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--c-muted)',
            letterSpacing: '0.06em',
          }}>
            © {new Date().getFullYear()} Mohsin Ansari. Engineered with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
