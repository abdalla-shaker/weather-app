import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { placeFetch } from "../../store/placeAction.js";
import Suggestions from "../../utils/Suggestions.jsx";

const Input = ({ textColors }) => {
  const [isTyping, setIsTyping] = useState(false);
  const placeInformation = useSelector((state) => state.search);

  const userInput = useRef();

  const dispatch = useDispatch();

  const onListClick = (address) => {
    userInput.current.value = address;
    setIsTyping(false);
  };

  const inputClickHandler = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsTyping(false), 100);
  };

  const clickHandler = () => {
    dispatch(placeFetch(userInput.current.value));
  };

  return (
    <div className="flex gap-2 relative">
      <input
        type="text"
        placeholder="Search"
        id="place"
        name="place"
        ref={userInput}
        onClick={inputClickHandler}
        onBlur={handleBlur}
        required
        autoComplete="off"
        className={`py-2 px-4 border-2 border-transparent w-full rounded-full font-medium ${textColors} ${
          textColors === "text-slate-200" ? "placeholder:text-slate-100" : ""
        } bg-white/40 focus:border-slate-300 focus:border-opacity-40 outline-none transition-all`}
      />

      <button
        className="bg-white/20 px-5 rounded-full hover:bg-white/10 transition-all"
        onClick={clickHandler}
      >
        Search
      </button>

      {isTyping && (
        <div className="suggestions absolute top-full bg-white/80 w-full p-2 z-30 text-center rounded-lg mt-4">
          <ul>
            {placeInformation.searchedPlaces &&
              placeInformation.searchedPlaces.map((place, index) => (
                <Suggestions
                  key={index}
                  label={place}
                  onClickHandler={onListClick}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
