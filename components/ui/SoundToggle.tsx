'use client';

import { useState, useRef, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Filter to make it smooth and dark (lowpass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.Q.setValueAtTime(5, ctx.currentTime);
    filterRef.current = filter;

    // Gain node for smooth fading
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNodeRef.current = gainNode;

    // Oscillators for a rich detuned space drone
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
    osc1Ref.current = osc1;

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // A2 note detuned
    osc2Ref.current = osc2;

    // Route: Oscs -> Filter -> Gain -> Output
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start oscillators
    osc1.start(0);
    osc2.start(0);

    // Dynamic Filter modulation (subtle LFO effect)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 0.1 Hz sweep
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(120, ctx.currentTime); // sweep range
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(0);
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      // Fade out
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      setIsPlaying(false);
    } else {
      // Fade in (low volume for ambient background)
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      setIsPlaying(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 1000,
      }}
    >
      <MagneticButton strength={0.25}>
        <button
          onClick={toggleSound}
          style={{
            background: isPlaying ? 'rgba(14, 165, 233, 0.12)' : 'var(--glass-bg)',
            border: `1px solid ${isPlaying ? 'var(--accent-blue)' : 'var(--glass-border)'}`,
            borderRadius: '50px',
            padding: '10px 18px',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            color: isPlaying ? 'var(--accent-blue-bright)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'none',
            boxShadow: isPlaying ? '0 0 15px rgba(14, 165, 233, 0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Sound waves animation if playing */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '10px' }}>
            <span
              style={{
                width: '2px',
                height: isPlaying ? '100%' : '30%',
                background: 'currentColor',
                animation: isPlaying ? 'sound-wave 0.8s ease-in-out infinite alternate' : 'none',
              }}
            />
            <span
              style={{
                width: '2px',
                height: isPlaying ? '60%' : '30%',
                background: 'currentColor',
                animation: isPlaying ? 'sound-wave 1.1s ease-in-out 0.2s infinite alternate' : 'none',
              }}
            />
            <span
              style={{
                width: '2px',
                height: isPlaying ? '80%' : '30%',
                background: 'currentColor',
                animation: isPlaying ? 'sound-wave 0.6s ease-in-out 0.4s infinite alternate' : 'none',
              }}
            />
          </div>
          <span>{isPlaying ? 'AMBIENT ON' : 'SOUND OFF'}</span>
        </button>
      </MagneticButton>

      <style>{`
        @keyframes sound-wave {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
