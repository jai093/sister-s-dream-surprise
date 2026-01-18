import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveLetter = () => {
  const letterContent = `My Dearest Navya,

On this special day, I want you to know just how much you mean to me. You're not just my sister – you're my best friend, my confidant, and my forever support system.

From our childhood days of silly fights to now being each other's biggest cheerleaders, every moment with you has been a blessing. Your laughter is the sweetest melody, your smile the brightest light, and your love the most precious gift I've ever received.

You've grown into such an incredible, beautiful, and inspiring person. Watching you chase your dreams fills my heart with so much pride. You have this magical way of making everyone around you feel special and loved.

As you step into this new year of your life, I wish you all the happiness the universe can offer. May your days be filled with endless joy, your heart with overflowing love, and your life with extraordinary adventures.

Thank you for being you – perfectly imperfect and absolutely wonderful. Thank you for being my sister.

Happy Birthday, my love! 🎂💕

Forever yours,
Your Loving Sibling 💖`;

  return (
    <section id="letter" className="py-20 px-4 md:px-8 bg-gradient-romantic">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            A Letter From My Heart 💌
          </h2>
        </motion.div>

        {/* Envelope/Letter container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Letter */}
          <motion.div
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative bg-cream rounded-lg p-8 md:p-12 shadow-dreamy border-2 border-dashed border-gold/40"
          >
            {/* Gold corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/60 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/60 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/60 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/60 rounded-br-lg" />

            {/* Floating hearts decoration */}
            <motion.span
              className="absolute -top-6 -right-6 text-4xl"
              animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💕
            </motion.span>
            <motion.span
              className="absolute -bottom-4 -left-4 text-3xl"
              animate={{ rotate: [0, -10, 10, 0], y: [0, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              💖
            </motion.span>

            {/* Letter content */}
            <div className="font-handwritten text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-line">
              {letterContent.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="mb-6 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Seal at the bottom */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: "spring", stiffness: 100 }}
              className="flex justify-center mt-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-gold to-blush-deep flex items-center justify-center shadow-gold animate-pulse-glow">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
