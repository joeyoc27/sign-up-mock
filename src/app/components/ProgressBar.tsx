import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({ currentStep, totalSteps, className = '' }: ProgressBarProps) {
  return (
    <div className={`md:mb-8 ${className}`}>
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%`, backgroundColor: '#6E997B' }}
        />
      </div>
    </div>
  );
} 