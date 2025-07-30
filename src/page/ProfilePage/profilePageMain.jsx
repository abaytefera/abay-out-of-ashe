import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";
import ProfilePage from "./ProfilePage";

const  ProfileMain= () => {

    return (

        <div className="h-screen flex flex-col w-screen">
  <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] overflow-auto    h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<ProfilePage ></ProfilePage>
  </div>
<Footer ></Footer>
</div>

      );
}
 
export default ProfileMain;