import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";

import NotificationPage from "./Notificationpage";
import DashbordHeader from "../Dashboard/homeHeader";
const  NotificationMainPage= () => {


    return ( 
 <div className="h-screen flex flex-col w-screen">
  <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]    h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<NotificationPage ></NotificationPage>
  </div>
<Footer ></Footer>
</div>


     );
}
 
export default NotificationMainPage;