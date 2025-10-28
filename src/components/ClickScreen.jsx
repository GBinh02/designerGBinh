import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';

const ClickScreen = ({ onNext }) => {
  const [balloons, setBalloons] = useState([]);
  const [stars, setStars] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Tạo bóng bay
    const newBalloons = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      color: ['#FF6B9D', '#C44569', '#FFC312', '#00D2FF', '#A29BFE'][Math.floor(Math.random() * 5)]
    }));
    setBalloons(newBalloons);

    // Tạo ngôi sao
    const newStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 10
    }));
    setStars(newStars);
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Stars background */}
      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className="absolute sparkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`
          }}
        >
          <Sparkles className="text-yellow-300" style={{ width: '100%', height: '100%' }} />
        </div>
      ))}

      {/* Balloons */}
      {balloons.map(balloon => (
        <div
          key={`balloon-${balloon.id}`}
          className="absolute bottom-0 animate-bounce"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`
          }}
        >
          <div
            className="w-14 h-16 rounded-full relative shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${balloon.color} 0%, ${balloon.color}dd 100%)`
            }}
          >
            <div className="absolute bottom-0 left-1/2 w-0.5 h-10 bg-gray-400 transform -translate-x-1/2"></div>
            <div className="absolute top-2 left-3 w-4 h-4 bg-white/30 rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-2xl mx-auto">
        <div className="mb-6 md:mb-8 float-animation">
          <Gift className="w-24 h-24 sm:w-32 sm:h-32 text-white mx-auto drop-shadow-2xl" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl animate-pulse leading-tight">
          🎉 HAPPY BIRTHDAY 🎉
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 drop-shadow-lg px-4">
          Một món quà đặc biệt dành cho bạn!
        </p>

        <div className="flex flex-col items-center gap-3 md:gap-4">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 heart-pulse" />
          
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="px-8 py-4 sm:px-12 sm:py-5 bg-white text-purple-600 rounded-full 
                     text-xl sm:text-2xl font-bold hover:scale-110 active:scale-95
                     transform transition-all duration-300 shadow-2xl 
                     hover:shadow-pink-500/50 glow touch-manipulation
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🎁 Mở Quà Ngay!
          </button>
        </div>

        <div className="mt-6 md:mt-8 flex justify-center gap-3 sm:gap-6 flex-wrap">
          {['🎈', '🎊', '🎁', '🎉', '🎈'].map((emoji, i) => (
            <span
              key={i}
              className="text-3xl sm:text-4xl animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickScreen;