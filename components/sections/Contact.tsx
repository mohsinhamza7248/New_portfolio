'use client';

import { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SOCIAL } from '@/lib/data';

const CONTACT_INFO = [
  { icon: '📧', label: 'Email',    value: SOCIAL.email,    href: `mailto:${SOCIAL.email}` },
  { icon: '💬', label: 'WhatsApp', value: 'Chat Now',      href: SOCIAL.whatsapp },
  { icon: '💼', label: 'LinkedIn', value: 'mohsin-ansari', href: SOCIAL.linkedin },
  { icon: '🐙', label: 'GitHub',   value: 'mohsinhamza7248', href: SOCIAL.github },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Message sent! I\'ll reply within 24h.', {
          style: {
            background: 'var(--c-surface)',
            color: 'var(--c-text)',
            border: '1px solid var(--c-border-h)',
          },
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Something went wrong. Try emailing directly.');
      }
    } catch {
      toast.error('Network error. Try emailing directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--c-surface)' }}>
      <Toaster position="bottom-right" />
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Contact</div>
          <h2 className="heading-lg">
            Let's build something{' '}
            <span className="text-gradient">great.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', marginTop: 12, maxWidth: 520 }}>
            Whether you need a CTO-level architecture consult or a pixel-perfect frontend —
            I'm available and interested.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
          {/* Left – Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {CONTACT_INFO.map(info => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 14,
                    textDecoration: 'none',
                    color: 'var(--c-text)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--c-border-h)';
                    e.currentTarget.style.background = 'rgba(0,245,255,0.04)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--c-border)';
                    e.currentTarget.style.background = 'var(--c-card)';
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <span style={{ fontSize: 20 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{info.value}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--c-muted)', fontSize: 16 }}>↗</span>
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div style={{
              padding: '20px 24px',
              background: 'rgba(0,255,163,0.04)',
              border: '1px solid rgba(0,255,163,0.15)',
              borderRadius: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: 'var(--c-green)',
                  boxShadow: '0 0 8px var(--c-green)',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-green)' }}>Available for new work</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.6 }}>
                Currently accepting freelance projects and full-time positions. Response time &lt; 24 hours.
              </p>
            </div>
          </div>

          {/* Right – Form */}
          <div className="glass-card" style={{ padding: '40px 36px' }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Name */}
                <div className="form-field">
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder=" "
                    className="form-input"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                </div>
                {/* Email */}
                <div className="form-field">
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder=" "
                    className="form-input"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                  <label htmlFor="contact-email" className="form-label">Email</label>
                </div>
              </div>

              {/* Subject */}
              <div className="form-field">
                <input
                  id="contact-subject"
                  type="text"
                  placeholder=" "
                  className="form-input"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                />
                <label htmlFor="contact-subject" className="form-label">Subject</label>
              </div>

              {/* Message */}
              <div className="form-field">
                <textarea
                  id="contact-message"
                  required
                  placeholder=" "
                  className="form-input"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                />
                <label htmlFor="contact-message" className="form-label" style={{ top: 20 }}>Message</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: loading ? 0.7 : 1,
                  fontSize: 13,
                  padding: '16px',
                }}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'var(--c-border)' }} />
              </div>

              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: 13,
                  padding: '16px',
                  borderColor: 'rgba(0, 255, 163, 0.3)',
                  background: 'rgba(0, 255, 163, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--c-green)';
                  e.currentTarget.style.background = 'rgba(0, 255, 163, 0.08)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 163, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 163, 0.3)';
                  e.currentTarget.style.background = 'rgba(0, 255, 163, 0.02)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: 16 }}>💬</span> Chat on WhatsApp
              </a>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          #contact .glass-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
