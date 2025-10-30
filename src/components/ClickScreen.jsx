import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const ClickScreen = ({ onNext }) => {
  const [stars, setStars] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [floatingParticles, setFloatingParticles] = useState([]);

  useEffect(() => {
    // Tạo ngôi sao
    const newStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 25 + 15,
      duration: 2 + Math.random() * 2
    }));
    setStars(newStars);

    // Tạo floating particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 3 + Math.random() * 5
    }));
    setFloatingParticles(particles);
  }, []);

  const handleClick = () => {
    if (isOpening) return;
    
    setIsOpening(true);

    // Tạo confetti khi mở hộp
    const confetti = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      angle: (Math.random() * 360),
      distance: 150 + Math.random() * 250,
      color: ['#FF6B9D', '#FFC312', '#00D2FF', '#A29BFE', '#FF3838', '#FFD700', '#FF69B4', '#00FF00'][Math.floor(Math.random() * 8)],
      size: 8 + Math.random() * 15,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.2
    }));
    setConfettiPieces(confetti);

    setTimeout(() => {
      setIsExploded(true);
    }, 600);

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
      {/* Animated stars background */}
      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className="absolute animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        >
          <Sparkles 
            className="text-yellow-300/40" 
            size={star.size}
          />
        </div>
      ))}

      {/* Floating particles */}
      {floatingParticles.map(particle => (
        <div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-white/30 animate-float-up"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Confetti explosion */}
      {isOpening && confettiPieces.map((piece) => (
        <div
          key={`confetti-${piece.id}`}
          className="absolute rounded-sm"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `translate(-50%, -50%)`,
            animation: `explode-${piece.id} 2s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
            boxShadow: `0 0 15px ${piece.color}`
          }}
        />
      ))}

      {/* Main Gift Box */}
      <div 
        onClick={handleClick}
        className={`relative z-10 cursor-pointer group ${isOpening ? 'pointer-events-none' : ''}`}
      >
        <div className={`relative transform-gpu transition-all duration-500 hover:scale-110 ${isExploded ? 'opacity-0 scale-150' : ''} ${!isOpening ? 'animate-gentle-bounce' : ''}`}>
          {/* Glow effect pulsing */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-3xl blur-3xl opacity-60 animate-pulse-slow"></div>
          
          {/* Gift Box Container - VUÔNG ĐỀU */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px]" style={{ perspective: '1000px' }}>
            
            {/* Box Lid - Flies up */}
            <div 
              className={`absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 w-[340px] sm:w-[410px] md:w-[480px] h-16 sm:h-20 bg-gradient-to-br from-red-300 via-red-400 to-red-500 rounded-t-2xl shadow-xl transition-all duration-700 ${
                isOpening ? '-translate-y-96 rotate-45 opacity-0' : ''
              }`}
              style={{
                transformOrigin: 'bottom center',
                boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3), inset 0 -5px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"></div>
            </div>

            {/* Bow - Flies up */}
            <div className={`absolute -top-28 sm:-top-36 md:-top-40 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
              isOpening ? '-translate-y-96 rotate-90 opacity-0' : ''
            }`}>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center animate-pulse-glow"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full"></div>
              </div>

              {/* Bow loops */}
              <div className="absolute top-1/2 -left-20 sm:-left-24 md:-left-28 transform -translate-y-1/2 w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl"
                style={{ clipPath: 'ellipse(45% 50% at 40% 50%)', transform: 'translateY(-50%) rotate(-15deg)' }}
              ></div>
              <div className="absolute top-1/2 -right-20 sm:-right-24 md:-right-28 transform -translate-y-1/2 w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl"
                style={{ clipPath: 'ellipse(45% 50% at 60% 50%)', transform: 'translateY(-50%) rotate(15deg)' }}
              ></div>

              {/* Ribbons */}
              <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 flex gap-4">
                <div className="w-4 sm:w-5 h-20 sm:h-24 md:h-28 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-b-full shadow-lg transform rotate-12"></div>
                <div className="w-4 sm:w-5 h-20 sm:h-24 md:h-28 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-b-full shadow-lg transform -rotate-12"></div>
              </div>
            </div>

            {/* Box Body - Splits */}
            <div className="absolute inset-0">
              {/* Left side */}
              <div className={`absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-red-400 via-red-500 to-red-600 transition-all duration-700 ${
                isOpening ? '-translate-x-full -rotate-45 opacity-0' : ''
              }`}
                style={{
                  boxShadow: 'inset -10px -10px 30px rgba(0, 0, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
                  borderRadius: '1rem 0 0 1rem'
                }}
              >
                <div className="absolute top-0 right-0 w-10 sm:w-12 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                  style={{ boxShadow: 'inset -2px 0 10px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="absolute top-2 left-2 w-2 h-full bg-white/30 blur-sm"></div>
                </div>
              </div>

              {/* Right side */}
              <div className={`absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-red-400 via-red-500 to-red-600 transition-all duration-700 ${
                isOpening ? 'translate-x-full rotate-45 opacity-0' : ''
              }`}
                style={{
                  boxShadow: 'inset 10px -10px 30px rgba(0, 0, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5)',
                  borderRadius: '0 1rem 1rem 0'
                }}
              >
                <div className="absolute top-0 left-0 w-10 sm:w-12 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                  style={{ boxShadow: 'inset 2px 0 10px rgba(0, 0, 0, 0.2)' }}
                >
                  <div className="absolute top-2 right-2 w-2 h-full bg-white/30 blur-sm"></div>
                </div>
              </div>

              {/* Horizontal ribbon */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-20 sm:h-24 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg pointer-events-none"
                style={{ boxShadow: 'inset 0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)' }}
              >
                <div className="absolute top-3 left-0 w-full h-3 bg-white/30 blur-sm"></div>
              </div>

              {/* Pattern dots */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-white/15 rounded-full"
                    style={{
                      left: `${(i % 5) * 20 + 10}%`,
                      top: `${Math.floor(i / 5) * 20 + 10}%`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Surprise inside */}
            {isOpening && (
              <div className="absolute inset-0 flex items-center justify-center animate-bounce-in">
                <div className="text-9xl animate-rainbow">🎉</div>
              </div>
            )}
          </div>

          {/* Sparkles xoay quanh - 12 ngôi sao */}
          {!isOpening && [...Array(12)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${50 + Math.cos((i * 360) / 12 * Math.PI / 180) * 65}%`,
                top: `${50 + Math.sin((i * 360) / 12 * Math.PI / 180) * 65}%`,
                animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.15}s`
              }}
            >
              <Sparkles className="text-yellow-300" size={24} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float-up {
          animation: float-up linear infinite;
        }

        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.02);
          }
        }

        .animate-gentle-bounce {
          animation: gentle-bounce 3s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.5);
          }
          50% {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.8);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        .animate-rainbow {
          animation: rainbow 3s linear infinite;
        }

        ${confettiPieces.map((piece) => `
          @keyframes explode-${piece.id} {
            0% {
              transform: translate(-50%, -50%) rotate(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${Math.cos(piece.angle * Math.PI / 180) * piece.distance}px),
                calc(-50% + ${Math.sin(piece.angle * Math.PI / 180) * piece.distance}px)
              ) rotate(${piece.rotation}deg) scale(0.5);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default ClickScreen;