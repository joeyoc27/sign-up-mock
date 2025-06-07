'use client';

import React from 'react';
import { useFlow } from '../context/FlowContext';
import { useFlowNavigation } from '../hooks/useFlowNavigation';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className = '' }: ProgressBarProps) {
  const { totalSteps } = useFlow();
  const { getCurrentStep } = useFlowNavigation();
  const currentStep = getCurrentStep();

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