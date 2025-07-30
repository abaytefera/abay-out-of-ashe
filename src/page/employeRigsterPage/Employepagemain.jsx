import {
  faBackward,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ControlLogic } from "../../ControlLofic/Controllogic";
import { toast ,ToastContainer} from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/firebase";
import { userControl } from "../../context/Controluser";

const EmployePageMain = () => {
  const [checkNext, setCheckNext] = useState(true); // step control
  const smallMobile = useMediaQuery({ query: "(max-width:450px)" });
const {isDarkmode,ControlDarkMode}=ControlLogic()

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role:"",
    educationBackground:""
  });
  const [isloding,setLoading]=useState(false)

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


   const handleSubmit=async()=>{
setLoading(true)
try{
  console.log('start create')


let userCredential=await createUserWithEmailAndPassword(auth,form.email,form.password)
if(userCredential.user){
const userRef=doc(db,'users',userCredential.user.uid);
await setDoc(userRef,{
firstname:form.firstName,
lastname:form.lastName,
email:form.email,
phone:form.phone,
role:form.role,
EducationBackground:form.educationBackground

})

setForm(
  {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role:"",
    educationBackground:""
  }
 
)  

 setCheckNext(true)
 toast.success('employe account succefuly created')
}

}catch(err){
console.error(err.message);
  toast.error(err.code)
}finally{
  setLoading(false)
}


}



   
  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  return (

    <div className={`overflow-auto pb-40 ${isDarkmode ?"bg-gray-800 text-white":"bg-white text-black"}`}>
    <div className={`grid ${isDarkmode ?"bg-gray-800 text-white":"bg-white text-black"}  grid-rows-[70px_1fr_50px] gap-5 pt-5 ] `}>
    
      {/* Step Indicators */}
      <div className={`${isDarkmode ?"bg-gray-800 text-black":"bg-gray-200 "}   flex justify-around items-center  `}>
        {/* Step 1 */}
          <ToastContainer></ToastContainer>
           { isloding && ( <div className="absolute bg-useblack z-1000 w-screen h-screen left-0 top-0 m-auto flex items-center justify-center border-1">
             <p className="text-black  w-[80%] rounded-[20px]  flex justify-center items-center gap-[10px] font-bold  text-xl">
              <svg className="animate-spin h-20 w-30 text-green-800 text-2xl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              
            </p></div>)}
        <div
          style={{
            backgroundColor: checkNext ? "#7dd3fc" : "transparent",
            display: smallMobile && !checkNext ? "none" : "flex",
          }}
          className={`${checkNext ? "text-black":isDarkmode ?"text-white":"text-black"} flex gap-2 items-center h-[50px] rounded-r-full px-10`}
        >
          <div
            className={`w-8 h-8 font-bold flex justify-center items-center rounded-full ${
              checkNext ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            1
          </div>
          <p className="font-bold">Employee Profile</p>
        </div>

        {/* Step 2 */}
        <div
          style={{
            backgroundColor: !checkNext ? "#7dd3fc" : "transparent",
            display: smallMobile && checkNext ? "none" : "flex",
          }}
          className={`${!checkNext ? "text-black":isDarkmode ?"text-white":"text-black"} flex gap-2 items-center h-[50px] rounded-r-full px-10`}
        >
          <div
            className={`w-8 h-8 font-bold flex justify-center items-center rounded-full ${
              !checkNext ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            2
          </div>
          <p className="font-bold">Education Background</p>
        </div>
      </div>

      {/* Step 1: Employee Profile */}
      {checkNext ? (
        <div className="grid grid-cols-2 gap-5 max-xsm:grid-cols-1 px-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstName"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastName"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
          </div>

          {/* Password with toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="password"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute right-4 top-[38px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          {/* Confirm Password with toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="confirmPassword"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`${isDarkmode ? "placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              className="absolute right-4 top-[38px] text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            />
          </div>
        </div>
      ) : (
        // Step 2: Education Details
        <div className="grid grid-cols-2 gap-12 max-xsm:grid-cols-1 px-4">
          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="role"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Role
            </label>
            <select
              id="role"
              className={`${isDarkmode ? "bg-gray-800 placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
            onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Social Worker">Social Worker</option>
              <option value="Admin">Admin</option>
              <option value="Accountant">Accountant</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Education Level */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="educationBackground"
              className={`${isDarkmode ? "text-white":"text-gray-600"}  font-semibold text-sm`}
            >
              Education Background
            </label>
            <select
              id="educationBackground"
              className={`${isDarkmode ? "bg-gray-800 placeholder:text-white":""}  w-full h-[50px] px-4 pr-12 border border-gray-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-sky-300`}
           onChange={handleChange} >
              <option value="">Select Education</option>
              <option value="Degree">Degree</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center px-6">
        {/* Back button (only in step 2) */}
        {!checkNext && (
          <div
            className={`${isDarkmode ? "text-white" :""}  text-gray-600 font-bold cursor-pointer`}
            onClick={() => setCheckNext(true)}
          >
            <FontAwesomeIcon icon={faBackward} className="mr-1" />
            Back
          </div>
        )}

        {/* Next or Submit */}
        <div>
          <button
            className="py-2 px-12 rounded-xl font-bold text-white bg-sky-400 hover:bg-sky-700 transition"
            onClick={() => {
              if (checkNext) {
                // simple required fields check
                if (
                  !form.firstName ||
                  !form.lastName ||
                  !form.email ||
                  !form.phone ||
                  !form.password ||
                  !form.confirmPassword 
                  
                ) {
                  toast.error("Please fill in all required fields.");
                  return;
                }
                if (form.password !== form.confirmPassword) {
                  toast.error("Passwords do not match.");
                  return;
                }
                setCheckNext(false);
              } else {
                // Here you can trigger actual form submission
                handleSubmit()
                
              }
            }}
          >
            {checkNext ? "Next Step" : "Submit"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployePageMain;
