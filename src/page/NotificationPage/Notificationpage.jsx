import { faBell, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ControlLogic } from "../../ControlLofic/Controllogic";

const  NotificationPage= () => {
   const {isDarkmode}=ControlLogic();

let NotificationArray=[{title:"go to office",id:"12",date:"2 day ago"},{title:"register student",id:"15",date:"2 mint ago"}]

    return ( 
        <div className={`${isDarkmode ? "bg-gray-800":""} flex flex-col py-[10px] gap-[20px] overflow-y-auto`}>

           <div className={`${isDarkmode ? "transparent ":"bg-gray-200"} p-[10px]   flex w-full`}>
 <div className={` ${isDarkmode ?"text-white":"text-gray-700"} self-start  `}> <FontAwesomeIcon icon={faBell} className="mr-[5px] text-xl"></FontAwesomeIcon> <span className="text-xl font-semibold ">List Notification</span></div>


           </div>
           <div className="self-start  px-[20px]">
<span>2 Notification</span>

           </div>
           <div className="flex flex-col gap-[20px]">
{
NotificationArray.map((not)=>(


<div key={not.id} className="flex items-center justify-between bg-gray-100 p-[10px]">

<div className="flex items-center gap-[20px] cursor-pointer"><div className="w-4 h-4 bg-green-600 rounded-[50%] border-1"></div> <p> new task create title : {not.title}</p></div> <span>{not.date}</span>  
<FontAwesomeIcon icon={faDeleteLeft } className="text-red text-lg text-red-600 cursor-pointer"></FontAwesomeIcon>

</div>


))}
           </div>
        </div>


     );
}
 
export default NotificationPage;