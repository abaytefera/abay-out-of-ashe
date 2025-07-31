import Log from "../../componet/log";
import Footer from "../../componet/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState ,useContext, useEffect} from "react";


import { Navigate } from "react-router-dom";
import { auth } from "../../Config/firebase";

import { toast } from "react-toastify";
const  PasswordChange= () => {
    const [newPasswordEye,setnewPasswordEye]=useState(false)
    const [confirmPassword,setConfirmPassword]=useState(false);
     const [loading,setLoading]=useState(false);
    const context=useContext(AutheContext);
    const {currentUser}=context
    const usemax=useRef(null)
    const useupper=useRef(null)
    const uselower=useRef(null)
    const usespecial=useRef(null)
    const useNumber=useRef(null)
    const input=useRef(null)
    const error=useRef(null)
    const [rendering,setRendering]=useState(false);
const [man,setMan]=useState([]);
    const buttonconfirm=useRef(null)
    const {updateChangePassword}=employe();
    




const handleinput=()=>{







let check=true
buttonconfirm.current.disabled=true;
buttonconfirm.current.classList.add('cursor-not-allowed');
buttonconfirm.current.classList.remove('cursor-pointer')
buttonconfirm.current.classList.add('bg-blue-300');
buttonconfirm.current.classList.remove('bg-button')
usemax.current.classList.remove('text-red-400')
useupper.current.classList.remove('text-red-400')
uselower.current.classList.remove('text-red-400')
useNumber.current.classList.remove('text-red-400')
usespecial.current.classList.remove('text-red-400')

let newPassword=input.current.value;

    if(newPassword.length<6){
usemax.current.classList.add('text-red-400')
 check=false
    }
    if(!(/[A-Z]/.test(newPassword))){
useupper.current.classList.add('text-red-400')
 check=false
    }
      if(!(/[a-z]/.test(newPassword))){
uselower.current.classList.add('text-red-400')
 check=false
    }
       if(!(/[!@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?\/]/.test(newPassword))){
usespecial.current.classList.add('text-red-400')
 check=false
    }
     if(!(/[0-9]/.test(newPassword))){
useNumber.current.classList.add('text-red-400')
 check=false
  
    }
    if(check){
buttonconfirm.current.disabled=false
buttonconfirm.current.classList.remove('cursor-not-allowed');
buttonconfirm.current.classList.add('cursor-pointer')
buttonconfirm.current.classList.remove('bg-blue-300');
buttonconfirm.current.classList.add('bg-button')


    }


   
}
const handleChangePassword=async(e)=>{
e.preventDefault();

const formdata=new FormData(e.target);
const {newpassword,confirmPassword}=Object.fromEntries(formdata);
setLoading(true)
if(newpassword==confirmPassword){
try{

let result=await updatePassword(auth.currentUser,newpassword);
console.log("sussculy change")
await updateChangePassword(auth.currentUser?.uid)
setRendering(true)


}catch(e){

toast.error("error occure please try again",{position:'top-right'})

}finally{

    setLoading(false)
}
}
else{
error.current.textContent='password is not match please check'

}}




if(rendering){
  return   <Navigate to={'/home'}/>
}

    return ( 
<div className="w-full h-full  flex justify-between flex-col overflow-auto ">
<Log></Log>

<div className="flex-1 flex  justify-center bg-[url(out.jpeg)] bg-cover bg-center">
<form className="flex  flex-col gap-[10px]  p-[20px] w-[400px] max-w-full overflow-auto h-[450px] bg-changepass backdrop-blur-xs text-white" onSubmit={handleChangePassword}>
    <h1 className="font-bold">Change Password</h1>

{loading &&     <p className="bg-blue-500 w-[80%] rounded-[20px] h-[30px] flex justify-center items-center gap-[10px] font-bold text-white text-[20px]">
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  Loading...
</p>}

<div className="flex flex-col gap-[10px] relative" >
<p className="self-start font-medium">new password:</p>
<input type={newPasswordEye==false? 'password':'text'} ref={input}  name="newpassword"  onChange={(e)=>{

handleinput()}} placeholder="new password " className="h-[40px] rounded-[10px] outline-button" />
<FontAwesomeIcon icon={newPasswordEye==false? faEye:faEyeSlash} className="absolute right-[10px] top-[45px] cursor-pointer" onClick={()=>{setnewPasswordEye(pre=>!pre)}}></FontAwesomeIcon>
<p></p>
<ul className="list-[circle] self-start">

  <li className="text-start" ref={usemax}>minimum character 6</li>
  <li className="text-start" ref={useupper}> one uppercase character</li>
  <li className="text-start" ref={uselower}> one lowerCase character</li>
  <li className="text-start" ref={usespecial}> one special Character</li>
  <li className="text-start" ref={useNumber}>   one number  </li>
</ul>
</div>
<div className="flex flex-col relative">
    <p className="self-start font-medium">Confirm  New password</p>
<input type={confirmPassword==false? 'password':'text'} name="confirmPassword" placeholder="confirm passsword" className="h-[40px] border-none rounded-[10px] outline-button"/>

<FontAwesomeIcon icon={confirmPassword==false? faEye:faEyeSlash} className="absolute right-[10px] top-[35px] cursor-pointer" onClick={()=>{setConfirmPassword(pre=>!pre)}}></FontAwesomeIcon>
</div>
<p ref={error} className="text-red-600"></p>
<button className="w-full h-[50px] block bg-blue-300 rounded-[20px] cursor-not-allowed  text-black "  ref={buttonconfirm} type="submit" disabled>Change Password</button>
</form>
   
</div>

<Footer></Footer>



</div>

     );
}
 
export default   PasswordChange;