
import Footer from "../../componet/footer";
import MessageSection from "./messagepage";
import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "../Dashboard/homeHeader";

const  MessagepageMain= () => {
 
return(

       <div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%]    h-full max-sm:grid-cols-1">
 <SideMenu></SideMenu>
<MessageSection> </MessageSection>
  </div>
<Footer ></Footer>
</div> 
    )
}
 
export default MessagepageMain;