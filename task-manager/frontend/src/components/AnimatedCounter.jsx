import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, label }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = displayValue;
    const duration = 350;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const next = Math.round(start + (value - start) * progress);
      setDisplayValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="bg-white/80 backdrop-blur border border-primary-100 rounded-lg p-3 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-bold text-2xl text-primary-700">{displayValue}</p>
    </div>
  );
}
