import { useEffect, useState } from "react";

const SlideCard = ({ message }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`card-animation absolute p-2 bg-slate-700 text-slate-100 rounded-md z-10 right-4 top-1/2 ${
        isActive && "active"
      }`}
    >
      {message}
    </div>
  );
};

export default SlideCard;
