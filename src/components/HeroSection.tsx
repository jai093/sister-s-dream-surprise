import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [age, setAge] = useState(0);
  const targetAge = 22; // Customize this!
  
  const formattedDate = "Monday, January 19, 2026";

  useEffect(() => {
    const timer = setTimeout(() => setShowFullText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showFullText) {
      const interval = setInterval(() => {
        setAge(prev => {
          if (prev >= targetAge) {
            clearInterval(interval);
            // Trigger confetti when age reaches target
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#ffb6c1', '#e6e6fa', '#ffd700', '#ff69b4']
            });
            return targetAge;
          }
          return prev + 1;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [showFullText]);

  const handleStartMagic = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#e6e6fa', '#ffd700', '#ff69b4', '#ffe4e1']
    });

    // Scroll to memories section
    document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-20 left-10 text-4xl animate-float"
      >
        🎀
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-32 right-12 text-3xl animate-float"
        style={{ animationDelay: '1s' }}
      >
        ✨
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-40 left-16 text-4xl animate-float"
        style={{ animationDelay: '2s' }}
      >
        🎂
      </motion.div>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground font-body text-sm md:text-base mb-4"
      >
        {formattedDate}
      </motion.p>

      {/* Main heading with typewriter effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
          <span className="animate-shimmer">Happy Birthday</span>
        </h1>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-rose-gold"
        >
          Navya! 💕
        </motion.h2>
      </motion.div>

      {/* Age celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center"
      >
        <p className="font-body text-muted-foreground text-lg mb-2">Celebrating</p>
        <div className="relative inline-block">
          <span className="font-display text-7xl md:text-9xl text-gradient-gold font-bold">
            {age}
          </span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute -top-4 -right-8 text-3xl"
          >
            ✨
          </motion.span>
        </div>
        <p className="font-body text-muted-foreground text-lg mt-2">wonderful years</p>
      </motion.div>

      {/* Start magic button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartMagic}
        className="mt-12 px-8 py-4 bg-gradient-to-r from-blush to-lavender rounded-full font-body font-semibold text-foreground shadow-dreamy hover:shadow-gold transition-all duration-300 flex items-center gap-2 border-2 border-gold/30"
      >
        <Sparkles className="w-5 h-5 text-gold" />
        Start the Magic
        <Sparkles className="w-5 h-5 text-gold" />
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <motion.span 
          className="text-2xl mb-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.span>
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-scroll-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
