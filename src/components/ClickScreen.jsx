import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const ClickScreen = ({ onNext }) => {
  const [stars, setStars] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

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
  }, []);

  const handleClick = () => {
    if (isOpening) return;
    
    setIsOpening(true);

    // Tạo confetti khi mở hộp
    const confetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      angle: (Math.random() * 360),
      distance: 100 + Math.random() * 200,
      color: ['#FF6B9D', '#FFC312', '#00D2FF', '#A29BFE', '#FF3838', '#FFD700'][Math.floor(Math.random() * 6)],
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.3
    }));
    setConfettiPieces(confetti);

    // Animation sequence
    setTimeout(() => {
      setIsExploded(true);
    }, 600);

    setTimeout(() => {
      onNext();
    }, 1800);
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

      {/* Confetti explosion */}
      {isOpening && confettiPieces.map((piece) => (
        <div
          key={`confetti-${piece.id}`}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `translate(-50%, -50%)`,
            animation: `explode-${piece.id} 1.5s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
            boxShadow: `0 0 10px ${piece.color}`
          }}
        />
      ))}

      {/* Main Gift Box */}
      <div 
        onClick={handleClick}
        className={`relative z-10 cursor-pointer ${isOpening ? 'pointer-events-none' : ''}`}
      >
        <div className={`relative transform-gpu transition-all duration-500 ${isExploded ? 'opacity-0 scale-150' : ''}`}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
          
          {/* Gift Box Container */}
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[450px]" style={{ perspective: '1000px' }}>
            
            {/* Box Lid - Flies up when opening */}
            <div 
              className={`absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 w-72 sm:w-88 md:w-[420px] h-12 sm:h-16 bg-gradient-to-br from-red-300 via-red-400 to-red-500 rounded-t-2xl shadow-xl transition-all duration-700 ${
                isOpening ? '-translate-y-96 rotate-45 opacity-0' : ''
              }`}
              style={{
                transformOrigin: 'bottom center',
                boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3), inset 0 -5px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"></div>
            </div>

            {/* Bow - Flies up with lid */}
            <div className={`absolute -top-20 sm:-top-28 md:-top-32 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
              isOpening ? '-translate-y-96 rotate-90 opacity-0' : ''
            }`}>
              {/* Center of bow */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full"></div>
              </div>

              {/* Bow loops */}
              <div className="absolute top-1/2 -left-16 sm:-left-20 md:-left-24 transform -translate-y-1/2 w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl"
                style={{ clipPath: 'ellipse(45% 50% at 40% 50%)', transform: 'translateY(-50%) rotate(-15deg)' }}
              ></div>
              <div className="absolute top-1/2 -right-16 sm:-right-20 md:-right-24 transform -translate-y-1/2 w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl"
                style={{ clipPath: 'ellipse(45% 50% at 60% 50%)', transform: 'translateY(-50%) rotate(15deg)' }}
              ></div>

              {/* Ribbons */}
              <div className="absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                <div className="w-3 sm:w-4 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-b-full shadow-lg transform rotate-12"></div>
                <div className="w-3 sm:w-4 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-b-full shadow-lg transform -rotate-12"></div>
              </div>
            </div>

            {/* Box Body - Splits apart when opening */}
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
                {/* Vertical ribbon left */}
                <div className="absolute top-0 right-0 w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                  style={{ boxShadow: 'inset -2px 0 10px rgba(0, 0, 0, 0.2)' }}
                ></div>
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
                {/* Vertical ribbon right */}
                <div className="absolute top-0 left-0 w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"
                  style={{ boxShadow: 'inset 2px 0 10px rgba(0, 0, 0, 0.2)' }}
                ></div>
              </div>

              {/* Horizontal ribbon */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-16 sm:h-20 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg pointer-events-none"
                style={{ boxShadow: 'inset 0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.3)' }}
              >
                <div className="absolute top-2 left-0 w-full h-2 bg-white/30 blur-sm"></div>
              </div>
            </div>

            {/* Surprise content inside - appears when opening */}
            {isOpening && (
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <div className="text-8xl sm:text-9xl animate-bounce">🎉</div>
              </div>
            )}
          </div>

          {/* Sparkles around box */}
          {!isOpening && [...Array(12)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-ping"
              style={{
                left: `${50 + Math.cos((i * 360) / 12 * Math.PI / 180) * 60}%`,
                top: `${50 + Math.sin((i * 360) / 12 * Math.PI / 180) * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <Sparkles className="text-yellow-300" size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic keyframes for confetti */}
      <style jsx>{`
        ${confettiPieces.map((piece) => `
          @keyframes explode-${piece.id} {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${Math.cos(piece.angle * Math.PI / 180) * piece.distance}px),
                calc(-50% + ${Math.sin(piece.angle * Math.PI / 180) * piece.distance}px)
              ) rotate(${piece.rotation}deg);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default ClickScreen;