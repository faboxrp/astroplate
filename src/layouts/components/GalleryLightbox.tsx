/**
 * GalleryLightbox Component
 * 
 * React-based gallery with lightbox functionality for better SPA navigation.
 * Uses React state management instead of vanilla JS event listeners.
 * 
 * Features:
 * - Masonry-style responsive grid layout
 * - Lightbox modal with navigation
 * - Keyboard navigation support
 * - Click outside to close
 * - Lazy loading for performance
 */
import React, { useState, useEffect, useCallback } from 'react';

interface GalleryItem {
  image_url: string;
  alt_text: string;
  caption?: string;
}

interface GalleryLightboxProps {
  items: GalleryItem[];
  className?: string;
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ items, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeLightbox = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  }, [items.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          No hay imágenes en la galería actualmente.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={`gallery-grid ${className}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="gallery-item cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-100 dark:bg-gray-800">
              <img
                src={item.image_url}
                alt={item.alt_text}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-3 text-sm font-medium">
                  {item.caption}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl z-10 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200"
            aria-label="Cerrar galería"
          >
            ×
          </button>

          {/* Previous Button */}
          {items.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Imagen anterior"
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {items.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Siguiente imagen"
            >
              ›
            </button>
          )}

          {/* Image Container */}
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <img
              src={items[currentIndex].image_url}
              alt={items[currentIndex].alt_text}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {items[currentIndex].caption && (
              <p className="text-white text-center mt-4 max-w-2xl px-4">
                {items[currentIndex].caption}
              </p>
            )}
            {items.length > 1 && (
              <p className="text-white/70 text-sm mt-2">
                {currentIndex + 1} de {items.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryLightbox;