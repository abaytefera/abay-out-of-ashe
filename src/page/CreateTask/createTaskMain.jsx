import CreateTaskPage from "./createTask_page";
import Footer from "../../componet/footer";
import DashbordHeader from "../Dashboard/homeHeader";
import SideMenu from "../../componet/sideComponen";
import { Controllogic } from "../../context/controlApplogic";
import { useEffect } from "react";
const  CreateTaskMain= () => {

    const {FalseDisplay}=Controllogic();
    useEffect(()=>{
  FalseDisplay();
  
  
    },[])
   return(

       <div className="h-screen flex flex-col  w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]  overflow-hidden   max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<CreateTaskPage></CreateTaskPage>
  </div>
<Footer ></Footer>
</div> 
    )
}
 
export default CreateTaskMain;