import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const Fireworks = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Tạo particles cho pháo hoa
    const createFirework = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 80,
        color: ['#FF6B9D', '#C44569', '#FFC312', '#00D2FF', '#A29BFE', '#FF3838'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 2
      }));
      
      setParticles(prev => [...prev, ...newParticles]);

      // Xóa particles cũ sau một thời gian
      setTimeout(() => {
        setParticles(prev => prev.slice(30));
      }, 3000);
    };

    // Tạo pháo hoa liên tục
    const interval = setInterval(createFirework, 800);
    createFirework(); // Tạo ngay lập tức

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `firework-burst ${particle.duration}s ease-out forwards`,
            animationDelay: `${particle.delay}s`
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`
            }}
          />
        </div>
      ))}

      {/* Sparkles effect */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '2s'
          }}
        >
          <Sparkles 
            className="text-yellow-300" 
            size={20 + Math.random() * 30}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))'
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes firework-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Fireworks;