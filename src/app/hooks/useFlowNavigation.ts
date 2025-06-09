'use client';

import { useFlow } from '../context/FlowContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const flowPaths = {
  Core: ['/location', '/lead', '/estimate-results', '/welcome'],
  AAP: ['/location', '/welcome'],
  UPL: ['/location', '/estimate-results', '/email', '/otp', '/welcome']
};

export function useFlowNavigation() {
  const { activeFlow } = useFlow();
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentStep = () => {
    if (!activeFlow) return 1;
    const path = pathname === '/' ? '' : pathname;
    return flowPaths[activeFlow].findIndex(p => p === path) + 1;
  };

  const getNextPath = () => {
    if (!activeFlow) {
      // Default flow if none selected
      return '/location';
    }

    const currentPath = pathname === '/' ? '' : pathname;
    const currentPathIndex = flowPaths[activeFlow].findIndex(p => p === currentPath);
    
    if (currentPathIndex === -1) {
      // If not in flow path, start from beginning
      return flowPaths[activeFlow][0];
    }

    const nextPathIndex = currentPathIndex + 1;
    if (nextPathIndex >= flowPaths[activeFlow].length) {
      // End of flow
      return null;
    }

    return flowPaths[activeFlow][nextPathIndex];
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