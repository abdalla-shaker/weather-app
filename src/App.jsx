import SideBar from "./components/Sidebar/Sidebar.jsx";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails.jsx";
import LoadingScreen from "./utils/LoadingScreen.jsx";
import SlideCard from "./utils/SlideCard.jsx";
import { useGeolocation } from "./hooks/useGeolocation.js";
import { useWeatherData } from "./hooks/useWeatherData.js";
import { useSelector } from "react-redux";

let IS_DAY;
let DAY_DESC;

function App() {
  const placeInformation = useSelector((state) => state.search);

  const {
    geolocation,
    geolocationError,
    isLoading: isGeoLoading,
  } = useGeolocation();

  const {
    weatherData,
    isLoading: isWeatherLoading,
    isError,
    filteredWeatherData,
  } = useWeatherData(
    Object.keys(placeInformation.placeDetails).length !== 0
      ? placeInformation.placeDetails
      : geolocation
  );

  const convertToLocalTime = (unixTime, timezoneOffset) => {
    return new Date((unixTime + timezoneOffset) * 1000);
  };

  if (!isWeatherLoading && weatherData) {
    const sunrise = convertToLocalTime(
      weatherData.city.sunrise,
      weatherData.city.timezone
    );
    const sunset = convertToLocalTime(
      weatherData.city.sunset,
      weatherData.city.timezone
    );
    const currentTime = convertToLocalTime(
      weatherData.list[0].dt,
      weatherData.city.timezone
    );

    IS_DAY = currentTime >= sunrise && currentTime < sunset;

    DAY_DESC = getWeatherCategory(weatherData.list[0].weather[0].description);
  }

  return (
    <section
      className={`section ${
        IS_DAY ? "day" : "night"
      } ${DAY_DESC} h-screen flex ${isGeoLoading ? "" : "p-5"} gap-5`}
    >
      {isGeoLoading && (
        <LoadingScreen
          landing
          message="Please give us access to your location to get the weather details on
        your location"
        />
      )}
      {geolocationError && <SlideCard message={geolocationError} />}
      {!isWeatherLoading && weatherData && (
        <SideBar
          weatherList={filteredWeatherData}
          isLoading={isWeatherLoading}
          isDay={IS_DAY}
        />
      )}
      {isWeatherLoading && (
        <LoadingScreen message="Please wait, we are getting the weather details." />
      )}
      {!isWeatherLoading && weatherData && (
        <WeatherDetails
          weather={weatherData.list[0]}
          cityName={weatherData.city.name}
          counterName={weatherData.city.country}
          isDay={IS_DAY}
          isError={isError}
        />
      )}
      {!isWeatherLoading && !weatherData && (
        <WeatherDetails isError={isError} />
      )}
    </section>
  );
}

export default App;

const getWeatherCategory = (description) => {
  const clearSky = ["clear sky"];
  const clouds = [
    "few clouds",
    "scattered clouds",
    "broken clouds",
    "overcast clouds",
  ];
  const rain = [
    "light rain",
    "moderate rain",
    "heavy intensity rain",
    "very heavy rain",
    "extreme rain",
    "freezing rain",
    "light intensity drizzle",
    "drizzle",
    "heavy intensity drizzle",
    "light intensity drizzle rain",
    "drizzle rain",
    "heavy intensity drizzle rain",
    "shower rain and drizzle",
    "heavy shower rain and drizzle",
    "shower drizzle",
  ];
  const thunderstorm = [
    "thunderstorm",
    "light thunderstorm",
    "heavy thunderstorm",
    "ragged thunderstorm",
    "thunderstorm with light rain",
    "thunderstorm with rain",
    "thunderstorm with heavy rain",
    "thunderstorm with drizzle",
    "thunderstorm with heavy drizzle",
  ];
  const snow = [
    "snow",
    "light snow",
    "moderate snow",
    "heavy snow",
    "sleet",
    "light sleet",
    "heavy sleet",
    "snow grains",
    "ice pellets",
  ];
  const fog = [
    "fog",
    "mist",
    "smoke",
    "haze",
    "sand",
    "dust",
    "volcanic ash",
    "squalls",
    "tornado",
  ];
  // Check each category and return the first match
  if (clearSky.some((item) => description.toLowerCase().includes(item))) {
    return "clear";
  }
  if (clouds.some((item) => description.toLowerCase().includes(item))) {
    return "cloudy";
  }
  if (rain.some((item) => description.toLowerCase().includes(item))) {
    return "rainy";
  }
  if (thunderstorm.some((item) => description.toLowerCase().includes(item))) {
    return "thunderstorm";
  }
  if (snow.some((item) => description.toLowerCase().includes(item))) {
    return "snowy";
  }
  if (fog.some((item) => description.toLowerCase().includes(item))) {
    return "foggy";
  }

  return "unknown"; // Return 'unknown' if no match is found
};
