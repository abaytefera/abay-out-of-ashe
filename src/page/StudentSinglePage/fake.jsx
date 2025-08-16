import {
  faCancel,
  faCircleArrowLeft,
  faCircleArrowRight,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { ToastContainer, toast } from "react-toastify";

const Spinner=()=>{

    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent animate-spin rounded-full">

    </div>
}
const SectionTitle=({title})=>{
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h1>

}
const LabelInput=({label,...prop})=>{

    <div className="flex flex-col">
<label className="text-sm text-semibold text-gray-700 md-1">{label}</label>
<input type="text"
{...prop}
className="rounded-md h-10 px-3 border-1 border-gray-300 focus:outline-none focus:ring fous:ring-blue-300  disabled:opacity-50 text-gray-800"
/>


    </div>


}


const Textarea=({label,...prop})=>{
    <div className="flex flex-col">
<label>{label}</label>

<textarea {...prop}
className="rounded-md resize-none h-auto border-1 border-gray-200 disabled:opacity-50 text-gray-800 focus:outline-none focus:ring 
foucs:rign-blue-300">


</textarea>
</div>
}

const ImageSlider=({images,currentImage,OnPrev,onNext,showFull,toggleShow})=>{
    <div className={`relative px-2 py-3 ${showFull ? "" :""}`}>
<FontAwesomeIcon icon={faMinus} className="text"></FontAwesomeIcon>


    </div>





    }
const  Fack= () => {
    return (
<div className="p-4 md:p-8 h-screen overflow-y-auto">
<ToastContainer></ToastContainer>




</div>


      );
}
 
export default Fack;