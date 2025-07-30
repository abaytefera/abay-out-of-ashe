import {createContext ,useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase";

export const AutheContext=createContext();




const  Context= ({children}) => {
const [currentUser,setCurrentUser]=useState(null)
const [userLoggedin,setUserLoggedin]=useState(false)

const [loding,setLoding]=useState(false);
  useEffect(()=>{
const subscribe=onAuthStateChanged(auth,initialization);
return subscribe;
  },[])

  const initialization=(user)=>{
    setLoding(true)
if(user){
setCurrentUser({...user})
setUserLoggedin(true);


}else{
setCurrentUser(null)
setUserLoggedin(false);

}
setLoding(false)
  }

  return ( 

   <AutheContext.Provider value={{currentUser,userLoggedin}}>
{children}
   </AutheContext.Provider>
   );
}
 
export default Context ;