'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

export default function OTP() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(28);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendCode = () => {
    if (canResend) {
      // Reset the countdown and disable resend
      setCountdown(28);
      setCanResend(false);
      // TODO: Implement actual code resend logic here
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/welcome");
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
                  Let's confirm it's you
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Enter the 6-digit verification code we just sent to:<br />
                  <span className="font-medium">negof5638@hazhab.com</span>
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
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Keep me signed in<br />
                      This is for personal devices only. Don't check this on shared devices to keep your account secure.
                    </span>
                  </label>
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

              <div className="space-y-3 text-center">
                <p className="text-sm text-gray-600">
                  Check junk mail if it's not in your inbox
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