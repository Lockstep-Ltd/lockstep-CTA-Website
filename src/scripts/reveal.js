(() => {
  const root = document.documentElement;
  if (!('IntersectionObserver' in window) || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  root.classList.add('js-motion');
  const watch = (options) => {
    const observer = new IntersectionObserver((entries) => {
      // Items arriving together are staggered slightly, in page order
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.style.setProperty('--reveal-delay', `${i++ * 90}ms`);
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, options);
    return observer;
  };
  const reveals = watch({ rootMargin: '0px 0px -12% 0px' });
  // The staircase waits until half of it is on screen, and on tall screens until the
  // hero has finished, so it builds while someone is actually looking at it
  const stairs = watch({ threshold: 0.5 });
  addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => reveals.observe(el));
    setTimeout(() => document.querySelectorAll('.stairs').forEach((el) => stairs.observe(el)), 1600);
  });
})();
