import { useState, MouseEvent } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Grid,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'All Images' },
    { id: 'store', label: 'Store Front' },
    { id: 'medicines', label: 'Medicine Shelves' },
    { id: 'products', label: 'Healthcare Products' },
    { id: 'equipment', label: 'Medical Equipment' },
    { id: 'customers', label: 'Services & Customers' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const openLightbox = (indexInFiltered: number) => {
    // Find the item in the filtered list
    const actualItem = filteredItems[indexInFiltered];
    // Find its original index in full GALLERY_ITEMS list
    const globalIndex = GALLERY_ITEMS.findIndex(item => item.id === actualItem.id);
    setLightboxIndex(globalIndex);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoomScale(1);
  };

  const showNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % GALLERY_ITEMS.length;
    setLightboxIndex(nextIndex);
    setZoomScale(1);
  };

  const showPrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxIndex(prevIndex);
    setZoomScale(1);
  };

  const handleZoomIn = (e: MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: MouseEvent) => {
    e.stopPropagation();
    setZoomScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleZoomReset = (e: MouseEvent) => {
    e.stopPropagation();
    setZoomScale(1);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2" id="gallery-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0A8F6A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
            id={`gallery-tab-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        id="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl overflow-hidden shadow-xs bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 cursor-pointer"
              onClick={() => openLightbox(index)}
              id={`gallery-card-${item.id}`}
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <span className="inline-block px-2 py-0.5 bg-[#0A8F6A]/95 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold leading-tight line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-200 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                </div>
                {/* Maximize Icon Badge */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 text-slate-700 dark:bg-slate-900/90 dark:text-slate-300 flex items-center justify-center shadow-xs scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
              <div className="p-3 sm:hidden">
                <span className="text-[10px] font-bold text-[#0A8F6A] uppercase tracking-wider dark:text-emerald-400">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Popup Lightbox with image zoom */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xs"
            onClick={closeLightbox}
          >
            {/* Lightbox Header with controls */}
            <div 
              className="absolute top-4 left-4 right-4 flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 className="text-sm font-bold">{GALLERY_ITEMS[lightboxIndex].title}</h4>
                <p className="text-xs text-slate-400 font-medium capitalize">
                  Category: {GALLERY_ITEMS[lightboxIndex].category}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title="Zoom Out"
                    disabled={zoomScale === 1}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleZoomReset}
                    className="p-1.5 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title="Reset Zoom"
                    disabled={zoomScale === 1}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={closeLightbox}
                  className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div className="relative flex items-center justify-center max-w-5xl w-full h-[70vh]">
              {/* Prev Button */}
              <button
                onClick={showPrev}
                className="absolute left-0 z-10 p-3 bg-slate-900/80 border border-slate-800 text-white rounded-full hover:bg-[#0A8F6A] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Image Container */}
              <div className="overflow-hidden max-h-full max-w-full flex items-center justify-center rounded-xl bg-slate-900/40 relative">
                <motion.img
                  key={lightboxIndex}
                  src={GALLERY_ITEMS[lightboxIndex].imageUrl}
                  alt={GALLERY_ITEMS[lightboxIndex].title}
                  style={{ scale: zoomScale }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="max-h-[70vh] max-w-[80vw] object-contain cursor-grab active:cursor-grabbing rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={showNext}
                className="absolute right-0 z-10 p-3 bg-slate-900/80 border border-slate-800 text-white rounded-full hover:bg-[#0A8F6A] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Description Area */}
            <div 
              className="absolute bottom-6 text-center text-slate-300 max-w-xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs sm:text-sm italic">{GALLERY_ITEMS[lightboxIndex].description}</p>
              <div className="mt-2 text-[10px] text-slate-500 font-mono">
                Image {lightboxIndex + 1} of {GALLERY_ITEMS.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
