import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc ,getDoc} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  db } from "../../Config/firebase";

const StudentSinglePage = () => {
  const images = ['bit.png', 'natural.jpg', 'out.png'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - 1;
  const [EditChild,setEditChild]=useState(false)
let  [Childinfo,setChildInfo]=useState([{}]);
const {id}=useParams()
useEffect(()=>{
 const fetchChild=async()=>{

const ChildRef=doc(db,'childinfo',id);
try{



let result=await getDoc(ChildRef)
setChildInfo(result.data());
    }catch(error){

      console.log(error.message)
    }
  }
fetchChild();


},[id])
  const goLeft = () => {
    if (currentIndex >0) {
      setCurrentIndex((prev) => prev - 1);

    }
  };

  const goRight = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
console.log(Childinfo)
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex === maxIndex;

  return (
    <div className="bg-gray-300 px-10 py-10 h-screen overflow-auto pb-40">
        <div className="flex flex-col pb-10 gap-5 bg-white rounded-lg">
      {/* <h1 className="text-2xl font-bold text-gray-500">Student Info</h1> */}

      <div className="flex justify-between items-center pr-5">
        <div className="flex gap-4 items-center">
          <div className="  rounded-lg flex items-center justify-between px-4">
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className={`text-2xl ${isLeftDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={goLeft}
            />

            <img
              src={Childinfo?.urlChildFiles?.[currentIndex]}
              alt="student"
              className="w-100 h-100  object-contain rounded-xl"
            />

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className={`text-2xl ${isRightDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={goRight}
            />
          </div>



          <div>
            <h2 className="capitalize text-lg font-medium">{Childinfo.fullName}</h2>
            <p><span className="font-medium">Age:</span> 24</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium">Grade</h2>
          <p className="text-sm text-gray-800">university</p>
        </div>
      </div>
      <div>
<h1 className="text-4xl text-gray-800 font-bold">ChilD Information</h1>
<div className="flex flex-col px-4">
    {EditChild ?(<div className="self-end flex gap-3"> <button className="px-2 py-1 bg-gray-300 rounded-lg cursor-pointer text-sm">Cancel</button>
     <button className="px-2 py-1 bg-sky-500 rounded-lg cursor-pointer text-sm">Save</button> </div>)
    :
(<button className="self-end px-2 py-1 bg-orange-500 rounded-lg cursor-pointer text-sm">Edit</button>)
    }



<div>

</div>

</div>


      </div>
      </div>
    </div>
  );
};

export default StudentSinglePage;
