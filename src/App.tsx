import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-white overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-bg animated-grid pointer-events-none z-0" />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 noise-bg pointer-events-none z-[1]" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-electric/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-electric/3 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
