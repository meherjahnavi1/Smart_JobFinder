import React from 'react';
import Lottie from 'lottie-react';
import waveformAnimation from '../assets/waveform.json';

const WaveformLottie = () => {
  return (
    <div className="max-w-[300px] mx-auto mt-4">
      <Lottie animationData={waveformAnimation} loop={true} autoplay />
    </div>
  );
};

export default WaveformLottie;
