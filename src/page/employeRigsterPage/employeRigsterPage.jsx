import Footer from "../../componet/footer";
import DashbordHeader from "../Dashboard/homeHeader";
import SideMenu from "../../componet/sideComponen";
import EmployePageMain from "./Employepagemain";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";
const  EmployeRegisterPage= () => {
    const {FalseDisplay}=Controllogic();
      useEffect(()=>{
    FalseDisplay();
    
    
      },[])
    return(

       <div className="h-screen flex flex-col overflow-auto  w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]     max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<EmployePageMain></EmployePageMain>
  </div>
<Footer ></Footer>
</div> 
    )
   
}
 
export default EmployeRegisterPage;