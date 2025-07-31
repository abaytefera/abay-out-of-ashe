
import SideMenu from "../../componet/sideComponen";
import Footer from "../../componet/footer";
import DashbordHeader from "../Dashboard/homeHeader";
import StudentSinglePage from "./StudentSingle";
const StudentSingleMain= () => {
    return ( 

<div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]   max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<StudentSinglePage></StudentSinglePage>
  </div>
  
  <Footer></Footer>

</div>

     );
}
 
export default StudentSingleMain;