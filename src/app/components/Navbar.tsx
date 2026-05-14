'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Proyek', path: '/projects' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div 
        className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'max-w-3xl px-4' : 'max-w-7xl px-6 md:px-12'
        }`}
      >
        <div 
          className={`relative flex justify-between items-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled 
              ? 'px-6 py-2 bg-slate-900/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10' 
              : 'px-0 py-0 bg-transparent border border-transparent'
          }`}
        >
          {/* Logo Area */}
          <Link href="/" className="relative flex items-center space-x-4 group py-2">
            <div className="relative">
              <Image
                src="/images/logo-if-dark.png"
                alt="IF Logo"
                width={36}
                height={36}
                className="rounded-full border border-white/10 object-cover group-hover:scale-110 group-hover:border-purple-400 transition-all duration-500 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-white to-white/60 group-hover:from-purple-400 group-hover:to-indigo-400 text-transparent bg-clip-text tracking-tighter transition-all duration-500">
              Iqbal Fadilah
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-500 group ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Sliding Active Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-full -z-0 shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Dot */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500 blur-[2px] opacity-0 transition-all duration-500 ${!isActive && 'group-hover:opacity-100 group-hover:bottom-1'}`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-slate-300 hover:text-white transition-colors focus:outline-none"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-500 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden absolute left-4 right-4 mt-6 z-50"
            >
              <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden">
                <div className="flex flex-col space-y-2">
                  {menuItems.map((item, idx) => {
                    const isActive = pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          href={item.path}
                          className={`relative block px-6 py-5 rounded-2xl text-xl font-black transition-all ${
                            isActive 
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                          {isActive && (
                            <motion.div 
                              layoutId="mobileActive"
                              className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Decorative background for mobile menu */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl -z-10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}