import SideMenu from "../../componet/sideComponen";
import DashbordHeader from "./homeHeader";
import DashbordMain from "./Dashboardmain";
import Footer from "../../componet/footer";
import { useEffect } from "react";
import { Controllogic } from "../../context/controlApplogic";
const Dashbord = () => {
  const LogOut = async () => {
    await dbSignOut();
  };

  const {FalseDisplay}=Controllogic();
  useEffect(()=>{
FalseDisplay();


  },[])
  return (
    <div className="h-screen flex flex-col   w-screen">
      <DashbordHeader />

      {/* Main content layout */}
      <div className="grid grid-cols-[200px_1fr] w-[100%]   max-sm:grid-cols-1">
        <SideMenu />
        <DashbordMain />
      </div>

      <Footer />
    </div>
  );
};

export default Dashbord;
