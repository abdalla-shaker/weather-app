import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const passedFn = (loc) => {
    setGeolocation({
      lat: loc.coords.latitude,
      lon: loc.coords.longitude,
    });
    setIsLoading(false);
  };

  const errorFn = (err) => {
    setGeolocationError(
      `Error: ${err.message}. Using Egypt as default location.`
    );
    setGeolocation({
      lat: 30,
      lon: 31,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (!geolocation && !geolocationError) {
      navigator.geolocation.getCurrentPosition(passedFn, errorFn);
    }
  }, [geolocation, geolocationError]);

  return { geolocation, geolocationError, isLoading };
};
