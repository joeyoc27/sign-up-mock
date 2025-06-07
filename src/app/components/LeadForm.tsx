'use client';

import { useState } from 'react';

export default function LeadForm() {
  const [phoneCountry, setPhoneCountry] = useState('+1');

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
          />
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
          />
        </div>
      </div>

      <div>
        <div className="flex rounded-md shadow-sm">
          <select
            value={phoneCountry}
            onChange={(e) => setPhoneCountry(e.target.value)}
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
        />
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 text-lg"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-full bg-[#2557a7] py-3 px-8 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2 transition-colors"
        >
          Next
        </button>
      </div>

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
  );
} 