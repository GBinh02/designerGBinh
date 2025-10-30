import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Tạo audio context cho nhạc sinh nhật
    audioRef.current = new Audio();
    // Sử dụng nhạc Happy Birthday từ CDN
    audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        {isPlaying ? (
          <div className="flex gap-1">
            <div className="w-1 h-5 bg-purple-600 rounded-full animate-pulse"></div>
            <div className="w-1 h-5 bg-pink-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-5 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
        )}
      </button>

      {/* Mute button */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in"
        >
          {isMuted ? (
            <VolumeX className="text-gray-400" size={24} />
          ) : (
            <Volume2 className="text-purple-600" size={24} />
          )}
        </button>
      )}

      {/* Music note animation */}
      {isPlaying && !isMuted && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <span className="text-2xl">🎵</span>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;