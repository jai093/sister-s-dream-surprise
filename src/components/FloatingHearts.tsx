import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 8,
        delay: 0,
      };
      setHearts(prev => [...prev.slice(-15), heart]);
    };

    // Initial hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createHeart(), i * 500);
    }

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              y: '110vh', 
              x: `${heart.x}vw`,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 30 - 15
            }}
            animate={{ 
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0.8],
              rotate: Math.random() * 60 - 30
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setHearts(prev => prev.filter(h => h.id !== heart.id));
            }}
            className="absolute text-blush-deep"
            style={{ fontSize: heart.size }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Static sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-gold rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
