const Burger = ({ clickHandler }) => {
  return (
    <div className="fixed sm:hidden">
      <button className="relative group" onClick={clickHandler}>
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
          <div className="flex flex-col pt-1 justify-between w-[20px] h-[20px] transform transition-all duration-100 origin-center overflow-hidden group-focus:rotate-90">
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
            <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:w-0 delay-75"></div>
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 group-focus:w-0 delay-75"></div>
            <div className=" w-0 h-0  overflow-hidden transform transition-all duration-300 group-focus:w-12 group-focus:h-12 group-focus:-mt-2 delay-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6h-6 w-6  text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Burger;
