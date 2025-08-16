/* Improved StudentSinglePage.js */
// Note: This version improves responsiveness, styling, layout clarity, and accessibility using TailwindCSS best practices and modern React structure.

import {
  faCancel,
  faCircleArrowLeft,
  faCircleArrowRight,
  faIcons,
  faSearch,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useForm,useFieldArray ,useWatch, set} from "react-hook-form";
import { upload } from "../../Config/storage";

const Spinner = () => (
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
);

const LabelInput = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700 font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="h-10 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50 text-gray-800"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700 font-semibold mb-1">{label}</label>
    <textarea
      {...props}
      className="w-full resize-none overflow-hidden  rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50 text-gray-800"
    />
  </div>
);

const ImageSlider = ({images, currentIndex, onPrev, onNext, showFull, toggleShow }) => {

if(!images || images.length===0) return null

  
 return (<div className={`relative flex items-center justify-between ${showFull ? "absolute inset-0 bg-black/60 p-8 z-50" : "gap-2"}`}>
    <FontAwesomeIcon
      icon={faCircleArrowLeft}
      className={`text-3xl ${currentIndex === 0 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-white"}`}
      onClick={onPrev}
    />
    <img
      src={images?.[currentIndex]}
      alt="preview"
      onClick={toggleShow}
      className={`object-contain rounded-xl ${showFull ? "w-3/4 h-auto" : "w-24 h-24 md:w-40 md:h-40"}`}
    />
    <FontAwesomeIcon
      icon={faCircleArrowRight}
      className={`text-3xl ${currentIndex >= images.length - 1 ? "text-gray-400" : "cursor-pointer text-white"}`}
      onClick={onNext}
    />
    {showFull && (
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-red-500"
        onClick={toggleShow}
      />
    )}
  </div>)
};

const StudentSinglePage = () => {
  const { id } = useParams();
  const [childInfo, setChildInfo] = useState({});
  const [trueChildInfo, setTrueChildInfo] = useState({});
  const [editMode, setEditMode] = useState({ child: true, parent: true });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState({ child: false, parent: false });
  const [imageIndex, setImageIndex] = useState({ child: 0, parent: 0 });
  const [showImage, setShowImage] = useState({ child: false, parent: false });
const [showFirstForm,setShowFirstForm]=useState(false);
const [storePreviewImage,setPreviewImage]=useState({});
const [FileUpload,setFileUpload]=useState({normalFile:[],tempFile:[]});
const [otherData,setotherData]=useState([])
const Submitform=useRef(null);
const Selectvalue=useRef(null)
const [years, setYears]=useState([])
const {register,reset,setValue,handleSubmit,formState:{errors}}=useForm({
  
})
const ChildTextRef=useRef(null);
const ParentTextRef=useRef(null);



  const childInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "childinfo", id);
        const snapshot = await getDoc(ref);
        const Year=new Set();
        if (snapshot.exists()) {
          const data = snapshot.data();
          setChildInfo(data);
          setTrueChildInfo(data);
          setotherData(data.OtherData);
         data.OtherData.forEach((data)=>{

         Year.add(data.storeDate.toDate().getFullYear());

         })
      
         setYears([...Year])
        }
      } catch (err) {
        console.error("Error loading student info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [id]);

  useEffect(()=>{


        ChildTextRef.current.style.height='auto';
     ChildTextRef.current.style.height=`${ ChildTextRef.current.scrollHeight}px`
      ParentTextRef.current.style.height='auto';
  ParentTextRef.current.style.height=`${ ChildTextRef.current.scrollHeight}px`

  },[childInfo.ChildDescription,childInfo.ParentDescription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = (type, enable) => {
    setEditMode((prev) => ({ ...prev, [type]: !enable }));
    if (!enable && type === "child") {
      setTimeout(() => childInputRef.current?.focus(), 0);
    }
  };

  const handleCancel = (type) => {
    setChildInfo(trueChildInfo);
    setEditMode((prev) => ({ ...prev, [type]: true }));
  };

  const handleSave = async (type) => {
    setSaving((prev) => ({ ...prev, [type]: true }));
    const ref = doc(db, "childinfo", id);
    try {
      const updates =
        type === "child"
          ? {
              childFirstName: childInfo.childFirstName,
              childLastName: childInfo.childLastName,
              childPhone: childInfo.childPhone,
              childAge: childInfo.childAge,
              childGrandFather: childInfo.childGrandFather,
              fullName: `${childInfo.childFirstName} ${childInfo.childLastName}`,
              Grade: childInfo.Grade,
              ChildDescription: childInfo.ChildDescription,
            }
          : {
              parentFirstName: childInfo.parentFirstName,
              parentLastName: childInfo.parentLastName,
              parentPhone: childInfo.parentPhone,
              parentGrandFather: childInfo.parentGrandFather,
              ParentDescription: childInfo.ParentDescription,
            };

      await updateDoc(ref, updates);
      toast.success(`${type} info updated successfully.`);
      setEditMode((prev) => ({ ...prev, [type]: true }));
    } catch (err) {
      toast.error("Update failed. Try again.");
    } finally {
      setSaving((prev) => ({ ...prev, [type]: false }));
    }
  };

  

const onsubmit=async(data)=>{

console.log('click start');


try{
const ref=doc(db,'childinfo',id);
await updateDoc(ref,{
OtherData:arrayUnion({...data,storeDate:Timestamp.now()})
})

console.log('succful store');
setShowFirstForm(false);
reset();
setFileUpload((pre)=>({...pre,normalFile:[],tempFile:[]}));

toast.success('succfuly store data');

}catch(error){

 toast.error('error occure '+ error.message);



}finally{
window.location.reload();
setLoading(false)
 
}

}
const  handleFile=(e)=>{

   console.log("upload message");
  const file=e.target.files[0];
  const currentFile=FileUpload?.tempFile;
 console.log(currentFile);
  
setFileUpload((pre)=>({...pre,tempFile:[...currentFile,file]}));



  }

  const handleStoreFile=(e)=>{
e.preventDefault();

setFileUpload((pre)=>({...pre,normalFile:[...pre.tempFile,...pre.normalFile],tempFile:[]}));
    
  }


const handleform=async(e)=>{

e.preventDefault();
console.log('start upload');
 setLoading(true);


try{

   const fileAdd= await  Promise.all (FileUpload.normalFile.map(async(item)=>{
   
try{

 let fileURL=await upload(item);

          return {fileType:item.type,fileURL:fileURL}


  
}catch(error){

console.log(error.message);

}


   })
  )

setValue('file',fileAdd);

Submitform.current.click();


}

catch(error){
console.log(error.message);


}
  

}
const descriptionTextRef=useRef([]);
useEffect(() => {
  descriptionTextRef.current.forEach((ref) => {
    if (ref) {
      ref.style.height = "auto";
      ref.style.height = `${ref.scrollHeight}px`;
    }
  });
}, [childInfo.OtherData]);

  const abu=[{title:"abay",description:"selam"}]
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }


const  SearchDataBySearch=(e)=>{
e.preventDefault();

console.log(e.target.value);
console.log(trueChildInfo)

if(e.target.value===""){

  setotherData([...trueChildInfo.OtherData])
  setotherData
  return
}else{
setotherData(trueChildInfo.OtherData.filter((data) => 
  data.title.includes(e.target.value)
))}






}

const handleSearchbyselect=()=>{
  console.log(Number(Selectvalue.current.value.trim())+1)

if(Selectvalue.current.value.trim()==="All data"){
 setotherData([...trueChildInfo.OtherData]);
console.log('all')
  console.log([...trueChildInfo.OtherData])
  return
}else{
 setotherData(trueChildInfo.OtherData.filter((data)=>(


  data.storeDate.toDate().getFullYear()===Number(Selectvalue.current.value.trim())

  )))

}



}


  return (
    <div className="p-4 md:p-8 bg-gray-100 pb-30 md:pb-50   overflow-y-auto relative h-screen">
      <ToastContainer />

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
       
          <ImageSlider
            images={childInfo?.urlChildFiles || []}
            currentIndex={imageIndex.child}
            onPrev={() =>
              setImageIndex((prev) => ({ ...prev, child: Math.max(0, prev.child - 1) }))
            }
            onNext={() =>
              setImageIndex((prev) => ({
                ...prev,
                child: Math.min((childInfo?.urlChildFiles?.length-1|| 1) - 1, prev.child + 1),
              }))
            }
            showFull={showImage.child}
            toggleShow={() => setShowImage((prev) => ({ ...prev, child: !prev.child }))}
          />

       

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {childInfo.fullName || "Unnamed"}
            </h1>
            <p className="text-gray-600 text-sm">Age: {childInfo.childAge || "-"}</p>
            <p className="text-gray-600 text-sm">Grade: {childInfo.Grade || "-"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <SectionTitle title="Child Information" />
          <div className="flex justify-end gap-2">
            {!editMode.child ? (
              <>
                <button
                  className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => handleCancel("child")}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleSave("child")}
                  disabled={saving.child}
                >
                  {saving.child ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                onClick={() => handleEditToggle("child", editMode.child)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="First Name"
              name="childFirstName"
              value={childInfo.childFirstName || ""}
              disabled={editMode.child}
              onChange={handleChange}
              ref={childInputRef}
            />
            <LabelInput
              label="Last Name"
              name="childLastName"
              value={childInfo.childLastName || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Phone"
              name="childPhone"
              value={childInfo.childPhone || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Grade"
              name="Grade"
              value={childInfo.Grade || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Grandfather"
              name="childGrandFather"
              value={childInfo.childGrandFather || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
            <LabelInput
              label="Age"
              name="childAge"
              value={childInfo.childAge || ""}
              disabled={editMode.child}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="Description"
            name="ChildDescription"
            value={childInfo.ChildDescription || ""}
            disabled={editMode.child}
            onChange={handleChange}
            ref={ChildTextRef}

          />
        </div>

        <div className="space-y-4">
          <SectionTitle title="Parent Information" />
        {  childInfo?.urlChildFiles?.length>0 
 &&
 (
 
 <ImageSlider
            images={childInfo?.urlParentFiles || []}
            currentIndex={imageIndex.parent}
            onPrev={() =>
              setImageIndex((prev) => ({ ...prev, parent: Math.max(0, prev.parent - 1) }))
            }
            onNext={() =>
              setImageIndex((prev) => ({
                ...prev,
                child: Math.min((urlParentFiles?.urlChildFiles?.length|| 1) - 1, prev.parent + 1),
              }))
            }
            showFull={showImage.parent}
            toggleShow={() => setShowImage((prev) => ({ ...prev, parent: !prev.parent }))}
          />
          
        )
        }
          <div className="flex justify-end gap-2">



  
   {!editMode.parent ? (
              <>
                <button
                  className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
                  onClick={() => handleCancel("parent")}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleSave("parent")}
                  disabled={saving.parent}
                >
                  {saving.parent ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                onClick={() => handleEditToggle("parent", editMode.parent)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabelInput
              label="First Name"
              name="parentFirstName"
              value={childInfo.parentFirstName || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Last Name"
              name="parentLastName"
              value={childInfo.parentLastName || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Phone"
              name="parentPhone"
              value={childInfo.parentPhone || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
            <LabelInput
              label="Grandfather"
              name="parentGrandFather"
              value={childInfo.parentGrandFather || ""}
              disabled={editMode.parent}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="Description"
            name="ParentDescription"
            value={childInfo.ParentDescription || ""}
            disabled={editMode.parent}
            onChange={handleChange}
            ref={ParentTextRef}
          />
        </div>


 {childInfo.OtherData?.length>0 && (

<div className="justify-self-center w-full  space-y-5">
<div className=" w-full space-x-3">
<FontAwesomeIcon icon={faSearch} className="text-2xl font-semibold text-blue-400"></FontAwesomeIcon>
<input type="search"  placeholder="search.."  onChange={SearchDataBySearch}
className="w-100 h-10 max-w-[50%] border-gray-300 border rounded-md outline-none ring ring-blue-300 px-2 py-1"/>
</div>
<div className="w-full space-x-4 pl-9">
<select ref={Selectvalue} className="w-100 h-10 max-w-[80%] ring ring-blue-300  rounded-md">
  <option value="All data">All data</option>
   { years?.map((year)=>(


 
  <option value={year}>{year}</option>
    ))}

</select>
<button className="px-3 py-2 bg-sky-400 rounded-md  cursor-pointer" onClick={handleSearchbyselect}>search</button>
</div>
</div>



 ) }

<div className="space-y-15">

{
otherData?.length>0  && (( otherData ?? []).map((data,indeo)=>(

<div key={indeo} className="flex flex-col gap-2">
<div className="flex flex-col md:flex-row ">
 <LabelInput
              label="Title"
        
              value={data.title|| ""}
         
            />


<div className="flex gap-2 max-md:order-1">
  <span className="text-gray-500 text-md font-bold">Store at </span> 
  {data.storeDate.toDate().toISOString().substring(0, 10)}

</div>
</div>




<div>

{data.file.length>0 && (


data.file.map((fil)=>{


if(fil.fileType.startsWith('image/')){


return(
<div>

<img src={fil.fileURL || "bit.png"}  className="md:w-150 md:h-150 object-contain" />

</div>
)

}else if(fil.fileType.startsWith("video/")){

return
(<video> 

<source src={fil.fileURL} />

</video>
)

}
else if(fil.fileType==="application/pdf"){
return(
<iframe src={fil.fileURL} frameborder="0"></iframe>
)

}
else if(fil.fileType.startsWith('audio/')){
}
else {
  return(
<a href={fil.fileURL} >view File</a>

  )
}





})

) 
}


  
</div>

<div>
  <Textarea
            label="Description"
      
            value={data.description|| ""}
           key={indeo}
           
            ref={(el)=>(descriptionTextRef.current[indeo]=el)}
          />
          </div>
</div>


  ))
)
}



</div>


        <div>
 {!showFirstForm && (
        <button
          className="text-md px-3 md:px-5 font-semibold hover:bg-sky-600 hover:text-white 
        focus:text-white m-auto md:py-2 py-1 rounded-md bg-sky-400 
        focus:ring focus:ring-blue-600 cursor-pointer focus:bg-sky-600"
          onClick={() => setShowFirstForm(true)}
        >
          Add other Info
        </button>
      )}

{showFirstForm && (



        <form className={` flex-col gap-5 justify-self-center  `} onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col space-y-5 self-center w-full max-w-full">
            {/* Title Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="title"
                className="text-gray-700 text-sm font-bold"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="h-10 border rounded-md focus:outline-none focus:ring focus:ring-sky-200"
                placeholder="Title"
                {...register("title")}
              />
            </div>

            {/* File Upload */}
            <div className="cursor-pointer rounded-md flex-col gap-4 flex justify-center items-center relative">
              <label
                htmlFor="file"
                className="text-md cursor-pointer border font-bold border-sky-200"
              >
                <FontAwesomeIcon icon={faUpload} />
                <span> File Upload</span>
              </label>

              <input
                type="file"
                id="file"
                multiple
                className="hidden"
                {...register("file", {
                  onChange: handleFile,
                })}
              />

 {FileUpload?.normalFile.length > 0 &&
  FileUpload?.normalFile.map((currentFile,inde) => {
    const currentFileType = currentFile.type;

    if (currentFileType.startsWith("image/")) {
      return (
        <div className="flex">
        <img
          key={currentFile.name}
          src={URL.createObjectURL(currentFile)}
          className="w-64 h-32 object-contain"
        />
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType === "application/pdf") {
      return (
        <div className="flex">
        <iframe
          key={currentFile.name}
          src={URL.createObjectURL(currentFile)}
          className="w-64 h-32"
        ></iframe>

        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType.startsWith("video/")) {
      return (
        <div className="flex">
        <video
          key={currentFile.name}
          controls
          className="w-64 h-32 object-contain"
        >
          <source
            src={URL.createObjectURL(currentFile)}
            type={currentFileType}
          />
        </video> 
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else if (currentFileType.startsWith("audio/")) {
      return (
        <div className="flex">
        <audio key={currentFile.name} controls>
          <source
            src={URL.createObjectURL(currentFile)}
            type={currentFileType}
          />
        </audio>
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold"></FontAwesomeIcon>
        </div>
      );
    } else {
      return (
        <div className="flex">
        <a
          key={currentFile.name}
          href={URL.createObjectURL(currentFile)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View File ({currentFile.name})
        </a>
        <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,normalFile:pre.normalFile.filter((item,index)=>index!==inde)}))

        }} className="text-lg text-red-700 font-bold" ></FontAwesomeIcon>
        </div>
      );
    }
  })}

              {/* File preview modal */}
              {FileUpload?.tempFile.length > 0 && (
                <div className="absolute text-white h-[max-content] flex-col z-50 bg-gray-800 w-50 max-w-ful rounded space-y-3 px-4 py-3 flex justify-center items-center inset-0">
                  <div>
                    {FileUpload?.tempFile.map((file, indx) => (
                      <div key={indx}><div className="flex items-center gap-1 justify-center">{file?.name} 
                      <FontAwesomeIcon icon={faTimes} onClick={()=>{
setFileUpload((pre)=>({...pre,tempFile:pre.tempFile.filter((item,index)=>index!==indx)}))

        }} className="text-lg text-red-700 font-bold" ></FontAwesomeIcon>
                      </div>
                      </div>
                    ))}
                  </div>

                  <span className="border border-white w-full"></span>

                  <div className="flex gap-3  justify-between">
                    <button
                      type="button"
                      className="bg-sky-500 cursor-pointer px-2 py-1 rounded-md"
                      onClick={() => document.getElementById("file").click()}
                    >
                      Add other
                    </button>
                    <button
                      type="button"
                      className="bg-gray-200 text-black cursor-pointer px-2 py-1 rounded-md"
                      onClick={() =>
                        setFileUpload((prev) => ({ ...prev, tempFile: [] }))
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-blue-700 text-white  cursor-pointer px-2 py-1 rounded-md"
                    onClick={handleStoreFile}>
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col space-y-4">
              <label
                htmlFor="description"
                className="text-gray-700 text-sm font-bold"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="border h-30 px-3 py-2 w-125  max-full resize-none overflow-hidden rounded-md "
              ></textarea>
            </div>

            {/* Cancel & Submit Buttons */}
            <button
              type="button"
              className="cursor-pointer bg-gray-200 self-center py-2 px-3 rounded-md"
              onClick={() => {
               setShowFirstForm(false);
reset();
setFileUpload((pre)=>({...pre,normalFile:[],tempFile:[]}));
              }}
            >
           
              Cancel
            </button>

            <button
              type="button"
              onClick={handleform}
              className="text-md font-semibold hover:text-white cursor-pointer bg-gray-600 hover:bg-gray-800 focus:ring focus:ring-black self-center rounded-md px-3 py-2 md:px-5 md:py-3"
            >
              Submit
            </button>
            <button type="submit" ref={Submitform} className="hidden">submit</button>
          </div>
        </form>
     )}
      </div>

      </div>
  
    </div>
  );
};

export default StudentSinglePage;