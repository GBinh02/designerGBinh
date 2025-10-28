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