'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type FlowType = 'Core' | 'AAP' | 'UPL' | null;

interface FlowContextType {
  activeFlow: FlowType;
  setActiveFlow: (flow: FlowType) => void;
  currentStep: number;
  totalSteps: number;
  resetFlow: () => void;
}

const flowPaths = {
  Core: {
    steps: ['/location', '/lead', '/estimate-results', '/welcome'],
    total: 5
  },
  AAP: {
    steps: ['/location', '/welcome'],
    total: 3
  },
  UPL: {
    steps: ['/location', '/estimate-results', '/email', '/otp', '/welcome'],
    total: 6
  }
};

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [activeFlow, setActiveFlow] = useState<FlowType>('Core');
  const router = useRouter();

  const resetFlow = () => {
    router.push('/');
  };

  const currentStep = 1; // This will be managed by individual pages
  const totalSteps = activeFlow ? flowPaths[activeFlow].total : flowPaths.Core.total;

  return (
    <FlowContext.Provider 
      value={{ 
        activeFlow, 
        setActiveFlow, 
        currentStep,
        totalSteps,
        resetFlow
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
} 