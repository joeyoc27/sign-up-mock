'use client';

import { useState, useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

// Mock data for address suggestions
const MOCK_ADDRESSES = [
  '123 Main Street, New York, NY 10001',
  '456 Broadway, New York, NY 10013',
  '789 5th Avenue, New York, NY 10022',
  '321 Park Avenue, New York, NY 10022',
  '555 Madison Avenue, New York, NY 10022',
  '100 Wall Street, New York, NY 10005',
  '200 Central Park West, New York, NY 10024',
  '350 Fifth Avenue, New York, NY 10118',
];

interface AddressTypeaheadProps {
  onSelect: (address: string) => void;
}

export default function AddressTypeahead({ onSelect }: AddressTypeaheadProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  // Add global styles for the autocomplete dropdown
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pac-container {
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin-top: 8px;
        font-family: inherit;
        z-index: 1100 !important;
        background-color: white;
      }
      
      @media (max-width: 768px) {
        .pac-container {
          position: fixed !important;
          top: auto !important;
          bottom: 100% !important;
          left: 16px !important;
          right: 16px !important;
          width: auto !important;
          margin: 0 0 8px 0;
          border-radius: 12px;
          max-height: 50vh;
          overflow-y: auto;
          background-color: white;
        }
      }

      .pac-item {
        padding: 12px 16px;
        font-size: 16px;
        cursor: pointer;
      }

      .pac-item:hover {
        background-color: #f3f4f6;
      }

      .pac-item-selected {
        background-color: #f3f4f6;
      }

      .pac-icon {
        margin-right: 12px;
      }

      .pac-item-query {
        font-size: 16px;
        color: #111827;
      }

      .pac-matched {
        font-weight: 600;
      }

      .pac-container:empty {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    // Initialize Google Places Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      fields: ['formatted_address', 'address_components'],
      componentRestrictions: { country: 'us' } // Restrict to US addresses
    });

    // Add listener for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setInputValue(place.formatted_address);
        onSelect(place.formatted_address);
      }
    });

    autocompleteRef.current = autocomplete;

    // Clean up
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isLoaded, onSelect]);

  if (loadError) {
    return (
      <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50">
        <p className="text-red-800">Error loading Google Maps API</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-50">
        <div className="animate-pulse flex items-center">
          <div className="h-4 w-4 bg-gray-300 rounded-full mr-3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#666666"/>
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter address..."
        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoComplete="off"
      />
    </div>
  );
} 