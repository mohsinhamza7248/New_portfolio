'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-bar"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '2px',
        transformOrigin: '0 0',
        transform: 'scaleX(0)',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    />
  );
}
