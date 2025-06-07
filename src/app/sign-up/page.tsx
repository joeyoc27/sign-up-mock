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
          <div className="w-full max-w-xl mx-auto px-6 py-12 overflow-y-auto">
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
} 