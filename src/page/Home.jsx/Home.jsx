import React from "react";

const Home = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center  "
      style={{ backgroundImage: "url('/out.jpeg')" }}
      role="banner"
      aria-label="Hero section with background image"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <fieldset className="relative z-10 w-full max-w-4xl border-y-4 border-double border-white bg-black/10 text-white px-6 py-12 rounded-xl backdrop-blur-sm shadow-lg">
        <legend className="text-4xl sm:text-6xl italic font-semibold mb-6 text-center">
          Breaking The Cycle
        </legend>

        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase text-center leading-tight mb-4">
          Of Poverty Through Education
        </h1>

        <p className="text-base sm:text-lg font-medium text-center capitalize">
          Reducing the suffering of orphans & vulnerable children in Korah, Ethiopia
        </p>
      </fieldset>
    </div>
  );
};

export default Home;
