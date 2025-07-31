import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";

import NotificationPage from "./Notificationpage";
import DashbordHeader from "../Dashboard/homeHeader";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";
const  NotificationMainPage= () => {

  const {FalseDisplay}=Controllogic();
    useEffect(()=>{
  FalseDisplay();
  
  
    },[])
    return ( 
 <div className="h-screen flex flex-col w-screen">
  <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]     max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<NotificationPage ></NotificationPage>
  </div>
<Footer ></Footer>
</div>


     );
}
 
export default NotificationMainPage;