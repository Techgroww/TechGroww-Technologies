import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel({ images, autoPlay = true, interval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isHovering) {
      return;
    }

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length, interval, isHovering]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setIsAutoPlaying(autoPlay);
  }, [images, autoPlay]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video sm:aspect-video md:aspect-video bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-2xl flex items-center justify-center">
        <div className="text-4xl sm:text-5xl md:text-6xl">🚀</div>
      </div>
    );
  }

  return (
    <div 
      className="relative group rounded-2xl overflow-hidden shadow-2xl w-full aspect-video sm:aspect-video md:aspect-video"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full h-full bg-linear-to-br from-[#0A1F44] to-[#00D4FF]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Project image ${currentIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={toggleAutoPlay}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </>
      )}

      {images.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-4 sm:w-6 h-1.5 sm:h-2 bg-[#00D4FF] rounded-full'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white/80 rounded-full'
                }`}
              />
            ))}
          </div>

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}