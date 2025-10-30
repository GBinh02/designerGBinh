import React, { useState } from 'react';
import ClickScreen from '../components/ClickScreen';
import PhotoGallery from '../components/PhotoGallery';
import GreetingCard from '../components/GreetingCard';
import BirthdayCake from '../components/BirthdayCake';

const HomePage = () => {
  const [currentStage, setCurrentStage] = useState('click'); // click, photos, card, cake

  const handleNext = () => {
    const stages = ['click', 'photos', 'card', 'cake'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  const handleReset = () => {
    setCurrentStage('click');
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentStage === 'click' && <ClickScreen onNext={handleNext} />}
      {currentStage === 'photos' && <PhotoGallery onNext={handleNext} />}
      {currentStage === 'card' && <GreetingCard onNext={handleNext} />}
      {currentStage === 'cake' && <BirthdayCake onReset={handleReset} />}
    </div>
  );
};

export default HomePage;
// import React, { useState, useEffect } from 'react';
// import ClickScreen from '../components/ClickScreen';
// import PhotoGallery from '../components/PhotoGallery';
// import GreetingCard from '../components/GreetingCard';
// import BirthdayCake from '../components/BirthdayCake';
// import BackgroundMusic from '../components/BackgroundMusic';

// const HomePage = () => {
//   const [currentStage, setCurrentStage] = useState('click'); // click, photos, card, cake
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [complexParticles, setComplexParticles] = useState([]);

//   // Parallax mouse tracking
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Complex particles effect
//   useEffect(() => {
//     const particles = Array.from({ length: 30 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 6 + 2,
//       duration: Math.random() * 10 + 5,
//       delay: Math.random() * 5,
//       color: ['rgba(255, 107, 157, 0.3)', 'rgba(255, 195, 18, 0.3)', 'rgba(0, 210, 255, 0.3)', 'rgba(162, 155, 254, 0.3)'][Math.floor(Math.random() * 4)]
//     }));
//     setComplexParticles(particles);
//   }, [currentStage]);

//   const handleNext = () => {
//     const stages = ['click', 'photos', 'card', 'cake'];
//     const currentIndex = stages.indexOf(currentStage);
//     if (currentIndex < stages.length - 1) {
//       setCurrentStage(stages[currentIndex + 1]);
//     }
//   };

//   const handleReset = () => {
//     setCurrentStage('click');
//   };

//   return (
//     <div className="w-full h-screen overflow-hidden relative">
//       {/* Complex Particles Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         {complexParticles.map((particle) => (
//           <div
//             key={`particle-${particle.id}`}
//             className="absolute rounded-full opacity-60"
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               backgroundColor: particle.color,
//               animation: `float-complex ${particle.duration}s ease-in-out infinite`,
//               animationDelay: `${particle.delay}s`,
//               filter: 'blur(2px)',
//               boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
//             }}
//           />
//         ))}
//       </div>

//       {/* Parallax layers */}
//       <div 
//         className="fixed inset-0 pointer-events-none transition-transform duration-300 ease-out"
//         style={{
//           transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
//         }}
//       >
//         {/* Stage content */}
//         <div className="relative w-full h-full">
//           {currentStage === 'click' && <ClickScreen onNext={handleNext} />}
//           {currentStage === 'photos' && <PhotoGallery onNext={handleNext} />}
//           {currentStage === 'card' && <GreetingCard onNext={handleNext} />}
//           {currentStage === 'cake' && <BirthdayCake onReset={handleReset} />}
//         </div>
//       </div>

//       {/* Global styles */}
//       <style jsx>{`
//         @keyframes float-complex {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//           }
//           25% {
//             transform: translate(20px, -30px) scale(1.2);
//           }
//           50% {
//             transform: translate(-20px, -60px) scale(0.8);
//           }
//           75% {
//             transform: translate(30px, -30px) scale(1.1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;