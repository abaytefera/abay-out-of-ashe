import Footer from "../../componet/footer";
import DashbordHeader from "../Dashboard/homeHeader";
import SideMenu from "../../componet/sideComponen";
import EmployePageMain from "./Employepagemain";

const  EmployeRegisterPage= () => {
    return(

       <div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]     h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<EmployePageMain></EmployePageMain>
  </div>
<Footer ></Footer>
</div> 
    )
   
}
 
export default EmployeRegisterPage;