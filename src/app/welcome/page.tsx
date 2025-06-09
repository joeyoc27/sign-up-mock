'use client';

import Image from "next/image";
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import { useFlow } from '../context/FlowContext';

export default function Welcome() {
  const { getNextPath } = useFlowNavigation();
  const { totalSteps } = useFlow();

  // getNextPath() will return null since welcome is the last step
  const isLastStep = getNextPath() === null;

  return (
    <main className="fixed inset-0 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-start">
            <Image
              src="/vrbo.png"
              alt="VRBO Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className="w-full max-w-3xl mx-auto px-6 py-12 overflow-y-auto">
            <div className="space-y-8">
              <h1 className="text-3xl font-medium text-[#1f1f2d]">
                Let's create your listing together
              </h1>

              <p className="text-lg text-gray-600">
                We'll help you attract ideal travelers and build your business. There's a world of travelers
                looking for a place just like yours, so let's get started.
              </p>

              <div className="space-y-6">
                <h2 className="text-xl font-medium text-[#1f1f2d]">
                  Here's an overview of what we're about to do
                </h2>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-lg">•</span>
                    <span className="text-lg text-gray-600">First you'll add photos, amenities, and a description of your place</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg">•</span>
                    <span className="text-lg text-gray-600">Next, you'll set up your calendar and nightly rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-lg">•</span>
                    <span className="text-lg text-gray-600">Finally, you'll finish with taxes and regulatory stuff-you know, taking care of business</span>
                  </li>
                </ul>

                <p className="text-lg text-gray-600 pt-4">
                  We'll save your work along the way, so take a break whenever you need to.
                </p>
              </div>

              <div className="pt-6">
                <button
                  disabled={isLastStep}
                  className={`inline-block rounded-full py-3 px-8 text-lg font-medium text-white ${
                    isLastStep 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#2557a7] hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 