import DashbordHeader from "../../page/Dashboard/homeHeader";
import SideMenu from "../sideComponen";
import Footer from "../footer";

import StudentSinglePage from "./StudentSingle";
const StudentSingleMain= () => {
    return ( 

<div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]  overflow-auto  h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<StudentSinglePage></StudentSinglePage>
  </div>
  
  <Footer></Footer>

</div>

     );
}
 
export default StudentSingleMain;