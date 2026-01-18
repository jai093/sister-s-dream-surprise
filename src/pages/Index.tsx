import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import FloatingHearts from '@/components/FloatingHearts';
import HeroSection from '@/components/HeroSection';
import PhotoGallery from '@/components/PhotoGallery';
import SpecialTraits from '@/components/SpecialTraits';
import LoveLetter from '@/components/LoveLetter';
import ShareSection from '@/components/ShareSection';
import BackgroundMusic from '@/components/BackgroundMusic';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Small delay before showing content for smooth transition
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Music */}
            <BackgroundMusic />

            {/* Floating hearts background */}
            <FloatingHearts />

            {/* Hero Section */}
            <HeroSection />

            {/* Photo Gallery */}
            <PhotoGallery />

            {/* What Makes You Special */}
            <SpecialTraits />

            {/* Love Letter */}
            <LoveLetter />

            {/* Share Section */}
            <ShareSection />

            {/* Footer */}
            <footer className="py-8 text-center bg-gradient-romantic">
              <p className="font-body text-muted-foreground text-sm">
                Crafted with infinite love 💕 Happy Birthday Navya!
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
