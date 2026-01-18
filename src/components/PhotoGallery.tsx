import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

import photo1 from '@/assets/photos/photo1.jpg';
import photo2 from '@/assets/photos/photo2.jpg';
import photo3 from '@/assets/photos/photo3.jpg';
import photo4 from '@/assets/photos/photo4.jpg';
import photo5 from '@/assets/photos/photo5.jpg';
import photo6 from '@/assets/photos/photo6.jpg';
import photo7 from '@/assets/photos/photo7.jpg';

const photos = [
  { src: photo1, caption: "Looking stunning as always ✨" },
  { src: photo3, caption: "Those eyes that light up the world 💖" },
  { src: photo4, caption: "Style icon vibes 🎀" },
  { src: photo5, caption: "Adventures and smiles 🌟" },
  { src: photo6, caption: "Pure joy and happiness 🌙" },
  { src: photo7, caption: "Forever my favorite person 💜" },
];

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#ffb6c1', '#ffd700']
    });
    setSelectedIndex(null);
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="memories" className="py-20 px-4 md:px-8 bg-gradient-romantic">
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
            Precious Memories 📸
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Every photo tells a story of love, laughter, and beautiful moments we've shared together.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => openLightbox(index)}
              className={`relative cursor-pointer group rounded-2xl overflow-hidden shadow-soft hover:shadow-gold transition-all duration-300 ${
                index === 0 || index === 6 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover aspect-square md:aspect-auto"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blush-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-body text-white text-sm md:text-base">
                  {photo.caption}
                </p>
              </div>

              {/* Pink glow border on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-blush rounded-2xl transition-all duration-300" />
              
              {/* Heart icon */}
              <motion.div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
              >
                <Heart className="w-6 h-6 text-white fill-rose-gold" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md p-4"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 rounded-full bg-blush/80 hover:bg-blush transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 p-2 rounded-full bg-blush/80 hover:bg-blush transition-colors"
              >
                <ChevronLeft className="w-8 h-8 text-foreground" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 p-2 rounded-full bg-blush/80 hover:bg-blush transition-colors"
              >
                <ChevronRight className="w-8 h-8 text-foreground" />
              </button>

              {/* Image */}
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 25 }}
                className="max-w-4xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selectedIndex].src}
                  alt={photos[selectedIndex].caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-gold"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent text-white font-body text-center py-6 px-4 rounded-b-2xl"
                >
                  {photos[selectedIndex].caption}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;
