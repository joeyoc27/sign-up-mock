'use client';

import { useState } from 'react';

export default function PropertyForm() {
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(1);

  const increment = (setter: (value: number) => void, value: number, max: number) => {
    if (value < max) {
      setter(value + 1);
    }
  };

  const decrement = (setter: (value: number) => void, value: number) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handleNext = () => {
    console.log('Form submitted:', { bedrooms, bathrooms });
  };

  return (
    <div className="space-y-6">
      {/* Bedrooms Counter */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-2xl">{bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => decrement(setBedrooms, bedrooms)}
            className="w-10 h-10 rounded-full border-2 border-[#102147] flex items-center justify-center text-[#102147] text-2xl"
            disabled={bedrooms <= 0}
          >
            -
          </button>
          <button 
            onClick={() => increment(setBedrooms, bedrooms, 9)}
            className="w-10 h-10 rounded-full border-2 border-[#102147] flex items-center justify-center text-[#102147] text-2xl"
            disabled={bedrooms >= 9}
          >
            +
          </button>
        </div>
      </div>

      {/* Bathrooms Counter */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-2xl">{bathrooms} {bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => decrement(setBathrooms, bathrooms)}
            className="w-10 h-10 rounded-full border-2 border-[#102147] flex items-center justify-center text-[#102147] text-2xl"
            disabled={bathrooms <= 0}
          >
            -
          </button>
          <button 
            onClick={() => increment(setBathrooms, bathrooms, 9.5)}
            className="w-10 h-10 rounded-full border-2 border-[#102147] flex items-center justify-center text-[#102147] text-2xl"
            disabled={bathrooms >= 9.50}
          >
            +
          </button>
        </div>
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        className="w-full bg-[#2557A7] text-white text-xl font-semibold py-4 rounded-full mt-8 hover:bg-[#1e4585] transition-colors"
      >
        Next
      </button>
    </div>
  );
} 