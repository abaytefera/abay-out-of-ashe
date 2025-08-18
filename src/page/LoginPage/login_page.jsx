import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Log from "../../componet/log";
import Footer from "../../componet/footer";
import { auth } from "../../Config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { userControl } from "../../context/Controluser";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { ChangeUserInformation } = userControl();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = async (form) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Successfully logged in, redirecting...");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-credential':
          toast.error("Invalid email or password.");
          break;
        case 'auth/invalid-email':
          toast.error("The email format is not valid.");
          break;
        case 'auth/user-disabled':
          toast.error("This account has been disabled.");
          break;
        case 'auth/network-request-failed':
          toast.error("Network issue. Please check your internet.");
          break;
        case 'auth/too-many-requests':
          toast.error("Too many failed attempts. Try again later.");
          break;
        default:
          toast.error("Login failed. Please try again.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        ChangeUserInformation(user);
        navigate('/Dashboard');
      } else {
        ChangeUserInformation(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className=" flex flex-col bg-[url('/bg.png')] bg-cover w-full h-[200vh] pt-15 space-y-100  gap-16 overflow-y-auto  bg-center bg-no-repeat">
     

      <div className="flex-grow flex  items-center   justify-center   px-4  ">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full max-w-sm bg-white rounded-xl shadow-lg px-6 py-8 space-y-5"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
          <ToastContainer position="top-center" />

          {loading && (
            <div className="flex items-center justify-center gap-2 bg-blue-500 text-white text-sm py-2 rounded">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Loading...
            </div>
          )}

          {/* Email */}
          <div className="w-full">
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: "Please enter email" })}
              className="w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label className="block text-gray-600 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Enter your password"
              {...register('password', { required: "Please enter password" })}
              className="w-full px-4 py-2 border border-gray-300 rounded pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="absolute top-9 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-abu hover:bg-bo transition-all duration-300 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
         
      </div>

     <Footer />
    </div>
  );
}

export default Login;
