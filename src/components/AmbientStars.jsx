import { useEffect, useRef } from 'react';

export default function AmbientStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.max(58, Math.floor((width * height) / 11500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.25 + 0.25,
        alpha: Math.random() * 0.5 + 0.12,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.00055 + 0.00015
      }));
      paint(performance.now());
    };

    const paint = (time = 0) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const shimmer = reducedMotion ? 0 : Math.sin(time * star.speed + star.phase) * 0.16;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(224, 232, 255, ${Math.max(0.08, star.alpha + shimmer)})`;
        context.fill();
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(paint);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(frame);
      paint(performance.now());
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    motionQuery.addEventListener?.('change', onMotionChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-stars" aria-hidden="true" />;
}
