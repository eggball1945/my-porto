'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(timer);
    };
  }, [threshold]);

  // Before mount (SSR), always show content to prevent blank pages
  if (!hasMounted) {
    return <div className={className}>{children}</div>;
  }

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    
    switch (animation) {
      case 'fade-up': return 'translateY(40px)';
      case 'fade-down': return 'translateY(-40px)';
      case 'fade-left': return 'translateX(40px)';
      case 'fade-right': return 'translateX(-40px)';
      case 'zoom-in': return 'scale(0.9)';
      case 'zoom-out': return 'scale(1.1)';
      default: return 'none';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
};
