import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sun, Sparkles, Music, Coffee, Book, Smile } from 'lucide-react';

const traits = [
  {
    icon: Heart,
    title: "Your Kind Heart",
    description: "The way you care for everyone around you makes the world a better place. Your love knows no bounds. 💕",
    color: "from-blush to-rose-gold"
  },
  {
    icon: Star,
    title: "Your Brilliant Mind",
    description: "Smart, creative, and always curious. You inspire me to learn and grow every single day. ✨",
    color: "from-lavender to-secondary"
  },
  {
    icon: Sun,
    title: "Your Bright Smile",
    description: "That smile of yours can light up the darkest room. It's pure magic and joy wrapped in one. ☀️",
    color: "from-gold to-champagne"
  },
  {
    icon: Sparkles,
    title: "Your Unique Spirit",
    description: "There's no one quite like you in this world. Your uniqueness makes you absolutely irreplaceable. 🌟",
    color: "from-blush-deep to-lavender-deep"
  },
  {
    icon: Music,
    title: "Your Beautiful Soul",
    description: "The music of your laughter, the rhythm of your kindness - you're a symphony of wonderful. 🎵",
    color: "from-secondary to-lavender"
  },
  {
    icon: Smile,
    title: "Your Joyful Energy",
    description: "You bring happiness wherever you go. Being around you is like a breath of fresh air. 😊",
    color: "from-champagne to-blush"
  }
];

const SpecialTraits = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="special" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            What Makes You Special ✨
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Tap each card to reveal why you're the most amazing sister in the world!
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {traits.map((trait, index) => {
            const Icon = trait.icon;
            const isFlipped = flippedCards.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleFlip(index)}
                className="perspective-1000 cursor-pointer h-64"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${trait.color} p-6 flex flex-col items-center justify-center shadow-soft hover:shadow-gold transition-shadow backface-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Icon className="w-16 h-16 text-foreground/80 mb-4" />
                    </motion.div>
                    <h3 className="font-display text-2xl text-foreground text-center">
                      {trait.title}
                    </h3>
                    <p className="font-body text-sm text-foreground/70 mt-2">
                      Tap to reveal 💫
                    </p>
                  </div>

                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-card p-6 flex flex-col items-center justify-center shadow-dreamy border-2 border-blush/30"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <Icon className="w-10 h-10 text-rose-gold mb-4" />
                    <p className="font-body text-foreground text-center leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialTraits;
