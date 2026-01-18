import { motion } from 'framer-motion';
import { Share2, Heart, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState } from 'react';

const ShareSection = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Happy Birthday Navya! 💕',
      text: 'A magical birthday surprise created with love! 🎂✨',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy
        handleCopy();
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#ffb6c1', '#ffd700']
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Copy failed:', err);
    }
  };

  return (
    <section id="share" className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Big heart decoration */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl md:text-8xl mb-8"
          >
            💝
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
            Wishing You The Best Day Ever!
          </h2>
          
          <p className="font-body text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            May this year bring you everything your heart desires and more. You deserve all the love and happiness in the world! 
          </p>

          {/* Share buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="px-8 py-4 bg-gradient-to-r from-blush to-lavender rounded-full font-body font-semibold text-foreground shadow-dreamy hover:shadow-gold transition-all duration-300 flex items-center gap-2 border-2 border-gold/30"
            >
              <Share2 className="w-5 h-5" />
              Share This Surprise
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="px-8 py-4 bg-card rounded-full font-body font-semibold text-foreground shadow-soft hover:shadow-dreamy transition-all duration-300 flex items-center gap-2 border-2 border-blush/30"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Link
                </>
              )}
            </motion.button>
          </div>

          {/* Final message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 font-handwritten text-2xl md:text-3xl text-rose-gold"
          >
            Made with 💕 for the most wonderful sister in the world
          </motion.p>

          {/* Floating hearts at bottom */}
          <div className="relative h-24 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{ left: `${15 + i * 18}%` }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                💕
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareSection;
