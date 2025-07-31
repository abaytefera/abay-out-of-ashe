
import { faDashboard,faUserPlus ,faCog,faPlusCircle,faRightFromBracket, faLock, faQuestion, faHandsBound, faMoon} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../Config/firebase";
import { Controllogic } from "../context/controlApplogic";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ControlLogic } from "../ControlLofic/Controllogic";
import { userControl } from "../context/Controluser";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
const  SideMenu= () => {
    let [light,setLight]=useState(false)
    const {UserInformation,ChangeUserInformation}=userControl()
    let [DisplaySetting,setDisplaySetting]=useState(false)
    const {Click}=Controllogic();
const isSmallQuery=useMediaQuery({query:'(max-width:640px)'})
const ismaxsize=useMediaQuery({query:'(min-width:640.01px)'})
    useEffect(()=>{
const unsub=onAuthStateChanged(auth,(user)=>{
if(user){

  ChangeUserInformation(user)

}else{
  ChangeUserInformation(null)
}

})



},[])
const {isDarkmode,ControlDarkMode}=ControlLogic()
    if(isSmallQuery){



return ( 
       

    
<div className={` ${ Click ? "flex flex-col -translate-x-[0px]   z-600   absolute  h-screen  w-[200px]  text-white  rounded-r-[10px]  gap-[20px] item-center    transition  duration-300  ease-linear ":"flex  flex-col -translate-x-[200px]   z-600   absolute   h-screen w-[200px] text-white rounded-r-[10px] gap-[20px] item-center  transition duration-300 ease-linear " }          w-[200px] h-full  absolute left-0      ${isDarkmode ?"bg-gray-800 text-white":"bg-gray-500  text-white"} left-0 top-0 `}>

<Link to={'/Dashboard'}>  

<div className="self-start transition  items-center py-[20px] flex gap-[5px] hover:bg-gray-700  duration-100 ease-linear cursor-pointer  w-full">
< FontAwesomeIcon icon={faDashboard} className="text-[20px] text-black"></FontAwesomeIcon>
<button className="text-2xl font-bold  cursor-pointer">Dashboard</button>

</div></Link>


 <Link to={'/RegisterNewStudent'}> 
 
   <div className="self-start items-center py-[20px]  flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">
<FontAwesomeIcon icon={faUserPlus} className="text-[20px] text-black"/>
Register new student

</div>
</Link>
{
UserInformation?.role==='Admin'  &&
 (
 <Link to={'/RegisterNewEmployee'}>
<div className="self-start items-center py-[20px] flex gap-[5px] cursor-pointer   hover:bg-gray-700 transition-all duration-200  w-full">
<FontAwesomeIcon icon={faUserPlus}  className="text-[20px] text-black"/>
Register new Employee

</div>
</Link>


 ) 
}



{ UserInformation?.role==='Admin'  && (
  <Link to={'/createTask'}>
<div className="self-start py-[20px] z-400 items-center flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">

    <FontAwesomeIcon icon={faPlusCircle}  className="text-[20px] text-black"/>
    Create Task 
</div>
</Link>)
}




<div className="self-start relative py-[20px] items-center flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">
  
     <div className=" items-center  flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full" onClick={()=>{setDisplaySetting(pre=>!pre)}}> <FontAwesomeIcon className=" text-[20px] text-black" icon={faCog}  />
  <span>Settings</span></div>
 <div className={`shadow-md flex flex-col gap-[20px] py-[5px] absolute z-500   rounded-[5px]  -top-[230px] bg-white text-black 
    ${DisplaySetting ?"flex":"hidden"}`}>
<Link to='/changePassword'>
<div className="flex gap-[5px] items-center w-full text-left px-2 py-2 hover:bg-gray-100">
  <FontAwesomeIcon className="text-lg font-bold" icon={faLock}></FontAwesomeIcon>  
    <p>Password</p>
     </div>
     </Link>
     <div className="flex gap-[5px] items-center w-full text-left pr-5 py-2 hover:bg-gray-100">

       <FontAwesomeIcon className="text-lg font-bold" icon={faHandsBound}></FontAwesomeIcon> <p>About Application</p>
     </div>
     <div className="flex gap-[5px] items-center w-full text-left px-2 py-2 hover:bg-gray-100">

      <FontAwesomeIcon className="text-lg font-bold" icon={faQuestion}></FontAwesomeIcon>  <p>Help/FAQ</p>
     </div>
     <div className="flex items-center justify-between w-full text-left pr-5 py-2 hover:bg-gray-100">
    <div className="flex items-center gap-[5px]">  <FontAwesomeIcon icon={faMoon} className="text-lg font-bold"></FontAwesomeIcon> <p>Dark Mode</p></div>
    <div className={`w-9 h-6 border-1 rounded-[10px] justify-center ${isDarkmode ? "bg-black ":"bg-white"}  flex flex-col`} onClick={()=>{ControlDarkMode()}}>
        <div className={`w-3 h-3 rounded-[50%] border-1 ${isDarkmode ? "bg-white self-end":"bg-black self-start"}  self-end`}></div>
      
    </div>
     </div>

 </div>

</div>






</div>


 );




    }


    if(ismaxsize){


return(
<div className={`w-[200px]    flex gap-[10px] flex-col  pt-[20px] max-sm:hidden   ${isDarkmode ?"bg-gray-800 text-white":"bg-gray-500  text-white"} `}>

  <Link to={'/Dashboard'}>
  
   <div className="self-start py-[30px] items-center flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">
< FontAwesomeIcon icon={faDashboard} className="text-[20px] text-black"></FontAwesomeIcon>
<button className="text-2xl font-bold  cursor-pointer">Dashboard</button>

</div>
</Link>

  <Link to={'/RegisterNewStudent'}> 
  
   <div className="self-start items-center py-[30px] flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">
<FontAwesomeIcon icon={faUserPlus} className="text-[20px] text-black"/>
Register new student

</div>
</Link>

{


   UserInformation?.role==='Admin'  && (

    <Link to={'/RegisterNewEmployee'}>
<div className="self-start py-[30px] items-center flex gap-[5px] cursor-pointer   hover:bg-gray-700 transition-all duration-200  w-full">
<FontAwesomeIcon icon={faUserPlus}  className="text-[20px] text-black"/>
Register new Employee

</div>
</Link>


  )
}



{
 
  
  UserInformation?.role==='Admin'  && (

    <Link to={'/createTask'}>
<div className="self-start py-[30px] items-center flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">

    <FontAwesomeIcon icon={faPlusCircle}  className="text-[20px] text-black"/>
    Create Task 
</div>
</Link>

  )
}




<div className="self-start relative  items-center flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full">
  
   <div className=" items-center py-[30px] flex gap-[5px] hover:bg-gray-700 transition-all duration-200 cursor-pointer  w-full" onClick={()=>{setDisplaySetting(pre=>!pre)}}> <FontAwesomeIcon className=" text-[20px] text-black" icon={faCog}  />
  <span>Settings</span></div>

<div className={`shadow-md flex flex-col gap-[20px] py-[5px] absolute z-500  left-[10px] rounded-[5px]  -top-[230px] ${isDarkmode ? "bg-gray-800 text-white border-1 border-white ":" bg-white text-black "}
    ${DisplaySetting ?"flex":"hidden"}`}>
<Link to='/changePassword'>
<div className={`${isDarkmode ? "hover:bg-white hover:text-black":""} flex gap-[5px] items-center w-full text-left px-4 py-2  `}>
  <FontAwesomeIcon className="text-lg font-bold" icon={faLock}></FontAwesomeIcon>  
    <p>Password</p>
     </div>
     </Link>
     <div className={`${isDarkmode ? "hover:bg-white hover:text-black":""} flex gap-[5px] items-center w-full text-left px-4 py-2  `}>

       <FontAwesomeIcon className="text-lg font-bold" icon={faHandsBound}></FontAwesomeIcon> <p>About Application</p>
     </div>
     <div className={`${isDarkmode ? "hover:bg-white hover:text-black":""} flex gap-[5px] items-center w-full text-left px-4 py-2  `}>

      <FontAwesomeIcon className="text-lg font-bold" icon={faQuestion}></FontAwesomeIcon>  <p>Help/FAQ</p>
     </div>
     <div className={`${isDarkmode ? "hover:bg-white hover:text-black":""} flex gap-[5px] items-center justify-between w-full text-left px-4 py-2  `}>
    <div className="flex items-center gap-[5px]">  <FontAwesomeIcon icon={faMoon} className="text-lg font-bold"></FontAwesomeIcon> <p>Dark Mode</p></div>
    <div className={`w-9 h-6 border-1 rounded-[10px] justify-center ${isDarkmode ? "bg-black ":"bg-white"}  flex flex-col`} onClick={()=>{ControlDarkMode()}}>
        <div className={`w-3 h-3 rounded-[50%] border-1 ${isDarkmode ? "bg-white self-end":"bg-black self-start"}  self-end`}></div>
      
    </div>
     </div>

 </div>

</div>






</div>





)




    }


    
}
 
export default SideMenu;