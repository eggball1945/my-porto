'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const runAnimations = () => {
      // Timeline for synchronized animations
      const tl = anime.timeline({
        easing: 'easeOutExpo',
      });

      // 1. Background blobs animation
      tl.add({
        targets: '.hero-blob',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(200),
      })
      // 2. Profile Image pop-in
      .add({
        targets: '.hero-profile',
        translateY: [40, 0],
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
      }, '-=1000')
      // 3. Heading text
      .add({
        targets: '.hero-title .word',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
      }, '-=600')
      // 4. Description text
      .add({
        targets: '.hero-desc',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
      }, '-=600')
      // 5. Buttons pop-in
      .add({
        targets: '.hero-button',
        translateY: [20, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150),
      }, '-=600');

      // Continuous floating animation
      anime({
        targets: '.hero-blob-1',
        translateY: [-20, 20],
        translateX: [-10, 10],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      anime({
        targets: '.hero-blob-2',
        translateY: [20, -20],
        translateX: [10, -10],
        duration: 5000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    };

    runAnimations();

    // Handle BFcache restores
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        runAnimations();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="hero-blob hero-blob-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />
      <div className="hero-blob hero-blob-2 absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/3 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] -z-10" />

      <div className="hero-profile mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full blur-md opacity-40 animate-pulse" />
        <Image
          src="/images/profile-updated.png"
          alt="Profile"
          width={160}
          height={160}
          className="relative rounded-full mx-auto border-4 border-slate-800 shadow-xl object-cover"
        />
      </div>
      
      <h1 className="hero-title text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white flex flex-wrap justify-center gap-x-4">
        <span className="word block">Halo,</span>
        <span className="word block">Saya</span>
        <span className="word block bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
          Iqbal Fadilah
        </span>
      </h1>
      
      <p className="hero-desc text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-medium">
        Saya seorang <span className="font-bold text-slate-200">Backend Developer</span> yang bersemangat 
        membangun aplikasi web modern dan responsif.
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <Link 
          href="/projects" 
          className="hero-button bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
        >
          Lihat Proyek Saya
        </Link>
        <Link 
          href="/contact" 
          className="hero-button bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-full font-medium hover:bg-slate-700 hover:shadow-md transition-all transform hover:-translate-y-1"
        >
          Hubungi Saya
        </Link>
      </div>
    </section>
  );
}