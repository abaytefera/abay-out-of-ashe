import React, { useEffect, useRef } from "react";
import Footer from "../../componet/footer";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useLoginControl } from "../../context/contolloginanimation";
gsap.registerPlugin(TextPlugin)

const Home = () => {

const BreakRef=useRef(null);
const ReducRef=useRef(null);
const  PovertyRef=useRef(null);
const buttonRef=useRef(null)
const {controlLoginPage}=useLoginControl();

 useEffect(() => {
  const timeline = gsap.timeline();
controlLoginPage(true)
  timeline
    .to(BreakRef.current, { text: "Breaking The Cycle", duration: 2 })
    .to(".BreakLine", { opacity: 1 }, "<")
    .to(".BreakLine", { opacity: 0 })

    .to(PovertyRef.current, { text: "Of Poverty Through Education", duration: 2 })
    .to(".PovertyLine", { opacity: 1 }, "<")
    .to(".PovertyLine", { opacity: 0 })

    .to(ReducRef.current, { text: "Reducing the suffering of orphans & vulnerable children in Korah, Ethiopia.", duration: 2 })
    .to(".ReducRef", { opacity: 1 }, "<")
    .to(".ReducRef", { opacity: 0 })

    .fromTo(buttonRef.current,
      { y: 0, opacity: 0 },
      { y: 20, opacity: 1, ease: "bounce.out"  }
    );

  return () => timeline.kill();

}, []);


  return (
    <section
      className="relative bg-cover  h-[200vh] bg-center flex flex-col  pt-10 space-y-100 bg-no-repeat  flex items-center justify-center "
      style={{ backgroundImage: "url('/out.jpeg')" }}
      role="banner"
      aria-label="Hero section with background image"
    >
      {/* Dark Overlay */}
      <div className="absolute self-center " />

      <div className="relative z-10 text-white text-center max-w-3xl space-y-6 py-16 px-6 rounded-2xl bg-black/40 shadow-2xl border border-white/20">

        <div className="flex justify-center">
        <h2 ref={ BreakRef} className="max-md:text-6xl qwitcher-grypen-bold  md:text-8xl italic font-semibold tracking-tight">
      
        </h2>
        <span className="max-md:text-6xl BreakLine  opacity-0  md:text-7xl ">|</span>
        </div>

<div className="flex">
        <h1  ref={PovertyRef} className="text-2xl sm:text-4xl font-bold uppercase leading-snug">
        
        </h1>
        <span className="text-2xl opacity-0  PovertyLine sm:text-4xl font-bold uppercase leading-snug">|</span>
</div>

<div className="flex">
        <h1 ref={ReducRef} className="text-sm sm:text-base md:text-lg font-light">
          
        </h1>
        <span className="text-sm ReducRef opacity-0 sm:text-base md:text-lg font-light">|</span>

        </div>

        <div className="pt-4">
          <button ref={buttonRef} className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-md">
            Learn More
          </button>
        </div>
      </div>
          <Footer />
    </section>
  );
};

export default Home;
