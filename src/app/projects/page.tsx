'use client';

import { useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Web E-Commerce TechPed',
    description: 'Platform belanja online modern dengan fitur keranjang dan pembayaran.',
    image: '/images/project1.png',
    tags: ['Laravel', 'MySQL', 'Tailwind'],
    link: 'https://github.com/eggball1945/TechPed.git',
  },
  {
    id: 2,
    title: 'Kalkulator Sederhana',
    description: 'Kalkulator sederhana dengan fitur tambah, kurang, kali, dan bagi.',
    image: '/images/project2.png',
    tags: ['Python', 'Kivy'],
    link: 'https://github.com/eggball1945/Kalkulator',
  },
];

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

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden bg-slate-900 min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 py-40 relative z-10">
        {/* Header Section */}
        <ScrollSection className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            Semua <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Proyek.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Kumpulan hasil karya dan inovasi digital yang telah saya kembangkan dengan standar profesional.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-12 rounded-full" 
          />
        </ScrollSection>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ScrollSection 
              key={project.id}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <ProjectCard project={project} />
              </div>
            </ScrollSection>
          ))}
        </div>

        {/* Call to Action or Footer note */}
        <ScrollSection className="mt-40 text-center">
           <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] max-w-3xl mx-auto">
              <h2 className="text-3xl font-black text-white mb-6">Punya Proyek Menarik?</h2>
              <p className="text-slate-400 text-lg mb-10">Saya selalu terbuka untuk kolaborasi baru dan tantangan teknis yang menantang.</p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all shadow-2xl hover:shadow-purple-500/40"
              >
                Mulai Berdiskusi
              </a>
           </div>
        </ScrollSection>
      </div>
    </div>
  );
}