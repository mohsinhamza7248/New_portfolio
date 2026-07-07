'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalProps {
  onClose: () => void;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    '  Available commands:',
    '  ─────────────────────────────────────────',
    '  help        → Show available commands',
    '  projects    → List all projects',
    '  skills      → View skill set',
    '  experience  → Career timeline',
    '  contact     → Get in touch',
    '  resume      → Open resume PDF',
    '  github      → Open GitHub profile',
    '  clear       → Clear terminal',
    '  exit        → Close terminal',
    '  ─────────────────────────────────────────',
  ],
  projects: [
    '',
    '  ┌─ PROJECTS ──────────────────────────────┐',
    '  │ 01. Eden Sign          → eden-sign.netlify.app  │',
    '  │ 02. StockPro           → gani-mobile-stock.vercel.app │',
    '  │ 03. Medico Humsafar   → medico-humsafar.vercel.app │',
    '  │ 04. EverGreen Pizza   → evergreen-pizza.vercel.app │',
    '  │ 05. AI Chatbot        → chatbot-ten-tau-60.vercel.app │',
    '  │ 06. Digital Marketing → digital-marketing-122.netlify.app │',
    '  └─────────────────────────────────────────┘',
    '',
  ],
  skills: [
    '',
    '  FRONTEND  → React • Next.js • TypeScript • TailwindCSS • GSAP • Framer Motion',
    '  BACKEND   → Node.js • NestJS • Express • REST API • JWT Auth',
    '  DATABASE  → MongoDB • PostgreSQL',
    '  CLOUD     → AWS S3 • Cloudinary • Vercel • Render',
    '  DEVOPS    → Git • GitHub • Docker',
    '  3D        → Three.js • React Three Fiber • WebGL • GLSL',
    '',
  ],
  experience: [
    '',
    '  2024 – Present  →  Full Stack Developer (Current)',
    '  2023 – 2024     →  Freelance Frontend Developer',
    '  2022 – 2023     →  Self-taught Full Stack Learning',
    '',
  ],
  contact: [
    '',
    '  EMAIL    → mohsinhamza7248@gmail.com',
    '  LINKEDIN → linkedin.com/in/mohsin-ansari-195817254',
    '  GITHUB   → github.com/mohsinhamza7248',
    '  LOCATION → India 🇮🇳',
    '',
    '  Opening contact section...',
    '',
  ],
  resume: [
    '',
    '  Opening resume PDF...',
    '  → https://drive.google.com/file/d/1-z9P7n43FXcHC8dWjlL3_fe1YbBrTBMT/',
    '',
  ],
  github: [
    '',
    '  Opening GitHub profile...',
    '  → https://github.com/mohsinhamza7248',
    '',
  ],
};

type LineType = { text: string; type: 'output' | 'input' | 'error' | 'success' };

export default function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<LineType[]>([
    { text: '╔══════════════════════════════════════════════╗', type: 'success' },
    { text: '║   MOHSIN ANSARI — PORTFOLIO TERMINAL v1.0    ║', type: 'success' },
    { text: '╚══════════════════════════════════════════════╝', type: 'success' },
    { text: '', type: 'output' },
    { text: '  Welcome! Type "help" to see available commands.', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: LineType[] = [...lines, { text: `  mohsin@portfolio:~$ ${cmd}`, type: 'input' }];

    if (trimmed === 'clear') {
      setLines([]);
      setInput('');
      return;
    }
    if (trimmed === 'exit') {
      onClose();
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach((line) => newLines.push({ text: line, type: 'output' }));

      if (trimmed === 'resume') {
        setTimeout(() => window.open('https://drive.google.com/file/d/1-z9P7n43FXcHC8dWjlL3_fe1YbBrTBMT/view?usp=drive_link', '_blank'), 500);
      }
      if (trimmed === 'github') {
        setTimeout(() => window.open('https://github.com/mohsinhamza7248', '_blank'), 500);
      }
      if (trimmed === 'contact') {
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }, 800);
      }
    } else if (trimmed === '') {
      // do nothing for empty
    } else {
      newLines.push({ text: `  Command not found: "${cmd}". Type "help" for available commands.`, type: 'error' });
    }

    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setLines(newLines);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getLineColor = (type: LineType['type']) => {
    switch (type) {
      case 'input': return '#38bdf8';
      case 'error': return '#f87171';
      case 'success': return '#4ade80';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="terminal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="terminal-window scanline">
        <div className="terminal-header">
          <div className="terminal-dot" style={{ background: '#ff5f57' }} onClick={onClose} />
          <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
          <div className="terminal-dot" style={{ background: '#28c840' }} />
          <span style={{ marginLeft: '8px', color: '#666', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
            mohsin@portfolio:~
          </span>
          <span style={{ marginLeft: 'auto', color: '#444', fontSize: '11px' }}>
            Press ESC to close
          </span>
        </div>

        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className="terminal-line" style={{ color: getLineColor(line.type) }}>
              {line.text || '\u00A0'}
            </div>
          ))}

          <div className="terminal-input-row">
            <span className="terminal-prompt">mohsin@portfolio:~$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
