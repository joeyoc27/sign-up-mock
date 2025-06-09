'use client';

import { useFlow } from '../context/FlowContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

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

export function useFlowNavigation() {
  const { activeFlow } = useFlow();
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentStep = () => {
    // Default to Core flow if none selected
    const currentFlow = activeFlow || 'Core';
    const path = pathname === '/' ? '' : pathname;
    return flowPaths[currentFlow].steps.findIndex(p => p === path) + 1;
  };

  const getNextPath = () => {
    // Default to Core flow if none selected
    const currentFlow = activeFlow || 'Core';
    const currentPath = pathname === '/' ? '' : pathname;
    const currentPathIndex = flowPaths[currentFlow].steps.findIndex(p => p === currentPath);
    
    if (currentPathIndex === -1) {
      // If not in flow path, start from beginning
      return flowPaths[currentFlow].steps[0];
    }

    const nextPathIndex = currentPathIndex + 1;
    if (nextPathIndex >= flowPaths[currentFlow].steps.length) {
      // End of flow
      return null;
    }

    return flowPaths[currentFlow].steps[nextPathIndex];
  };

  const navigateNext = () => {
    const nextPath = getNextPath();
    if (nextPath) {
      router.push(nextPath);
    }
  };

  return {
    navigateNext,
    getCurrentStep,
    getNextPath
  };
} 