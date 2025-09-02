import Footer from "../../componet/footer";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";
import RegisterStudentPage from "./RegisterStudentpage";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";
const  RegisterStudentMain= () => {

    const {FalseDisplay}=Controllogic();
      useEffect(()=>{
    FalseDisplay();
    
    
      },[])
    return ( 

<div className="h-screen flex flex-col w-screen ">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] overflow-hidden  max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<RegisterStudentPage></RegisterStudentPage>
  </div>
<Footer ></Footer>
</div>

     );
}
 
export default  RegisterStudentMain;