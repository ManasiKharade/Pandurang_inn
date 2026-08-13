import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to ensure DOM is ready after navigation/redirect
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          const headerOffset = 90;
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Only scroll to top when navigating to a new path without hash
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
