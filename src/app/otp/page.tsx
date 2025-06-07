'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import { useFlow } from '../context/FlowContext';
import ProgressBar from '../components/ProgressBar';

export default function OTP() {
  const { navigateNext, getCurrentStep } = useFlowNavigation();
  const { totalSteps } = useFlow();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateNext();
  };

  const handleResendCode = () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      // Add logic to resend code
    }
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
              <ProgressBar className="mx-4" currentStep={getCurrentStep()} totalSteps={totalSteps} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className="w-full max-w-xl mx-auto px-6 py-12 overflow-y-auto">
            <div className="hidden md:block mb-8">
              <ProgressBar currentStep={getCurrentStep()} totalSteps={totalSteps} />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-medium mb-4">Enter verification code</h1>
                <p className="text-lg text-gray-600">
                  We've sent a 6-digit code to your email address. Enter it below to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="code" 
                    className="block text-lg font-medium text-gray-700"
                  >
                    6-digit code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      maxLength={6}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter verification code"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#2557a7] py-3 px-4 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
                >
                  Verify and continue
                </button>
              </form>

              <div className="space-y-3 text-center">
                <p className="text-sm text-gray-600">
                  Check your spam folder if you don't see the email
                </p>
                <button 
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`text-sm font-medium ${
                    canResend 
                      ? 'text-[#2557a7] hover:text-[#1e4b8f] cursor-pointer' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canResend ? 'Resend code' : `Resend code in ${countdown}s`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 