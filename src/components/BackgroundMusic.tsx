import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Happy birthday music - using a royalty-free happy birthday tune
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    // Auto-hide prompt after 8 seconds
    const timer = setTimeout(() => setShowPrompt(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
      setShowPrompt(false);
    } catch (error) {
      console.log('Autoplay prevented:', error);
    }
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Try to play on first user interaction with the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        handlePlay();
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src={musicUrl}
      />

      {/* Music prompt - shows initially to encourage interaction */}
      <AnimatePresence>
        {showPrompt && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-50 bg-card/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-dreamy border border-gold/30"
          >
            <p className="font-body text-sm text-foreground flex items-center gap-2">
              <Music className="w-4 h-4 text-gold" />
              Tap for birthday music! 🎵
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-dreamy transition-all duration-300 ${
          isPlaying 
            ? 'bg-gradient-to-br from-blush to-lavender border-2 border-gold' 
            : 'bg-card/90 backdrop-blur-md border border-gold/30'
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Volume2 className="w-6 h-6 text-gold" />
          </motion.div>
        ) : (
          <VolumeX className="w-6 h-6 text-muted-foreground" />
        )}

        {/* Pulsing ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
