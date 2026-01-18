import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-hero"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Pulsing heart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1, 1.1, 1] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 20px hsl(350 100% 80% / 0.3)",
              "0 0 60px hsl(350 100% 75% / 0.6)",
              "0 0 20px hsl(350 100% 80% / 0.3)"
            ]
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-32 h-32 rounded-full bg-blush flex items-center justify-center"
        >
          <Heart className="w-16 h-16 text-rose-gold fill-rose-gold" />
        </motion.div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-32 h-32 -rotate-90">
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="hsl(45 93% 58%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={364}
            initial={{ strokeDashoffset: 364 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-display text-2xl text-foreground"
      >
        Preparing something magical...
      </motion.p>

      {/* Small hearts floating up */}
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-blush-deep text-2xl"
          initial={{ 
            y: 100, 
            x: -100 + i * 50,
            opacity: 0 
          }}
          animate={{ 
            y: -200,
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 2,
            delay: 0.5 + i * 0.2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          💕
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Preloader;
