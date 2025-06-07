'use client';

import Image from "next/image";
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import ProgressBar from '../components/ProgressBar';

export default function Email() {
  const { navigateNext } = useFlowNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="w-full max-w-xl mx-auto px-6 py-12 overflow-y-auto">
            <div className="hidden md:block mb-8">
              <ProgressBar />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-medium mb-4">Verify your email</h1>
                <p className="text-lg text-gray-600">Enter your email address to receive a verification code.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-lg font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#2557a7] py-3 px-4 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 