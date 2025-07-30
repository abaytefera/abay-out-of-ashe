import { useContext } from "react";


import { Navigate } from "react-router-dom";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "./homeHeader";
import DashbordMain from "./Dashboardmain";

import Footer from "../../componet/footer";
const  Dashbord= () => {

  

    const LogOut=async()=>{
await dbSignOut();


    }
    return ( 


<div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]     h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<DashbordMain></DashbordMain>
  </div>
<Footer ></Footer>
</div>


     );
}
 
export default Dashbord;