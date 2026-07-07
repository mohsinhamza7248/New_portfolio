'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  'Initializing runtime environment...',
  'Loading core modules...',
  'Mounting interface systems...',
  'Calibrating visual engine...',
  'Establishing connection...',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
      setProgress(Math.round(p));
      setLine(Math.min(Math.floor((p / 100) * BOOT_LINES.length), BOOT_LINES.length - 1));
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  return (
    <div
      className="loader"
      style={{
        opacity: done ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      {/* Logo Mark */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 800,
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}>
          <span className="text-gradient-white">M</span>
          <span className="text-gradient">A</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--c-muted)',
          marginTop: 8,
        }}>
          Mohsin Ansari
        </div>
      </div>

      {/* Boot Log */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--c-muted)',
        letterSpacing: '0.05em',
        height: 16,
        overflow: 'hidden',
      }}>
        <span style={{ color: 'var(--c-cyan)' }}>{'> '}</span>
        {BOOT_LINES[line]}
        <span style={{ animation: 'glow-pulse 0.8s ease infinite', color: 'var(--c-cyan)' }}>_</span>
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(320px, 80vw)' }}>
        <div style={{
          width: '100%',
          height: 2,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 100,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--c-cyan), var(--c-blue))',
            borderRadius: 100,
            boxShadow: '0 0 10px var(--c-cyan)',
            transition: 'width 0.08s linear',
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.15em',
            color: 'var(--c-muted)',
            textTransform: 'uppercase',
          }}>
            System Boot
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--c-cyan)',
            textShadow: '0 0 12px var(--c-cyan)',
          }}>
            {String(progress).padStart(2, '0')}%
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      {[
        { top: 24, left: 24, borderTop: '1px solid', borderLeft: '1px solid' },
        { top: 24, right: 24, borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: 24, left: 24, borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: 24, right: 24, borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((style, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 20, height: 20,
          borderColor: 'rgba(0,245,255,0.3)',
          ...style,
        }} />
      ))}
    </div>
  );
}
