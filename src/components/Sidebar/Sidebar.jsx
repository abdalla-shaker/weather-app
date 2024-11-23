import Input from "./Input.jsx";
import Burger from "../../utils/Burger.jsx";
import WeatherCard from "./WeatherCard";
import { useState } from "react";

const SideBar = ({ weatherList, isLoading, isDay }) => {
  const [isActive, setIsActive] = useState(false);

  const textColors = isDay ? "text-gray-600" : "text-slate-200";

  const toggleActiveHandler = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <aside
      className={`h-full p-4 rounded-lg bg-white/30 ${
        isActive ? "w-96" : "w-0"
      } sm:w-96 transition-all absolute sm:static z-10 ${textColors}`}
    >
      <Burger clickHandler={toggleActiveHandler} />
      <div
        className={`mt-16 ${
          isActive ? "visible" : "invisible"
        } sm:visible sm:mt-4`}
      >
        <Input textColors={textColors} />
      </div>
      <h2 className={`mt-14 ${isActive ? "visible" : "invisible"} sm:visible font-medium`}>
        The next 5 days forecast
      </h2>
      <ul
        className={`weather mt-4 ${
          isActive ? "visible" : "invisible"
        } sm:visible`}
      >
        {isLoading && <li>Please wait getting weather details</li>}
        {!isLoading &&
          weatherList
            .slice(1)
            .map((day) => (
              <WeatherCard key={day.dt_txt.split(" ")[0]} weather={day} />
            ))}
      </ul>
    </aside>
  );
};

export default SideBar;
