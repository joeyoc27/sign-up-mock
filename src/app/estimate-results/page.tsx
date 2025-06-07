'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import Image from "next/image";
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import ProgressBar from '../components/ProgressBar';

export default function EstimateResults() {
  const { navigateNext } = useFlowNavigation();

  const handleNext = () => {
    navigateNext();
  };

  return (
    <main className="fixed inset-0 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#102147] shadow-sm py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <Image
                src="/vrbo.png"
                alt="VRBO Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>
            <div className="md:hidden">
              <ProgressBar className="mx-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          {/* Left Half - Content */}
          <div className="w-full md:w-1/2 mx-auto px-6 overflow-y-auto">
            <div className="min-h-full md:min-h-0 grid md:block content-between py-4 md:py-12 max-w-xl mx-auto">
              <div className="space-y-4 md:space-y-8">
                {/* Progress Bar */}
                <div className="hidden md:block">
                  <ProgressBar />
                </div>
                
                {/* Content Container */}
                <div className="grid gap-4 md:gap-8 content-center text-center">
                  {/* Earnings Section */}
                  <div className="space-y-2 md:space-y-3">
                    <h2 className="text-gray-800 text-xl md:text-2xl font-medium">
                      You could earn up to
                    </h2>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[#2B6E5B] text-5xl md:text-6xl font-semibold">
                        $14,506
                      </span>
                      <div className="flex items-start mt-2">
                        <InfoCircledIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg md:text-xl">
                      per year
                    </p>
                    <p className="text-gray-600 text-base md:text-lg">
                      We base this on the top 10% of listings like yours
                    </p>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="w-full bg-[#2557A7] text-white text-xl font-semibold py-4 rounded-full hover:bg-[#1e4585] transition-colors"
                  >
                    List your property
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Half - Image */}
          <div className="hidden md:block w-1/2 relative">
            <Image
              src="/house.jpg"
              alt="Beautiful vacation home"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
} 