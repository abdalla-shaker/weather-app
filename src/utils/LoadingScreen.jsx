import svgAnimation from "../assets/loading animation.webm";

const LoadingScreen = ({ message, landing = false }) => {
  let cssClasses = "loading grid place-content-center text-center";
  if (landing) {
    cssClasses += " absolute z-20 w-screen h-screen bg-slate-100";
  } else {
    cssClasses += " w-full h-full";
  }

  return (
    <div className={cssClasses} id="loading-screen">
      <div className="svg-animation mx-auto">
        <video width="100" autoPlay loop muted>
          <source src={svgAnimation} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
