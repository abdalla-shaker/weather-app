const WeatherCard = ({ weather }) => {
  return (
    <li className="weather__card flex justify-between items-center bg-white/30 rounded-lg mb-2">
      <div className="flex items-center">
        <div className="weather__card-img-cont w-16 h-16 flex justify-center items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon.replace(
              "n",
              "d"
            )}@2x.png`}
            alt="Will be added later"
          />
        </div>
        <div className="weather__card-details">
          <p className="weather__card-details-date text-lg font-bold">
            {weather.dt_txt.split(" ")[0]}
          </p>
          <p className="weather__card-details-state text-sm font-medium">
            {weather.weather[0].main}
          </p>
        </div>
      </div>
      <div className="weather__card-temp flex">
        <p className="weather__card-temp-deg mr-4">
          {Math.floor(weather.main.temp - 273.15)}°C
        </p>
      </div>
    </li>
  );
};

export default WeatherCard;
