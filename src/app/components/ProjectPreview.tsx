'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function ProjectPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = sectionRef.current.offsetHeight;
      
      // Calculate progress across the entire 300vh section
      const currentScroll = -rect.top;
      const totalScrollable = totalHeight - viewportHeight;
      
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation logic for Full Screen Immersive Experience
  useEffect(() => {
    // Phase 1: 0 - 0.33 (Desktop)
    // Phase 2: 0.33 - 0.66 (Dashboard)
    // Phase 3: 0.66 - 1.0 (Mobile)

    // Image 1: Desktop Background
    anime({
      targets: '.bg-img-1',
      scale: [1, 1.1 + (scrollProgress * 0.2)], // Slow zoom out
      opacity: scrollProgress < 0.3 ? 1 : scrollProgress < 0.4 ? 1 - (scrollProgress - 0.3) * 10 : 0,
      filter: `blur(${scrollProgress > 0.2 ? (scrollProgress - 0.2) * 20 : 0}px)`,
      easing: 'linear',
      duration: 0,
    });

    // Image 2: Dashboard Background
    anime({
      targets: '.bg-img-2',
      scale: [1.2, 1 + (scrollProgress * 0.1)],
      opacity: scrollProgress < 0.3 ? 0 : scrollProgress < 0.7 ? 1 : scrollProgress < 0.8 ? 1 - (scrollProgress - 0.7) * 10 : 0,
      filter: `blur(${scrollProgress < 0.4 ? (0.4 - scrollProgress) * 20 : scrollProgress > 0.6 ? (scrollProgress - 0.6) * 20 : 0}px)`,
      easing: 'linear',
      duration: 0,
    });

    // Image 3: Mobile Focus (Center)
    anime({
      targets: '.bg-img-3',
      scale: scrollProgress < 0.6 ? 0.8 : 1 + (scrollProgress - 0.6) * 0.1,
      opacity: scrollProgress < 0.6 ? 0 : 1,
      translateY: scrollProgress < 0.6 ? [50, 0] : 0,
      easing: 'linear',
      duration: 0,
    });

    // Text Content Animation
    anime({
      targets: '.content-overlay',
      translateY: [0, -scrollProgress * 50],
      opacity: scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) * 10 : 1,
      easing: 'linear',
      duration: 0,
    });

  }, [scrollProgress]);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-black py-0">
      {/* Sticky Full-Screen Wrapper */}
      <div className="h-[400vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* BACKGROUND IMAGES LAYER */}
          <div className="absolute inset-0 z-0">
            {/* Stage 1: Desktop Immersive */}
            <div className="bg-img-1 absolute inset-0">
              <Image
                src="/images/project1.png"
                alt="TechPed Desktop"
                fill
                sizes="100vw"
                className="object-cover brightness-[0.4]"
                priority
              />
            </div>

            {/* Stage 2: Dashboard Immersive */}
            <div className="bg-img-2 absolute inset-0 opacity-0">
              <Image
                src="/images/techped-dashboard-new1.png"
                alt="TechPed Dashboard"
                fill
                sizes="100vw"
                className="object-cover brightness-[0.3]"
              />
            </div>

            {/* Stage 3: Mobile Centered */}
            <div className="bg-img-3 absolute inset-0 flex items-center justify-center opacity-0">
               {/* Blurred background for mobile stage */}
               <Image
                src="/images/techped-mobile-new.png"
                alt="TechPed Mobile Background"
                fill
                sizes="100vw"
                className="object-cover brightness-[0.2] blur-xl"
              />
              {/* Actual Phone Mockup */}
              <div className="relative w-[300px] h-[600px] md:w-[350px] md:h-[700px] rounded-[3rem] border-[10px] border-slate-900 shadow-[0_0_100px_rgba(139,92,246,0.3)] overflow-hidden">
                <Image
                  src="/images/techped-mobile-new.png"
                  alt="TechPed Mobile"
                  fill
                  sizes="(max-width: 768px) 300px, 350px"
                  className="object-cover"
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl" />
              </div>
            </div>
            
            {/* Global Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* CONTENT OVERLAY LAYER */}
          <div className="content-overlay relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-32">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-bold mb-8 uppercase tracking-widest">
                Featured Project
              </span>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-[1.1] mb-8">
                Tech<span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">Ped.</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium">
                Platform belanja online modern dengan fitur keranjang dan pembayaran.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                {['Laravel', 'MySQL', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white text-sm font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side Indicator Bar */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center space-y-6">
             <div className="w-1 h-32 bg-white/10 rounded-full relative">
                <div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full transition-all duration-100" 
                  style={{ height: `${scrollProgress * 100}%` }}
                />
             </div>
             <div className="text-white/30 text-xs font-black uppercase tracking-tighter vertical-text">Explore</div>
          </div>

        </div>
      </div>

      {/* Transitional 'View All' Footer for this section */}
      <div className="relative z-20 bg-black py-40 flex flex-col items-center justify-center border-t border-white/5">
          <div data-aos="fade-up">
            <h3 className="text-4xl md:text-6xl font-black text-white text-center mb-12">
              Masih banyak project lainnya.
            </h3>
            <div className="flex justify-center">
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-black text-white bg-purple-600 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
              >
                <span className="relative">LIHAT SEMUA PROYEK</span>
                <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
      </div>
    </section>
  );
}