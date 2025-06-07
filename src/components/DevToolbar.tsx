'use client';

import { useFlow } from '@/app/context/FlowContext';

const DevToolbar = () => {
  const { activeFlow, setActiveFlow, resetFlow } = useFlow();

  const handleFlowChange = (flowType: 'Core' | 'AAP' | 'UPL') => {
    if (activeFlow === flowType) {
      setActiveFlow(null);
    } else {
      setActiveFlow(flowType);
      resetFlow(); // This will redirect to the start
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 hidden md:flex">
      <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex gap-2 shadow-lg border border-white/10">
        {['Core', 'AAP', 'UPL'].map((button) => (
          <button
            key={button}
            onClick={() => handleFlowChange(button as 'Core' | 'AAP' | 'UPL')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              activeFlow === button
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DevToolbar; 