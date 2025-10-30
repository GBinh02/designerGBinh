import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Smile, ChevronRight } from 'lucide-react';
import Fireworks from './Fireworks';

const GreetingCard = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Tạo particles cho parallax
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      speed: 0.5 + Math.random() * 1.5
    }));
    setParticles(newParticles);
  }, []);

  // Parallax effect
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenLetter = (e) => {
    e.stopPropagation();
    if (isOpen) return;
    setIsOpen(true);
    setShowFireworks(true);
    setTimeout(() => setShowText(true), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 flex items-start justify-center pt-8 sm:pt-12 md:pt-16 p-4 overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {showFireworks && <Fireworks />}

      {/* Parallax particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(${mousePosition.x * particle.speed}px, ${mousePosition.y * particle.speed}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      ))}

      <div className="relative w-full max-w-4xl">
        {/* Envelope - Front */}
        <div 
          className={`relative transition-all duration-1000 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
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
                    className="absolute animate-pulse"
                    style={{
                      left: `${(i % 6) * 16}%`,
                      top: `${Math.floor(i / 6) * 20}%`,
                      transform: `rotate(${Math.random() * 30 - 15}deg)`,
                      animationDelay: `${i * 0.1}s`
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

              {/* Wax seal - CẢI THIỆN KHU VỰC CLICK */}
              <div 
                className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={handleOpenLetter}
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-xl flex items-center justify-center hover:scale-125 active:scale-110 transition-all duration-300 animate-pulse-glow"
                  style={{
                    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.7), inset 0 -3px 10px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <Heart className="text-white w-12 h-12 sm:w-14 sm:h-14 animate-pulse" />
                </div>
                
                {/* Glow rings */}
                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-60 animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 bg-red-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              </div>

              {/* Letter content peek */}
              <div className="relative z-0 mt-16 sm:mt-20">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 sm:p-8 text-center">
                  <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 animate-rainbow-text">
                    Gửi đến em!
                  </h3>
                  <p className="text-base sm:text-lg text-purple-600">
                    💌
                  </p>
                </div>
              </div>

              {/* Click hint - ĐỘ ĐỘNG HƠN */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
                <div className="inline-block bg-white/80 px-6 py-3 rounded-full shadow-lg">
                  <p className="text-purple-600 font-bold animate-bounce text-sm sm:text-base">
                    Mở Dấu Sáp ở Trên Ra Nhé 💖
                  </p>
                </div>
              </div>
            </div>

            {/* Floating sparkles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-sparkle"
                style={{
                  left: `${15 + (i % 4) * 23}%`,
                  top: `${i < 6 ? -8 : 108}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '3s'
                }}
              >
                <Sparkles className="text-yellow-300" size={20 + Math.random() * 10} />
              </div>
            ))}
          </div>
        </div>

        {/* Letter content - Inside */}
        <div className={`absolute inset-0 transition-all duration-1000 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 sm:border-8 border-white relative overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Parallax decorative background */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `translate(${mousePosition.x * (i % 3)}px, ${mousePosition.y * (i % 3)}px)`,
                    transition: 'transform 0.5s ease-out'
                  }}
                >
                  <Star className="animate-pulse" size={15 + Math.random() * 20} />
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

              {/* Main title with rainbow effect */}
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-center mb-4 sm:mb-8 px-2">
                <span className="block animate-rainbow-text">🎂 Chúc Em 🎂</span>
                <span className="block animate-rainbow-text">Sinh Nhật Vui Vẻ! </span>
              </h2>

              {/* Letter greeting */}
              <div className="bg-white/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg border-2 border-purple-200">
                <p className="text-base sm:text-lg md:text-xl text-gray-600 italic mb-4 text-center">
                  Dear Honey,
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center font-semibold">
                    {showText ? (
                      'Chặng đường phía trước còn xa lắm nên mong em hãy là cô gái mạnh mẽ và nhiệt huyết lên em nhé! Hôm nay em là bông hoa   xinh đẹp rạng rỡ nhất. Chúc em tuổi mới vui vẻ!! Anh đã gom hết mọi điều tốt đẹp gửi đến em đây. Happyy Birthday Honey '.split('').map((char, index) => (
                        <span
                          key={index}
                          style={{
                            animation: 'fadeInUp 0.6s ease-out forwards',
                            animationDelay: `${index * 0.05}s`,
                            opacity: 0,
                            display: 'inline-block'
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))
                    ) : null}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-gray-600 italic mt-6 text-right">
                  {showText ? (
                    'Yêu em'.split('').map((char, index) => (
                      <span
                        key={index}
                        style={{
                          animation: 'fadeInUp 0.6s ease-out forwards',
                          animationDelay: `${(index + 65) * 0.05}s`,
                          opacity: 0,
                          display: 'inline-block'
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))
                  ) : null}
                </p>
              </div>

              {/* Wishes */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                {[
                  // { icon: '🎯', text: 'Thành Công' },
                  // { icon: '❤️', text: 'Hạnh Phúc' },
                  // { icon: '🌈', text: 'May Mắn' }
                ].map((wish, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center transform hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{wish.icon}</div>
                    <p className="text-sm sm:text-lg font-bold text-purple-700">{wish.text}</p>
                  </div>
                ))}
              </div>

              {/* Emojis decoration */}
              <div className="text-center mb-4 sm:mb-8">
                <p className="text-3xl sm:text-5xl">🎈 🎉 🎊 🎀 🎈</p>
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

              {/* Footer */}
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

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-float-sparkle {
          animation: float-sparkle ease-in-out infinite;
        }

        @keyframes rainbow-text {
          0% { color: #FF6B9D; }
          14% { color: #FFC312; }
          28% { color: #00D2FF; }
          42% { color: #A29BFE; }
          57% { color: #FF3838; }
          71% { color: #FFD700; }
          85% { color: #FF69B4; }
          100% { color: #FF6B9D; }
        }

        .animate-rainbow-text {
          animation: rainbow-text 5s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(220, 38, 38, 0.7), inset 0 -3px 10px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 15px 50px rgba(220, 38, 38, 1), 0 0 40px rgba(220, 38, 38, 0.8), inset 0 -3px 10px rgba(0, 0, 0, 0.4);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glow {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4);
        }
      `}</style>
    </div>
  );
};

export default GreetingCard;