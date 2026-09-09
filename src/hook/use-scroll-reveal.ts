import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

      if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              const delay = target.getAttribute('data-delay');
              if (delay) {
                target.style.transitionDelay = `${delay}ms`;
              }
              target.classList.add('is-revealed');
              observer.unobserve(target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};

export const ScrollRevealObserver: React.FC = () => {
  useScrollReveal();
  return null;
};