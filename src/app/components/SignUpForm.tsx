'use client';

import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just move to next step
    setStep(step + 1);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="hidden md:block">
        <ProgressBar currentStep={step} totalSteps={3} />
      </div>

      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6">
          Let's get to know each other!<br />
          What's your name?
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Mobile phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1568E3] text-white py-2 px-4 rounded-lg hover:bg-[#1258C5] transition-colors mt-6"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
} 