import { useState, useCallback } from "react";

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface GeolocationHookReturn {
  location: GeolocationPosition | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

export function useGeolocation(): GeolocationHookReturn {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        let errorMessage = "Unable to retrieve your location";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setError(errorMessage);
        setLoading(false);
      },
      options
    );
  }, []);

  return {
    location,
    loading,
    error,
    requestLocation,
  };
}
