import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";
import ProfilePage from "./ProfilePage";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";
const  ProfileMain= () => {
  const {FalseDisplay}=Controllogic();
    useEffect(()=>{
  FalseDisplay();
  
  
    },[])
    return (

        <div className="h-screen flex flex-col w-screen ">
  <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] overflow-auto   max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<ProfilePage ></ProfilePage>
  </div>
<Footer ></Footer>
</div>

      );
}
 
export default ProfileMain;