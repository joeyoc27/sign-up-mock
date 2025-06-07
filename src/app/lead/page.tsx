'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import { useFlow } from '../context/FlowContext';
import ProgressBar from '../components/ProgressBar';

export default function Lead() {
  const { navigateNext, getCurrentStep } = useFlowNavigation();
  const { totalSteps } = useFlow();

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
              <ProgressBar className="mx-4" currentStep={getCurrentStep()} totalSteps={totalSteps} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className="w-full md:w-1/2 px-6 md:px-16 py-6 md:py-12 overflow-y-auto">
            <div className="hidden md:block mb-8">
              <ProgressBar currentStep={getCurrentStep()} totalSteps={totalSteps} />
            </div>
            
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Great, let's create your account</h1>
              <p className="text-lg text-gray-600 mb-6">
                Have an existing account with us?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  Log in
                </Link>{' '}
                to set up the new property under that account.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Don't want to use your existing account? Use a different email address below to create a new account. Please don't use a shared email address. You can now use one account to sign in across Expedia, Hotels.com, and Vrbo.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex rounded-md shadow-sm">
                    <select
                      defaultValue="+1"
                      className="rounded-l-md border-r-0 border-gray-300 bg-gray-50 py-3 pl-3 pr-7 text-lg text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="+1">+1</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#2557a7] py-3 px-8 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2 transition-colors"
                >
                  Next
                </button>

                <p className="text-xs text-gray-500">
                  By creating an account you are accepting our{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>

          {/* Right Section - Image */}
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