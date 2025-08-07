/**
 * TeamSlider Component
 * 
 * A dynamic image slider for team members using Swiper.js
 * Configured to work with the team data structure in homepage content.
 * 
 * To add new doctors:
 * 1. Add doctor images to /public/images/team/doctor-name/
 * 2. Update src/content/homepage/-index.md with new doctor data:
 *    - name: "Doctor Name"
 *    - id: "doctor-slug"
 *    - images: [array of image paths]
 *    - main_image: main image path
 *    - active: true (to make this doctor active in slider)
 * 
 * Features:
 * - Auto-playing slides with fade effect
 * - Pause on hover
 * - Manual navigation with dots
 * - Responsive design
 * - Lazy loading for performance
 */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface TeamSliderProps {
  images: string[];
  alt?: string;
  height?: number;
  width?: number;
  interval?: number;
  className?: string;
  doctorName?: string;
}

const TeamSlider: React.FC<TeamSliderProps> = ({
  images,
  alt = "Team member",
  height = 500,
  interval = 4000,
  className = "",
  doctorName
}) => {
  return (
    <div className={`team-slider ${className}`} style={{ height: `${height}px` }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{
          delay: interval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        loop={true}
        speed={800}
        className="h-full w-full rounded-2xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img
                src={image}
                alt={doctorName ? `${doctorName} - Imagen ${index + 1}` : `${alt} ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .team-slider :global(.swiper-pagination) {
          bottom: 1rem !important;
        }
        
        .team-slider :global(.custom-bullet) {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border: 2px solid rgba(255, 255, 255, 0.8) !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          transition: all 0.3s ease !important;
          backdrop-filter: blur(4px) !important;
        }
        
        .team-slider :global(.custom-bullet:hover) {
          background: rgba(255, 255, 255, 0.6) !important;
          transform: scale(1.1) !important;
        }
        
        .team-slider :global(.custom-bullet-active) {
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(255, 255, 255, 1) !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
        }
        
        @media (max-width: 768px) {
          .team-slider :global(.swiper-pagination) {
            bottom: 0.5rem !important;
          }
          
          .team-slider :global(.custom-bullet) {
            width: 10px !important;
            height: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamSlider;