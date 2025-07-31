import React from "react";

const Home = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/out.jpeg')" }}
      role="banner"
      aria-label="Hero section with background image"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 text-white text-center max-w-3xl space-y-6 py-16 px-6 rounded-2xl bg-black/40 shadow-2xl border border-white/20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl italic font-semibold tracking-tight">
          Breaking The Cycle
        </h2>

        <h1 className="text-2xl sm:text-4xl font-bold uppercase leading-snug">
          Of Poverty Through Education
        </h1>

        <p className="text-sm sm:text-base md:text-lg font-light">
          Reducing the suffering of orphans & vulnerable children in Korah, Ethiopia.
        </p>

        <div className="pt-4">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
