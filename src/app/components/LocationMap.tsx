'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api';

// Move libraries outside of the component and the file scope
// This ensures it's only created once and never recreated
const LIBRARIES: Libraries = ['places'];

const DEFAULT_CENTER = {
  lat: 40.7128,
  lng: -74.0060
}; // New York City center

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  overflow: 'hidden'
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

interface LocationMapProps {
  selectedAddress: string;
}

export default function LocationMap({ selectedAddress }: LocationMapProps) {
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_CENTER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const markerRef = useRef<any>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: LIBRARIES
  });

  const onLoad = useCallback(async (map: google.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new google.maps.Geocoder();
    
    try {
      // Load the marker library
      const markerLibrary = await google.maps.importLibrary("marker");
      // Cast to any since the types are not yet available in @types/google.maps
      const marker = (markerLibrary as any).marker;
      
      // Create the marker
      markerRef.current = new marker.PinElement({
        map,
        position: currentLocation,
        title: selectedAddress || 'Current Location'
      });
      
      // Add the marker to the map
      map.setCenter(currentLocation);
    } catch (err) {
      console.error('Error creating marker:', err);
    }
    
    setIsLoading(false);
  }, [currentLocation, selectedAddress]);

  const onUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.map = null;
    }
    mapRef.current = null;
    geocoderRef.current = null;
    markerRef.current = null;
  }, []);

  // Update map center and marker when address changes
  useEffect(() => {
    const updateMapLocation = async () => {
      if (!mapRef.current || !geocoderRef.current || !selectedAddress) return;

      try {
        setIsLoading(true);
        const response = await geocoderRef.current.geocode({
          address: selectedAddress
        });

        if (response.results && response.results.length > 0) {
          const location = {
            lat: response.results[0].geometry.location.lat(),
            lng: response.results[0].geometry.location.lng()
          };
          setCurrentLocation(location);
          mapRef.current.panTo(location);
          mapRef.current.setZoom(14);

          // Update marker position if it exists
          if (markerRef.current) {
            markerRef.current.position = location;
          }

          setError(null);
        } else {
          setError('Could not find the location. Please try a different address.');
        }
      } catch (err) {
        console.error('Geocoding failed:', err);
        setError('Could not find the location. Please try a different address.');
      } finally {
        setIsLoading(false);
      }
    };

    updateMapLocation();
  }, [selectedAddress]);

  if (loadError) {
    return (
      <div className="relative w-full h-full bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
            <p className="text-red-800">Error loading Google Maps</p>
            <p className="text-sm text-red-600 mt-2">
              Please check your Google Maps API key and internet connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-full bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        mapContainerClassName="rounded-lg md:rounded-lg md:p-0"
        center={currentLocation}
        zoom={12}
        options={defaultOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
            <p className="text-red-800">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Please check your address and try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 