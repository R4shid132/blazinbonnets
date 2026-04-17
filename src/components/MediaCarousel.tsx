import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  alt: string;
  aspect?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  showThumbnails?: boolean;
  showArrows?: boolean;
  rounded?: string;
  fit?: 'cover' | 'contain';
}

export default function MediaCarousel({
  items,
  alt,
  aspect = 'aspect-[16/10]',
  autoPlay = true,
  intervalMs = 3500,
  showThumbnails = false,
  showArrows = true,
  rounded = 'rounded-lg',
  fit = 'cover',
}: MediaCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const timer = useRef<number | null>(null);

  const total = items.length;
  const current = items[index];

  useEffect(() => {
    if (!autoPlay || total <= 1 || isHover || current?.type === 'video') return;
    timer.current = window.setTimeout(() => {
      setIndex(i => (i + 1) % total);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, autoPlay, total, isHover, intervalMs, current]);

  if (total === 0) return null;

  const go = (dir: number) => setIndex(i => (i + dir + total) % total);

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden ${rounded} bg-black group/carousel`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {fit === 'contain' && current.type === 'image' && (
            <img
              src={current.src}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
            />
          )}
          {current.type === 'video' ? (
            <video
              src={current.src}
              poster={current.poster}
              controls
              playsInline
              preload="metadata"
              className={`relative w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} bg-black`}
            />
          ) : (
            <img
              src={current.src}
              alt={`${alt} – photo ${index + 1}`}
              loading="lazy"
              decoding="async"
              className={`relative w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Vignette gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Video badge */}
      {current.type === 'video' && (
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-background/60 backdrop-blur-md border border-border/50 text-[10px] font-heading font-semibold uppercase tracking-wider text-foreground">
          <Play className="w-3 h-3 fill-primary text-primary" /> Video
        </div>
      )}

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/40 hover:bg-foreground/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-background/50 backdrop-blur-md border border-border/50 text-[10px] font-heading font-semibold text-foreground">
          {index + 1} / {total}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && total > 1 && (
        <div className="absolute -bottom-20 left-0 right-0" />
      )}
    </div>
  );
}

export function buildMediaItems(images: string[] = [], videos: string[] = []): MediaItem[] {
  return [
    ...videos.map(src => ({ type: 'video' as const, src })),
    ...images.map(src => ({ type: 'image' as const, src })),
  ];
}
