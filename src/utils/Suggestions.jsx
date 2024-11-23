const Suggestions = ({ label, onClickHandler }) => {
  const cssClasses = `py-4 hover:bg-white/50 transition-all cursor-pointer mb-1 w-full text-gray-600`;

  return (
    <li
      className={cssClasses}
      onClick={() => {
        onClickHandler(label);
      }}
    >
      <button>{label}</button>
    </li>
  );
};

export default Suggestions;
