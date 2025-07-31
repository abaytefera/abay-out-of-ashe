import Footer from "../../componet/footer";
import Log from "../../componet/log";
import Home from "./Home";

const  HomeMain= () => {
    return (

        <div className=" flex flex-col overflow-auto  gap-10">
<Log></Log>
<Home></Home>
<Footer></Footer>
        </div>
      );
}
 
export default HomeMain;