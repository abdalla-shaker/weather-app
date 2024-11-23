import { useState, useEffect } from "react";

const API_KEY = "b7aba112b81606e1c31f17866bc7b6a1";

export const useWeatherData = (location) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [filteredWeatherData, setFilteredWeatherData] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (location) {
      const fetchingWeather = async () => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
        );

        if (!res.ok) {
          setIsLoading(false);
          setIsError("Error occurred while fetching for weather data");
          throw new Error("Error fetching for weather data");
        }

        const data = await res.json();

        const uniqueDayList = filterUniqueDays(data.list);

        setWeatherData(data);
        setFilteredWeatherData(uniqueDayList);

        setIsLoading(false);
      };
      fetchingWeather();
    }
  }, [location]);

  return { isLoading, weatherData, isError, filteredWeatherData };
};

const filterUniqueDays = (list) => {
  const seenDays = new Set();
  return list.filter((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Extract the date part
    if (seenDays.has(date)) {
      return false;
    } else {
      seenDays.add(date);
      return true;
    }
  });
};
