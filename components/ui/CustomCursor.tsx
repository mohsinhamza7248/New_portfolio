'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const moveDot = (x: number, y: number) => {
      dotX = x; dotY = y;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const animateRing = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animateRing);
    };

    const onMove = (e: MouseEvent) => moveDot(e.clientX, e.clientY);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onHoverIn = () => setIsHovering(true);
    const onHoverOut = () => setIsHovering(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'is-hovering' : ''} ${isClicking ? 'is-clicking' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99997 }}
      />
    </>
  );
}
