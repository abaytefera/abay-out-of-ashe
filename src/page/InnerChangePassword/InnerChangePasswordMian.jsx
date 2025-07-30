import InnerChangePassword from "./innerChangepass";
import DashbordHeader from "../Dashboard/homeHeader";
import SideMenu from "../../componet/sideComponen";
import Footer from "../../componet/footer";



const  InnerChangePasswordMain= () => {
    return ( 

          <div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]   h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<InnerChangePassword></InnerChangePassword>
  </div>
<Footer ></Footer>
</div>
     );
}
 
export default InnerChangePasswordMain;