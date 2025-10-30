import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Camera, Image } from 'lucide-react';

const PhotoGallery = ({ onNext }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  // Danh sách ảnh - sử dụng đường dẫn tương đối cho GitHub Pages
  const photos = [
    {
      src: './images/photo1.jpg',
      caption: 'Những khoảnh khắc đẹp đẽ',
      bg: 'from-rose-400 to-pink-600',
      icon: '🌟'
    },
    {
      src: './images/photo2.jpg',
      caption: 'Kỷ niệm khó quên',
      bg: 'from-blue-400 to-cyan-600',
      icon: '🎈'
    },
    {
      src: './images/photo3.jpg',
      caption: 'Hạnh phúc mỗi ngày',
      bg: 'from-purple-400 to-indigo-600',
      icon: '🎊'
    }
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPhoto < photos.length - 1) {
      setCurrentPhoto(prev => prev + 1);
    }
    if (isRightSwipe && currentPhoto > 0) {
      setCurrentPhoto(prev => prev - 1);
    }
  };

  // Mouse drag for desktop
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (touchStart === 0) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (touchStart === 0) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPhoto < photos.length - 1) {
      setCurrentPhoto(prev => prev + 1);
    }
    if (isRightSwipe && currentPhoto > 0) {
      setCurrentPhoto(prev => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
    containerRef.current.style.cursor = 'grab';
  };

  const handlePrevious = () => {
    if (currentPhoto > 0) {
      setCurrentPhoto(prev => prev - 1);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhoto < photos.length - 1) {
      setCurrentPhoto(prev => prev + 1);
    }
  };

  const handleDotClick = (index) => {
    setCurrentPhoto(index);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Camera className="text-white/10" size={30 + Math.random() * 20} />
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-4xl px-4 md:px-8">
        {/* Photo container with swipe support */}
        <div 
          ref={containerRef}
          className="relative h-[400px] sm:h-[500px] md:h-[550px] mb-6 md:mb-8 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                index === currentPhoto
                  ? 'opacity-100 scale-100 translate-x-0 z-10'
                  : index < currentPhoto
                  ? 'opacity-0 scale-95 -translate-x-full z-0'
                  : 'opacity-0 scale-95 translate-x-full z-0'
              }`}
            >
              {/* Photo card */}
              <div className={`relative bg-gradient-to-br ${photo.bg} rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden h-full p-3 sm:p-4 transform hover:scale-105 transition-transform duration-300`}>
                {/* Image placeholder with icon */}
                <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex flex-col items-center justify-center border-2 sm:border-4 border-white/50">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
                    draggable="false"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none' }} className="flex-col items-center justify-center px-4">
                    <span className="text-6xl sm:text-9xl mb-2 sm:mb-4">{photo.icon}</span>
                    <Image className="text-white/50 mb-2 sm:mb-4" size={60} />
                    <p className="text-white text-lg sm:text-2xl font-bold text-center">{photo.caption}</p>
                  </div>
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center px-4">
                  <div className="bg-black/40 backdrop-blur-md inline-block px-4 py-2 sm:px-8 sm:py-4 rounded-full">
                    <p className="text-white text-base sm:text-xl md:text-2xl font-bold drop-shadow-lg">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-4xl sm:text-6xl opacity-80 animate-pulse">
                  {photo.icon}
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          {currentPhoto > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="text-purple-600" size={28} />
            </button>
          )}

          {currentPhoto < photos.length - 1 && (
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="text-purple-600" size={28} />
            </button>
          )}
        </div>

        {/* Swipe hint */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-white/60 text-sm sm:text-base animate-pulse">
            👆 Vuốt hoặc click mũi tên để xem ảnh
          </p>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 md:mb-8">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full touch-manipulation ${
                index === currentPhoto
                  ? 'w-10 sm:w-12 h-3 sm:h-4 bg-white'
                  : 'w-3 sm:w-4 h-3 sm:h-4 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Xem ảnh ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-white text-purple-600 rounded-full font-bold 
                     text-base sm:text-lg hover:scale-110 active:scale-95
                     transform transition-all duration-300 shadow-xl
                     flex items-center gap-2 sm:gap-3 mx-auto glow touch-manipulation
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Xem Thiệp Chúc Mừng
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Photo counter */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-white/70 text-base sm:text-lg">
            {currentPhoto + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;