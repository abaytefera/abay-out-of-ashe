import { Link } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLoginControl } from "../context/contolloginanimation";

const Log = () => {
const buttonLoginRef=useRef(null)
const {Loginpage,controlLoginPage}=useLoginControl()
useEffect(()=>{

gsap.fromTo(buttonLoginRef.current,{
  scale:0.5,
    backgroundColor:"rgb(153, 88, 172)",

},{
  scale:1,
  duration:1,
backgroundColor:"rgb(165, 20, 210)",
  repeat:-1,
  yoyo:true,
  ease:'elastic.inOut'



})


console.log(Loginpage)

},[])
  return (
    <header className="w-full   sticky top-0 z-50 w-full bg-gray-100 shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div>
          <img
            src="https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/out.png"
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
   <button
  ref={el => {
    if (Loginpage) {
      buttonLoginRef.current = el;
    }
  }}
  onClick={() => controlLoginPage(false)}
  className="px-4 py-2 bg-abu text-white font-semibold rounded-md hover:bg-bo transition duration-300"
>
  Login
</button>


          </Link>
        </div>
      </div>
    </header>
  );
};

export default Log;
