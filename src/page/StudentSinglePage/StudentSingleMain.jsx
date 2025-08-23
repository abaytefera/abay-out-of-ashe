
import SideMenu from "../../componet/sideComponen";
import Footer from "../../componet/footer";
import DashbordHeader from "../Dashboard/homeHeader";
import StudentSinglePage from "./StudentSingle";
import { ErrorBoundary } from "react-error-boundary";
const StudentSingleMain= () => {
  function ErrorFallBack({error}){
return <div>Something went wrong: {error.message}</div>;

  }
    return ( 

<div className="h-screen flex flex-col w-screen">
 <DashbordHeader></DashbordHeader>
  <div className="grid grid-cols-[200px_1fr] w-[100%] overflow-hidden   max-sm:grid-cols-1">
 <SideMenu></SideMenu>
 <ErrorBoundary FallbackComponent={ErrorFallBack}>
<StudentSinglePage></StudentSinglePage>
</ErrorBoundary>
  </div>
  
  <Footer></Footer>

</div>

     );
}
 
export default StudentSingleMain;