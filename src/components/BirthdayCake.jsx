import React, { useState, useEffect } from 'react';
import { Cake, Wind, PartyPopper } from 'lucide-react';

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  useEffect(() => {
    // Tạo confetti
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: ['#FF6B9D', '#C44569', '#FFC312', '#00D2FF', '#A29BFE', '#FF3838'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360
    }));
    setConfetti(newConfetti);
  }, []);

  const handleBlowCandles = () => {
    if (isBlowing || !candlesLit) return;
    
    setIsBlowing(true);
    setCandlesLit(false);
    setShowMessage(true);
    
    // Hiệu ứng confetti mới khi thổi nến
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: confetti.length + i,
      left: 50,
      delay: 0,
      duration: 2 + Math.random() * 2,
      color: ['#FF6B9D', '#C44569', '#FFC312', '#00D2FF', '#A29BFE'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360
    }));
    setConfetti(prev => [...prev, ...newConfetti]);
    
    setTimeout(() => setIsBlowing(false), 1000);
  };

  const handleLightCandles = () => {
    if (isBlowing || candlesLit) return;
    
    setCandlesLit(true);
    setShowMessage(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center overflow-hidden">
      {/* Confetti */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute confetti"
          style={{
            left: `${item.left}%`,
            top: '-20px',
            width: '8px',
            height: '8px',
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            transform: `rotate(${item.rotation}deg)`,
            boxShadow: `0 0 10px ${item.color}`
          }}
        />
      ))}

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <PartyPopper 
              className="text-yellow-300/30" 
              size={15 + Math.random() * 20}
            />
          </div>
        ))}
      </div>

      <div className="text-center z-10 px-4 max-w-2xl mx-auto">
        {/* Cake */}
        <div className="relative inline-block mb-6 sm:mb-8">
          {/* Cake base */}
          <div className="relative">
            <Cake className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 text-pink-300 drop-shadow-2xl float-animation" />
            
            {/* 3D Candles with modern design */}
            <div className="absolute top-6 sm:top-8 md:top-12 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-8 md:gap-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative" style={{ perspective: '1000px' }}>
                  {/* 3D Candle body with gradient and shadow */}
                  <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Main candle */}
                    <div className="relative w-3 h-12 sm:w-4 sm:h-16 md:w-5 md:h-20 bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 rounded-lg shadow-2xl"
                      style={{
                        boxShadow: `
                          inset -2px -2px 8px rgba(0, 0, 0, 0.3),
                          inset 2px 2px 8px rgba(255, 255, 255, 0.3),
                          0 8px 16px rgba(0, 0, 0, 0.4)
                        `
                      }}
                    >
                      {/* Candle shine effect */}
                      <div className="absolute top-2 left-1 w-1 h-6 sm:h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-sm"></div>
                      
                      {/* Candle top */}
                      <div className="absolute -top-1 left-0 w-full h-2 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-t-lg shadow-md"></div>
                      
                      {/* Wax drip effect when lit */}
                      {candlesLit && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-blue-300 to-transparent opacity-70 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* 3D Realistic Flame */}
                  {candlesLit && (
                    <div className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 transform -translate-x-1/2">
                      <div className="relative" style={{ filter: 'blur(0.5px)' }}>
                        {/* Outer glow */}
                        <div className="absolute inset-0 w-8 h-12 sm:w-10 sm:h-14 bg-gradient-radial from-orange-400/50 to-transparent rounded-full blur-xl animate-pulse"></div>
                        
                        {/* Main flame */}
                        <div className="relative w-5 h-9 sm:w-6 sm:h-11 md:w-7 md:h-12"
                          style={{
                            background: 'linear-gradient(to top, #FF6B00 0%, #FF8C00 25%, #FFD700 50%, #FFEB3B 75%, #FFF59D 100%)',
                            clipPath: 'polygon(50% 0%, 20% 40%, 25% 70%, 30% 85%, 50% 100%, 70% 85%, 75% 70%, 80% 40%)',
                            animation: 'flame-flicker 0.3s ease-in-out infinite alternate',
                            transformOrigin: 'bottom center',
                            filter: 'drop-shadow(0 0 12px rgba(255, 165, 0, 0.9))'
                          }}
                        >
                          {/* Inner bright core */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-4 sm:w-3 sm:h-5 bg-gradient-to-t from-yellow-200 to-white rounded-full opacity-90"></div>
                          
                          {/* Flame highlights */}
                          <div className="absolute top-2 left-1 w-1 h-3 bg-white/40 rounded-full blur-sm"></div>
                        </div>
                        
                        {/* Heat wave effect */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-transparent via-orange-200/20 to-transparent rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Smoke effect when blown out */}
                  {!candlesLit && isBlowing && (
                    <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2">
                      <div className="smoke-particle"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cake decorations */}
            <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
              {['🍓', '🍒', '🍓'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-2xl sm:text-3xl md:text-4xl animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Birthday message với Rainbow effect */}
        <h2 className="text-2xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight px-2 rainbow-text">
          🎉 HAPPY 🎉 BIRTHDAY! 
          <br />
          Điệp Anh
        </h2>

        {/* Wish message */}
        {showMessage && (
          <div className="mb-4 sm:mb-6 animate-bounce bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 inline-block">
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
              😘 Ước gì cũng thành hiện thực! 🫣
            </p>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center items-center mt-6 sm:mt-8">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full 
                       text-lg sm:text-xl md:text-2xl font-bold hover:scale-110 active:scale-95
                       transform transition-all duration-300 shadow-2xl glow 
                       flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center max-w-md
                       touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Wind size={24} className="sm:w-7 sm:h-7" />
              Ước Và Thổi Nến Nào!!
            </button>
          ) : (
            <button 
              onClick={handleLightCandles}
              disabled={isBlowing}
              className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full 
                       text-lg sm:text-xl md:text-2xl font-bold hover:scale-110 active:scale-95
                       transform transition-all duration-300 shadow-2xl glow 
                       flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center max-w-md
                       touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              🔥 Thắp Lại Nến
            </button>
          )}
        </div>

        {/* Decorative emojis */}
        <div className="mt-6 sm:mt-10 flex justify-center gap-3 sm:gap-6 flex-wrap">
          {['🎈', '🎊', '🎁', '🎉', '🎀', '🎈', '🎊'].map((emoji, i) => (
            <span
              key={i}
              className="text-3xl sm:text-4xl md:text-5xl animate-bounce"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                animationDuration: '2s'
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Fun message */}
        <div className="mt-6 sm:mt-8">
          <p className="text-white/80 text-base sm:text-lg md:text-xl italic px-4">
            "Tuổi mới hạnh phúc, tràn đầy yêu thương!" 💖
          </p>
        </div>
      </div>

      {/* Custom CSS for flame animation */}
      <style jsx>{`
        @keyframes flame-flicker {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          25% {
            transform: scaleY(1.05) scaleX(0.95);
          }
          50% {
            transform: scaleY(0.95) scaleX(1.05);
          }
          75% {
            transform: scaleY(1.02) scaleX(0.98);
          }
        }

        .smoke-particle {
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(150, 150, 150, 0.5) 0%, transparent 70%);
          border-radius: 50%;
          animation: smoke-rise 2s ease-out forwards;
        }

        @keyframes smoke-rise {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50px) scale(2);
            opacity: 0;
          }
        }

        .confetti {
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .rainbow-text {
          background: linear-gradient(90deg, #FF6B9D, #FFC312, #00D2FF, #A29BFE, #FF3838, #FFD700);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: rainbow-flow 3s linear infinite;
        }

        @keyframes rainbow-flow {
          to {
            background-position: 200% center;
          }
        }

        .glow {
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3);
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default BirthdayCake;