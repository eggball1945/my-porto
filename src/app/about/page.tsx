'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Terminal, 
  Zap, 
  Search, 
  Layout, 
  Database, 
  ShieldCheck, 
  Rocket,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6 text-purple-500" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
    color: 'from-purple-500/10 to-purple-500/5',
  },
  {
    title: 'Backend Development',
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    skills: ['Node.js', 'Laravel', 'PHP', 'MySQL', 'Python'],
    color: 'from-indigo-500/10 to-indigo-500/5',
  },
  {
    title: 'Tools & Others',
    icon: <Terminal className="w-6 h-6 text-emerald-500" />,
    skills: ['Git', 'GitHub', 'REST API'],
    color: 'from-emerald-500/10 to-emerald-500/5',
  },
];

const values = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
    title: 'Reliable Backend',
    desc: 'Membangun arsitektur server yang kuat dan aman untuk aplikasi berskala besar.'
  },
  {
    icon: <Zap className="w-8 h-8 text-indigo-400" />,
    title: 'Fast & Optimized',
    desc: 'Fokus pada performa kode dan optimasi database untuk pengalaman pengguna terbaik.'
  },
  {
    icon: <Search className="w-8 h-8 text-emerald-400" />,
    title: 'Problem Solver',
    desc: 'Senang memecahkan tantangan teknis yang kompleks dengan solusi kreatif.'
  }
];

const timeline = [
  {
    year: 'Present',
    title: 'Fullstack Developer Freelance',
    company: 'Berbagai Proyek Digital',
    desc: 'Mengembangkan solusi web kustom dan sistem backend yang efisien untuk berbagai klien.'
  },
  {
    year: '2026',
    title: 'Project E-Commerce: TechPed',
    company: 'Independent Milestone',
    desc: 'Membangun platform e-commerce dengan fitur lengkap dari sisi pembeli hingga dashboard admin.'
  },
  {
    year: '2023 - 2026',
    title: 'Pengembangan Perangkat Lunak & Gim (PPLG)',
    company: 'Sekolah Menengah Kejuruan (SMK)',
    desc: 'Mendalami dasar-dasar pemrograman, rekayasa perangkat lunak, dan pengembangan game modern.'
  }
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

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.4], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.4], [1, 0.95]);
  const heroBlur = useTransform(heroScroll, [0, 0.4], [0, 10]);

  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          ref={containerRef}
          style={{ opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur}px)` }}
          className="max-w-6xl mx-auto mb-40"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Tentang <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">Saya.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Membangun fondasi digital yang kuat melalui arsitektur sistem yang cerdas dan skalabel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-square max-w-md mx-auto border border-white/10 shadow-2xl">
                <Image
                  src="/images/profile-updated.png"
                  alt="Iqbal Fadilah"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Membangun Arsitektur Digital yang <span className="text-purple-400">Tangguh</span>.
              </h2>
              <div className="space-y-6 text-xl text-slate-300 leading-relaxed font-light">
                <p>
                  Saya Iqbal Fadilah, seorang Backend Developer yang berdedikasi menciptakan sistem web yang efisien, skalabel, dan berperforma tinggi. 
                </p>
                <p>
                  Fokus utama saya adalah mengubah tantangan teknis yang kompleks menjadi solusi backend yang elegan, mulai dari optimasi database hingga pengembangan API yang aman dan terukur.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-6">
                 <Link href="/projects" className="flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all shadow-2xl hover:shadow-purple-500/40">
                   Lihat Proyek <ArrowRight className="w-5 h-5" />
                 </Link>
                 <Link href="/contact" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                   Hubungi Saya
                 </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* SKILLS SECTION */}
        <ScrollSection className="max-w-6xl mx-auto mb-40">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Tech Stack</h2>
             <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.1 
                }}
                className={`p-10 rounded-[2.5rem] bg-slate-800/40 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 group shadow-2xl`}
              >
                <div className="mb-8 p-5 bg-white/5 rounded-3xl w-fit group-hover:scale-110 group-hover:bg-purple-500/10 transition-all duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                      className="px-5 py-2 bg-white/5 text-slate-300 text-sm font-medium rounded-xl border border-white/5 hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollSection>

        {/* VALUES SECTION */}
        <ScrollSection className="max-w-6xl mx-auto mb-40 bg-slate-800/20 backdrop-blur-xl rounded-[4rem] p-16 md:p-32 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {values.map((v, idx) => (
              <div 
                key={v.title}
                className="text-center space-y-8"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex justify-center"
                >
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 shadow-xl">
                    {v.icon}
                  </div>
                </motion.div>
                <h3 className="text-3xl font-black text-white tracking-tight">{v.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </ScrollSection>

        {/* MODERN JOURNEY SECTION */}
        <div className="max-w-6xl mx-auto py-20">
          <ScrollSection className="text-center mb-32">
             <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Perjalanan Karir</h2>
             <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">Evolusi saya sebagai developer, dari baris kode pertama hingga membangun solusi skala besar.</p>
             <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-10 rounded-full" />
          </ScrollSection>

          <div className="space-y-24">
            {timeline.map((item, idx) => (
              <ScrollSection
                key={idx}
                className={`relative flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Year Decoration */}
                <div className="hidden lg:block absolute -top-16 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter">
                  {item.year.split(' ')[0]}
                </div>

                {/* Card */}
                <div className="w-full md:w-[50%] relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative p-12 bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] hover:border-purple-500/30 transition-all duration-500 shadow-2xl">
                    <div className="flex items-start justify-between mb-10">
                       <span className="px-6 py-2 bg-purple-500/10 text-purple-400 text-sm font-black rounded-full border border-purple-500/20 tracking-widest uppercase">
                         {item.year}
                       </span>
                       <div className="p-4 bg-white/5 rounded-2xl shadow-inner">
                          {idx === 0 ? <Rocket className="w-7 h-7 text-purple-400" /> : idx === 1 ? <Layers className="w-7 h-7 text-indigo-400" /> : <Code2 className="w-7 h-7 text-emerald-400" />}
                       </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                    <div className="text-indigo-400 font-black text-xl mb-8">{item.company}</div>
                    
                    <p className="text-slate-400 leading-relaxed text-xl font-light">
                      {item.desc}
                    </p>

                    <div className="mt-10 flex items-center gap-3 text-white/20 font-black uppercase tracking-[0.3em] text-xs">
                       <div className="w-12 h-[1px] bg-white/10" />
                       Milestone {idx + 1}
                    </div>
                  </div>
                </div>

                {/* Decorative Connector (Desktop) */}
                <div className="hidden md:flex md:w-[50%] flex-col items-center justify-center space-y-6">
                   <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                   <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-purple-500/40 blur-sm" 
                   />
                   <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
