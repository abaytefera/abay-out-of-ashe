import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";
import RegisterStudentPage from "./RegisterStudentpage";

const  RegisterStudentMain= () => {
    return ( 

<div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]  overflow-auto  h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<RegisterStudentPage></RegisterStudentPage>
  </div>
<Footer ></Footer>
</div>

     );
}
 
export default  RegisterStudentMain;