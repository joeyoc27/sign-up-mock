import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%`, backgroundColor: '#6E997B' }}
        />
      </div>
    </div>
  );
} 