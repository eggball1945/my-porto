'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Mail, ArrowRight, Globe, Code2, Camera } from 'lucide-react';

// Custom Social Icons since they are missing in this lucide-react version
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 2.16c3.203 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.881 0 1.441 1.441 0 012.881 0z" clipRule="evenodd" />
  </svg>
);

const ScrollSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter: `blur(${blur}px)` }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-slate-900 min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 md:py-40 relative z-10">
        {/* Header Section */}
        <ScrollSection className="text-center mb-20 sm:mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter"
          >
            Mari <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Berdiskusi.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-slate-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium px-4"
          >
            Punya ide brilian atau sekadar ingin menyapa? Saya selalu siap untuk mendengarkan dan berkolaborasi.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-8 sm:mt-12 rounded-full" 
          />
        </ScrollSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 max-w-7xl mx-auto items-start">
          {/* Main Contact Cards */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollSection>
              <a 
                href="https://wa.me/6281935686424" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative block p-6 sm:p-10 md:p-12 bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] hover:border-purple-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block">
                   <MessageSquare className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                    <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-purple-400 uppercase tracking-[0.3em] mb-1 sm:mb-2">WhatsApp</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white break-words">+62 819-3568-6424</p>
                  </div>
                  <div className="hidden sm:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-500">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </a>
            </ScrollSection>

            <ScrollSection>
              <a 
                href="mailto:lavviet20@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block p-6 sm:p-10 md:p-12 bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] hover:border-indigo-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden sm:block">
                   <Mail className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                    <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-1 sm:mb-2">Email</h3>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white break-words">lavviet20@gmail.com</p>
                  </div>
                  <div className="hidden sm:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-500">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </a>
            </ScrollSection>
          </div>

          {/* Social Presence Section */}
          <ScrollSection className="p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem] sm:rounded-[4rem] border border-white/5">
             <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 sm:mb-8 tracking-tight">Media Sosial</h2>
             <p className="text-slate-400 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed font-light">
               Temukan saya di platform lain untuk melihat aktivitas harian and proyek terbaru saya.
             </p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <a href="https://github.com/eggball1945" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all border border-white/5 group">
                   <GithubIcon className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
                   <span className="font-bold">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/iqbal-fadilah-94329a38a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all border border-white/5 group">
                   <LinkedinIcon className="w-6 h-6 group-hover:text-indigo-400 transition-colors" />
                   <span className="font-bold">LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/fdball_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 sm:p-6 bg-white/5 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all border border-white/5 group">
                   <InstagramIcon className="w-6 h-6 group-hover:text-pink-400 transition-colors" />
                   <span className="font-bold">Instagram</span>
                </a>
             </div>
          </ScrollSection>
        </div>

        {/* Footer Note */}
        <ScrollSection className="mt-24 sm:mt-40 text-center px-6">
           <p className="text-slate-500 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
             Tersedia untuk proyek Freelance & Full-time
           </p>
        </ScrollSection>
      </div>
    </div>
  );
}