'use client';

import Image from "next/image";
import SignUpForm from '../components/SignUpForm';
import ProgressBar from '../components/ProgressBar';

export default function SignUp() {
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
              <ProgressBar currentStep={1} totalSteps={3} className="mx-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className="flex w-full max-w-[1400px]">
            {/* Left Section - Form */}
            <div className="w-full md:w-1/2 px-4 md:px-12 py-6 md:py-12 overflow-y-auto">
              <div className="max-w-md mx-auto">
                <SignUpForm />
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="hidden md:block w-1/2 relative overflow-hidden px-12">
              {/* Add your image content here */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 