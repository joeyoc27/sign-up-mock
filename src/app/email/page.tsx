'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Email() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/otp");
  };

  return (
    <main className="fixed inset-0 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#102147] shadow-sm py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
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
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className="w-full max-w-xl mx-auto px-6 py-12 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h1 className="text-[32px] font-medium leading-tight text-[#1f1f2d]">
                  Sign in or create an account to become a Vrbo host
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Please enter your email address to sign in or to create your new account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-lg font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#2557a7] py-3 px-4 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
                  >
                    Continue
                  </button>
                  
                  <button
                    type="button"
                    className="w-full rounded-full border border-gray-300 bg-white py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 