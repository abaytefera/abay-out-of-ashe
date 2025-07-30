import { Link } from "react-router-dom";

const Log = () => {
  return (
    <header className="w-full bg-gray-100 shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div>
          <img
            src="out.png"
            alt="logo"
            className="w-40 h-20 object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <Link to="/HomeMain">
            <button className="px-6 py-2 text-gray-700 font-semibold rounded-md hover:text-bo hover:font-bold transition duration-200">
              Home
            </button>
          </Link>

          <Link to="/Login">
            <button className="px-6 py-2 bg-abu text-white font-semibold rounded-md hover:bg-bo transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Log;
