'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', strength = 0.4, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    const onMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic-btn ${className}`} onClick={onClick} style={{ display: 'inline-flex' }}>
      {children}
    </div>
  );
}
