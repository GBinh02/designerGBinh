import React, { useState } from 'react';
import { Heart, Star, Sparkles, Gift, Smile, ChevronRight } from 'lucide-react';
import Fireworks from './Fireworks';

const GreetingCard = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenCard = () => {
    if (isOpen) return; // Prevent double click
    setIsOpen(true);
    setShowFireworks(true);
  };

  const handleNext = () => {
    if (isTransitioning) return; // Prevent double click
    setIsTransitioning(true);
    
    // Add transition effect before moving to next page
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 flex items-center justify-center p-4 overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {showFireworks && <Fireworks />}

      <div className="relative w-full max-w-4xl">
        <div className="relative perspective-1000">
          {/* Card Front - Mặt ngoài */}
          <div
            className={`transition-all duration-700 transform preserve-3d ${
              isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 sm:border-8 border-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                {[...Array(20)].map((_, i) => (
                  <Heart
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    size={15 + Math.random() * 25}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px] sm:min-h-[400px]">
                {/* Envelope icon */}
                <div className="mb-4 sm:mb-6 relative">
                  <Gift className="w-24 h-24 sm:w-32 sm:h-32 text-red-500 drop-shadow-2xl float-animation" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 animate-spin" />
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 text-center drop-shadow-lg shimmer px-4">
                  Gửi Đến Bạn
                </h2>

                <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 heart-pulse" />
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 animate-spin" />
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 heart-pulse" />
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-purple-800 mb-6 sm:mb-8 text-center font-semibold px-4">
                  Một lời chúc đặc biệt đang chờ bạn...
                </p>

                <button
                  onClick={handleOpenCard}
                  disabled={isOpen}
                  className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full 
                           text-lg sm:text-xl md:text-2xl font-bold hover:scale-110 active:scale-95
                           transform transition-all duration-300 shadow-2xl glow flex items-center gap-2 sm:gap-3
                           touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  💌 Mở Thiệp
                </button>

                <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-4 flex-wrap justify-center">
                  {['🎈', '🎀', '🎁', '🎀', '🎈'].map((emoji, i) => (
                    <span
                      key={i}
                      className="text-3xl sm:text-4xl animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Inside - Mặt trong */}
          <div
            className={`absolute inset-0 transition-all duration-700 transform ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 sm:border-8 border-white relative overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Decorative background pattern */}
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

                {/* Greeting message */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-8 shadow-lg border-2 border-purple-200">
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center">
                    🌟 <strong>Chúc bạn một tuổi mới tràn đầy niềm vui,</strong> 🌟
                  </p>
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center">
                    💝 <strong>Hạnh phúc và thành công trong cuộc sống!</strong> 💝
                  </p>
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                    ✨ <strong>Mãi mãi tuổi trẻ, luôn rạng rỡ!</strong> ✨
                  </p>
                </div>

                {/* Wishes */}
                {/* <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
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
                </div> */}

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
    </div>
  );
};

export default GreetingCard;