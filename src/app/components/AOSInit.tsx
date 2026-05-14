'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInit = () => {
  const pathname = usePathname();

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50,
        easing: 'ease-out-cubic',
        startEvent: 'DOMContentLoaded', // Initialized as soon as DOM is ready
      });
      AOS.refresh();
    };

    // Immediate init
    initAOS();

    // Secondary init after a short delay just in case
    const timer = setTimeout(initAOS, 100);

    // Handle BFcache (Back/Forward Cache) restores
    const handlePageShow = (event: PageTransitionEvent) => {
      // Re-init AOS immediately on back/forward navigation
      initAOS();
      // Force refresh multiple times to catch any layout shifts
      setTimeout(AOS.refresh, 100);
      setTimeout(AOS.refresh, 500);
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', initAOS);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', initAOS);
    };
  }, []);

  // Refresh AOS when pathname changes
  useEffect(() => {
    AOS.refresh();
    const timer = setTimeout(() => {
      AOS.refresh();
      // Ensure aos-init is present
      if (!document.querySelector('.aos-init')) {
        AOS.init();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
