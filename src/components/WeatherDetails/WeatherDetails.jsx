import waterEvaporationIconBlack from "../../assets/evaporate water black.png";
import waterEvaporationIconWhite from "../../assets/evaporate water white.png";
import windIconBlack from "../../assets/wind black.png";
import windIconWhite from "../../assets/wind white.png";

const WeatherDetails = ({ weather, cityName, counterName, isDay, isError }) => {
  const textColors = isDay ? "text-gray-600" : "text-slate-100";

  if (isError) {
    return (
      <main
        className={`h-95 w-full p-4 rounded-lg bg-white/30 grid place-content-center text-center text-slate-900 font-bold text-4xl`}
      >
        <h1>Error eccurred please check back later.</h1>
      </main>
    );
  }

  return (
    <main
      className={`h-95 w-full p-4 rounded-lg bg-white/30 grid place-content-center text-center ${textColors}`}
    >
      <h1 className="text-2xl font-bold">
        {counterName}, {cityName}
      </h1>
      <p className="text-6xl font-bold">
        {Math.floor(weather.main.temp - 273.15)}°C
      </p>
      <p className="text-xl font-medium mt-3 mx-auto flex items-center">
        <span className="mr-3">
          <img src={isDay ? windIconBlack : windIconWhite} alt="A wind icon" />
        </span>
        {Math.floor(weather.wind.speed * 3.6)} km/h
      </p>
      <p className="text-xl font-medium mt-1 mx-auto flex items-center">
        <span className="mr-3">
          <img
            src={isDay ? waterEvaporationIconBlack : waterEvaporationIconWhite}
            alt="A wind icon"
            className="w-12"
          />
        </span>
        {weather.main.humidity}%
      </p>
    </main>
  );
};

export default WeatherDetails;
