import InnerChangePassword from "./innerChangepass";
import DashbordHeader from "../Dashboard/homeHeader";
import SideMenu from "../../componet/sideComponen";
import Footer from "../../componet/footer";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";


const  InnerChangePasswordMain= () => {
    const {FalseDisplay}=Controllogic();
      useEffect(()=>{
    FalseDisplay();
    
    
      },[])
    return ( 

          <div className="h-screen flex flex-col  w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] overflow-hidden   max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<InnerChangePassword></InnerChangePassword>
  </div>

</div>
     );
}
 
export default InnerChangePasswordMain;