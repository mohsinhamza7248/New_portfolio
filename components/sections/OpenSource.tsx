'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GITHUB_USERNAME } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

type Repo = {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
};

type GitHubData = {
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
  repos: Repo[];
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python:     '#3776ab',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  Shell:      '#89e051',
};

export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData]       = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('/api/github'),
          fetch('/api/github?repos=true'),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('API error');
        const user  = await userRes.json();
        const repos = await reposRes.json();
        setData({ ...user, repos: Array.isArray(repos) ? repos.slice(0, 6) : [] });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHub();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.os-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.os-grid', start: 'top 85%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [data]);

  const stats = data ? [
    { label: 'Repositories', value: data.public_repos, icon: '📁' },
    { label: 'Followers',    value: data.followers,    icon: '👥' },
    { label: 'Following',    value: data.following,    icon: '🤝' },
    { label: 'Projects Live',value: 10,                icon: '🚀' },
  ] : [];

  return (
    <section ref={sectionRef} id="opensource" className="section">
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="section-label">Open Source</div>
          <h2 className="heading-lg">
            GitHub{' '}
            <span className="text-gradient">activity.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', marginTop: 12, maxWidth: 440 }}>
            Live data from GitHub. Everything I build, I push.
          </p>
        </div>

        {/* Stats row */}
        {data && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 40,
          }}>
            {stats.map(s => (
              <div key={s.label} className="glass-card" style={{ padding: '20px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div className="stat-number text-gradient" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 4, letterSpacing: '0.05em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--c-muted)' }}>
            <div style={{ fontSize: 28, marginBottom: 12, animation: 'float 1.5s ease-in-out infinite' }}>◌</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>Fetching GitHub data...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--c-muted)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              Could not fetch GitHub data.{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--c-cyan)' }}
              >
                View profile ↗
              </a>
            </p>
          </div>
        )}

        {/* Repos grid */}
        {data && data.repos && (
          <>
            <div className="os-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}>
              {data.repos.map(repo => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="os-card glass-card"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    padding: '22px 24px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--c-border-h)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--c-border)';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{
                      fontSize: 14, fontWeight: 600,
                      color: 'var(--c-cyan)',
                      fontFamily: 'var(--font-mono)',
                      wordBreak: 'break-word',
                    }}>
                      {repo.name}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--c-muted)', flexShrink: 0, marginLeft: 8 }}>↗</span>
                  </div>
                  {repo.description && (
                    <p style={{ fontSize: 13, color: 'var(--c-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    {repo.language && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--c-muted)' }}>
                        <span style={{
                          width: 8, height: 8,
                          borderRadius: '50%',
                          background: LANG_COLORS[repo.language] || '#888',
                          display: 'inline-block',
                          flexShrink: 0,
                        }} />
                        {repo.language}
                      </span>
                    )}
                    <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>⭐ {repo.stargazers_count}</span>
                    <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>🍴 {repo.forks_count}</span>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: 'inline-flex' }}
              >
                View All Repositories ↗
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
