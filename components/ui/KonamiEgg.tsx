'use client';

import { useEffect, useState, useRef } from 'react';

export default function KonamiEgg() {
  const [active, setActive] = useState(false);
  const keysRef = useRef<string[]>([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keysRef.current = [...keysRef.current, e.key].slice(-KONAMI.length);
      if (keysRef.current.join(',') === KONAMI.join(',')) {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) return;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*';
    const columns = Math.floor(window.innerWidth / 16);
    const drops: NodeJS.Timeout[] = [];

    for (let i = 0; i < columns; i++) {
      const delay = Math.random() * 2000;
      const timeout = setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'matrix-char';
        el.style.left = `${i * 16}px`;
        el.style.animationDuration = `${1 + Math.random() * 2}s`;
        el.style.fontSize = '14px';
        el.textContent = chars[Math.floor(Math.random() * chars.length)];
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
      }, delay);
      drops.push(timeout);
    }

    return () => drops.forEach(clearTimeout);
  }, [active]);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 99998,
      textAlign: 'center',
      animation: 'fadeInUp 0.5s ease',
      background: 'rgba(0,0,0,0.9)',
      border: '1px solid #00ff41',
      borderRadius: '16px',
      padding: '40px 60px',
      pointerEvents: 'none',
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
      <div style={{ color: '#00ff41', fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 700 }}>
        KONAMI CODE ACTIVATED
      </div>
      <div style={{ color: '#555', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', marginTop: '8px' }}>
        You found the Easter egg! 🥚
      </div>
    </div>
  );
}
