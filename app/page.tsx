'use client';

import { useState } from 'react';

// UI
import FloatingNav    from '@/components/ui/FloatingNav';
import CustomCursor   from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SoundToggle    from '@/components/ui/SoundToggle';

// Sections
import LoadingScreen from '@/components/sections/LoadingScreen';
import Hero          from '@/components/sections/Hero';
import About         from '@/components/sections/About';
import Skills        from '@/components/sections/Skills';
import Projects      from '@/components/sections/Projects';
import Experience    from '@/components/sections/Experience';
import Services      from '@/components/sections/Services';
import Testimonials  from '@/components/sections/Testimonials';
import Contact       from '@/components/sections/Contact';
import Footer        from '@/components/sections/Footer';
import OpenSource    from '@/components/sections/OpenSource';

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Global background */}
      <div className="cyber-bg" />
      <div className="cyber-grid" />

      {/* UI overlays */}
      <CustomCursor />
      <ScrollProgress />
      <SoundToggle />

      {/* Navigation */}
      <FloatingNav />

      {/* Content — fade in once loaded */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: loaded ? 'auto' : 'none',
      }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <OpenSource />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
