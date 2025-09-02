
import Footer from "../../componet/footer";
import MessageSection from "./messagepage";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";
import { Controllogic } from "../../context/controlApplogic";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
const  MessagepageMain= () => {
   const {FalseDisplay}=Controllogic();
     useEffect(()=>{
   FalseDisplay();
   
   
     },[])

const errorFallBack=({error})=>{

return <div>something error happen {error.message}</div>


}

return(

       <div className="h-screen flex flex-col  w-screen " >
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] mb-5 overflow-hidden  max-sm:grid-cols-1 ">
 <SideMenu></SideMenu>
<ErrorBoundary FallbackComponent={errorFallBack}>
  <MessageSection> </MessageSection>
  </ErrorBoundary>
  </div>

</div> 
    )
}
 
export default MessagepageMain;