import { motion } from 'framer-motion';

export default function ProgressBar({ active }) {
  return (
    <div className="h-1 w-full bg-slate-200 overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
        initial={{ width: '0%' }}
        animate={{ width: active ? '100%' : '0%' }}
        transition={{ duration: 1.1, repeat: active ? Infinity : 0, ease: 'linear' }}
      />
    </div>
  );
}
