'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProgressBar from '../components/ProgressBar';
import AddressTypeahead from '../components/AddressTypeahead';
import LocationMap from '../components/LocationMap';
import { useState, useEffect, useRef } from 'react';
import { useFlowNavigation } from '../hooks/useFlowNavigation';
import { useFlow } from '../context/FlowContext';

// Helper function to parse formatted address
const parseAddress = (formattedAddress: string) => {
  // Example: "123 Main Street, New York, NY 10001, USA"
  const parts = formattedAddress.split(',').map(part => part.trim());
  const address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  };

  if (parts.length >= 4) {
    address.street = parts[0];
    address.city = parts[1];
    // Handle "NY 10001" format
    const stateZip = parts[2].split(' ');
    address.state = stateZip[0];
    address.zipCode = stateZip[1] || '';
    address.country = parts[3];
  }

  return address;
};

export default function Location() {
  const router = useRouter();
  const { navigateNext, getCurrentStep } = useFlowNavigation();
  const { totalSteps } = useFlow();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const [manualAddress, setManualAddress] = useState({
    street: '',
    country: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Update expanded state when manual mode changes
  useEffect(() => {
    setIsExpanded(isManualMode);
  }, [isManualMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = currentY - startY;
    if (diff > 50) { // Dragged down
      setIsExpanded(false);
    } else if (diff < -50) { // Dragged up
      setIsExpanded(true);
    }
    // Reset position
    setCurrentY(0);
    setStartY(0);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    setIsManualMode(false); // Reset to search mode when collapsing
  };

  // Calculate transform based on drag
  const getTransform = () => {
    if (!isDragging || !bottomSheetRef.current) return '';
    if (isExpanded) {
      // When expanded, allow dragging down
      const diff = Math.max(0, currentY - startY);
      return `translateY(${diff}px)`;
    } else {
      // When collapsed, allow dragging up
      const diff = Math.min(0, currentY - startY);
      return `translateY(${diff}px)`;
    }
  };

  const handleManualAddressChange = (field: keyof typeof manualAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setManualAddress(prev => {
      const updated = {
        ...prev,
        [field]: newValue
      };
      
      // Check if all required fields are filled
      const allFieldsFilled = Object.values(updated).every(value => value.trim() !== '');
      
      // Update the selected address if all fields are filled
      if (allFieldsFilled) {
        const fullAddress = `${updated.street}, ${updated.city}, ${updated.state} ${updated.zipCode}, ${updated.country}`;
        setSelectedAddress(fullAddress);
      }
      
      return updated;
    });
  };

  const toggleMode = () => {
    if (!isManualMode && selectedAddress) {
      // When switching to manual mode, parse the selected address
      const parsedAddress = parseAddress(selectedAddress);
      setManualAddress(parsedAddress);
    }
    setIsManualMode(!isManualMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateNext();
  };

  return (
    <main className="fixed inset-0 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#102147] shadow-sm py-4 flex-shrink-0 z-10">
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
        <div className="absolute inset-0 flex justify-center">
          <div className="flex w-full max-w-[1400px]">
            {/* Left Section - Form */}
            <div className="w-full md:w-1/2 px-6 md:pr-0 md:pl-24 py-6 md:py-12 overflow-y-auto">
              <div className="max-w-md mx-auto">
                <div className="hidden md:block mb-8">
                  <ProgressBar currentStep={getCurrentStep()} totalSteps={totalSteps} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-medium mb-4">Where's your place located?</h1>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z" fill="currentColor"/>
                      </svg>
                      {isManualMode ? 'Use address search' : 'Enter address manually'}
                    </button>
                    
                    {isManualMode ? (
                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={manualAddress.street}
                            onChange={handleManualAddressChange('street')}
                            placeholder="Street address"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={manualAddress.country}
                            onChange={handleManualAddressChange('country')}
                            placeholder="Country"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={manualAddress.city}
                            onChange={handleManualAddressChange('city')}
                            placeholder="City"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={manualAddress.state}
                            onChange={handleManualAddressChange('state')}
                            placeholder="State"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                          <input
                            type="text"
                            value={manualAddress.zipCode}
                            onChange={handleManualAddressChange('zipCode')}
                            placeholder="ZIP code"
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <AddressTypeahead onSelect={setSelectedAddress} />
                    )}

                    <div>
                      <input
                        type="text"
                        placeholder="Unit number (optional)"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-[#2557a7] py-3 px-8 text-lg font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Section - Map */}
            <div className="hidden md:block w-1/2 relative md:pl-0 md:pr-24">
              <div className="h-full">
                <LocationMap selectedAddress={selectedAddress} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheet */}
        <div
          ref={bottomSheetRef}
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            isExpanded ? 'translate-y-0' : 'translate-y-[65%]'
          }`}
          style={{ transform: getTransform() }}
        >
          {/* Drag Indicator */}
          <div 
            className="sticky top-0 pt-3 pb-4 bg-white rounded-t-3xl cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={toggleExpanded}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto transition-colors duration-200 hover:bg-gray-400"></div>
          </div>

          <div className={`px-4 ${isExpanded ? 'pb-8' : 'pb-6'} overflow-y-auto h-full`}>
            <h2 className="text-xl font-medium mb-4">Where's your place located?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isManualMode ? (
                <>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="mb-2 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-2.53 2.54 3.75 3.75 2.53-2.54z" fill="currentColor"/>
                    </svg>
                    Enter address manually
                  </button>
                  <div className="relative">
                    <AddressTypeahead onSelect={setSelectedAddress} />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
                      </svg>
                      Back to search
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street address</label>
                      <input
                        type="text"
                        value={manualAddress.street}
                        onChange={handleManualAddressChange('street')}
                        placeholder="e.g. 123 Main St"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={manualAddress.country}
                        onChange={handleManualAddressChange('country')}
                        placeholder="e.g. United States"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={manualAddress.city}
                        onChange={handleManualAddressChange('city')}
                        placeholder="e.g. New York"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={manualAddress.state}
                          onChange={handleManualAddressChange('state')}
                          placeholder="e.g. NY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP code</label>
                        <input
                          type="text"
                          value={manualAddress.zipCode}
                          onChange={handleManualAddressChange('zipCode')}
                          placeholder="e.g. 10001"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-[#2557a7] py-3 px-8 text-base font-medium text-white hover:bg-[#1e4b8f] focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 