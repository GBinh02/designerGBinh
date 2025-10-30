import React, { useState } from 'react';
import { Heart, Star, Sparkles, Smile, ChevronRight } from 'lucide-react';
import Fireworks from './Fireworks';

const GreetingCard = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowFireworks(true);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 flex items-center justify-center p-4 overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {showFireworks && <Fireworks />}

      <div className="relative w-full max-w-4xl">
        {/* Envelope - Front */}
        <div className={`relative transition-all duration-1000 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="relative mx-auto w-full max-w-2xl" style={{ perspective: '1000px' }}>
            {/* Envelope body */}
            <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-2xl p-8 sm:p-12 md:p-16"
              style={{
                aspectRatio: '3/2',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Envelope pattern */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(30)].map((_, i) => (
                  <Heart
                    key={i}
                    className="absolute"
                    style={{
                      left: `${(i % 6) * 16}%`,
                      top: `${Math.floor(i / 6) * 20}%`,
                      transform: `rotate(${Math.random() * 30 - 15}deg)`
                    }}
                    size={20}
                  />
                ))}
              </div>

              {/* Envelope flap top */}
              <div className="absolute -top-1 left-0 right-0 h-32 sm:h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200"
                  style={{
                    clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                    boxShadow: 'inset 0 -2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                ></div>
              </div>

              {/* Wax seal */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={handleOpenLetter}
                  style={{
                    boxShadow: '0 8px 20px rgba(220, 38, 38, 0.6), inset 0 -2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <Heart className="text-white w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              </div>

              {/* Letter content peek */}
              <div className="relative z-0 mt-16 sm:mt-20">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 sm:p-8 text-center">
                  <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 mb-2">
                    Lá Thư Đặc Biệt
                  </h3>
                  <p className="text-base sm:text-lg text-purple-600">
                    Dành tặng cho bạn 💝
                  </p>
                </div>
              </div>

              {/* Click hint */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
                <p className="text-purple-600 font-semibold animate-bounce text-sm sm:text-base">
                  👆 Click vào nơ để mở thư
                </p>
              </div>
            </div>

            {/* Floating sparkles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${i < 4 ? -5 : 105}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                <Sparkles className="text-yellow-300" size={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Letter content - Inside */}
        <div className={`absolute inset-0 transition-all duration-1000 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 sm:border-8 border-white relative overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  <Star className="animate-pulse" size={20 + Math.random() * 15} />
                </div>
              ))}
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 animate-spin" />
                <Star className="w-10 h-10 sm:w-14 sm:h-14 text-pink-500 animate-pulse" />
                <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 animate-spin" />
              </div>

              {/* Main title */}
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-center mb-4 sm:mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent px-2">
                🎂 CHÚC MỪNG SINH NHẬT! 🎂
              </h2>

              {/* Letter greeting */}
              <div className="bg-white/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg border-2 border-purple-200">
                <p className="text-base sm:text-lg md:text-xl text-gray-600 italic mb-4 text-center">
                  Gửi đến người bạn thân yêu,
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                    🌟 <strong>Chúc bạn một tuổi mới tràn đầy niềm vui,</strong> 🌟
                  </p>
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                    💝 <strong>Hạnh phúc và thành công trong cuộc sống!</strong> 💝
                  </p>
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                    ✨ <strong>Mãi mãi tuổi trẻ, luôn rạng rỡ!</strong> ✨
                  </p>
                </div>

                <p className="text-base sm:text-lg text-gray-600 italic mt-6 text-right">
                  Yêu thương, ❤️
                </p>
              </div>

              {/* Wishes */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                {[
                  { icon: '🎯', text: 'Thành Công' },
                  { icon: '❤️', text: 'Hạnh Phúc' },
                  { icon: '🌈', text: 'May Mắn' }
                ].map((wish, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center transform hover:scale-105 transition-transform"
                  >
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">{wish.icon}</div>
                    <p className="text-sm sm:text-lg font-bold text-purple-700">{wish.text}</p>
                  </div>
                ))}
              </div>

              {/* Emojis decoration */}
              <div className="text-center mb-4 sm:mb-8">
                <p className="text-3xl sm:text-5xl">🎈 🎉 🎊 🎁 🎀 🎈</p>
              </div>

              {/* Next button */}
              <div className="text-center">
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                           text-white rounded-full text-lg sm:text-xl md:text-2xl font-bold 
                           hover:scale-110 active:scale-95 transform transition-all duration-300 shadow-2xl
                           flex items-center gap-2 sm:gap-3 mx-auto glow touch-manipulation
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  🎂 Thổi Nến Thôi!
                  <ChevronRight size={24} className="sm:w-7 sm:h-7" />
                </button>
              </div>

              {/* Footer message */}
              <div className="mt-4 sm:mt-8 text-center">
                <Smile className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-2 sm:mb-3 animate-bounce" />
                <p className="text-gray-600 text-base sm:text-lg italic px-4">
                  "Tuổi mới vui vẻ, hạnh phúc bên người thân yêu!" 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;