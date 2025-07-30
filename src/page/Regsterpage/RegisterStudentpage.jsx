import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faUpload } from "@fortawesome/free-solid-svg-icons";
import { ControlLogic } from "../../ControlLofic/Controllogic";
import { useForm } from "react-hook-form";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { upload } from "../../Config/storage";

const RegisterStudentPage = () => {
  const [checkNext, setCheckNext] = useState(true);

  // Child file state
  const [tempFiles, setTempFiles] = useState([]);
  const [files, setFiles] = useState([]);

  // Parent file state
  const [parentTempFiles, setParentTempFiles] = useState([]);
  const [parentFiles, setParentFiles] = useState([]);

  const { isDarkmode } = ControlLogic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Scroll refs for smooth scrolling when files are added
  const scrollRef = useRef(null);
  const photoScrollRef = useRef(null);
  const parentScrollRef = useRef(null);
  const parentPhotoScrollRef = useRef(null);

  const smallMobile = useMediaQuery({ query: "(max-width:450px)" });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tempFiles, parentTempFiles]);

  useEffect(() => {
    photoScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [files, parentFiles]);

  // Child file handlers
  const handleTempFile = (e) => {
    setTempFiles(Array.from(e.target.files));
  };
  const addFile = (e) => {
    e.preventDefault();
    setFiles((prev) => [...prev, ...tempFiles]);
    setTempFiles([]);
  };
  const cancelFile = (e) => {
    e.preventDefault();
    setTempFiles([]);
  };
  const deleteFile = (ind) => {
    setFiles((prev) => prev.filter((_, index) => index !== ind));
  };

  // Parent file handlers
  const handleParentTempFile = (e) => {
    setParentTempFiles(Array.from(e.target.files));
  };
  const addParentFile = (e) => {
    e.preventDefault();
    setParentFiles((prev) => [...prev, ...parentTempFiles]);
    setParentTempFiles([]);
  };
  const cancelParentFile = (e) => {
    e.preventDefault();
    setParentTempFiles([]);
  };
  const deleteParentFile = (ind) => {
    setParentFiles((prev) => prev.filter((_, index) => index !== ind));
  };

  const childFields = [
    { label: "First Name", id: "childFirstName", type: "text" },
    { label: "Last Name", id: "childLastName", type: "text" },
    { label: "Grand Father Name", id: "childGrandFather", type: "text" },
    { label: "Phone", id: "childPhone", type: "number" },
    { label: "Age when Register", id: "childAge", type: "number" },
    { label: "Date of Register", id: "childRegisterDate", type: "date" },
    { label: "Birth Day", id: "childBirthDay", type: "date" },
    { label: "Grade", id: "Grade", type: "text" },
  ];

  const parentFields = [
    { label: "Parent First Name", id: "parentFirstName", type: "text" },
    { label: "Parent Last Name", id: "parentLastName", type: "text" },
    { label: "Parent Grand Father Name", id: "parentGrandFather", type: "text" },
    { label: "Parent Phone", id: "parentPhone", type: "number" },
  ];

  const handlesubmit = async (data) => {
    try {
      const childInfoRef = doc(collection(db, "childinfo"));

      // Upload child files and parent files and get URLs
      const urlChildFiles = await Promise.all(files.map(upload));
      const urlParentFiles = await Promise.all(parentFiles.map(upload));

      await setDoc(childInfoRef, {
        fullName: `${data.childFirstName} ${data.childLastName}`,
        ...data,
        id: childInfoRef.id,
        urlChildFiles,
        urlParentFiles,
      });

      alert("Student registered successfully.");
      reset();
      setFiles([]);
      setParentFiles([]);
      setCheckNext(true);
    } catch (error) {
      console.error("Error saving form:", error.message);
      alert("Error saving form, please try again.");
    }
  };

  return (
    <div className={`${isDarkmode ? "bg-gray-800" : "bg-gray-200"} overflow-auto p-10 pb-30`}>
      <form
        onSubmit={handleSubmit(handlesubmit)}
        className={`${isDarkmode ? "bg-gray-800 text-white" : "bg-white"} flex flex-col gap-5 rounded-lg pb-5`}
      >
        {/* Step indicator */}
        <div className="flex justify-around items-center py-5">
          <div
            style={{
              backgroundColor: checkNext ? "#45a05cff" : "transparent",
              display: smallMobile && !checkNext ? "none" : "flex",
            }}
            className="flex gap-2 items-center h-[50px] rounded-r-full px-10"
          >
            <div
              className={`w-8 h-8 font-bold flex justify-center items-center rounded-full ${
                checkNext ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              1
            </div>
            <p className="font-bold">Child Information</p>
          </div>

          <div
            style={{
              backgroundColor: !checkNext ? "#45a05cff" : "transparent",
              display: smallMobile && checkNext ? "none" : "flex",
            }}
            className="flex gap-2 items-center h-[50px] rounded-r-full px-10"
          >
            <div
              className={`w-8 h-8 font-bold flex justify-center items-center rounded-full ${
                !checkNext ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              2
            </div>
            <p className="font-bold">Parent Information</p>
          </div>
        </div>

        {/* Step 1 - Child */}
        {checkNext && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 max-xsm:grid-cols-1 gap-5">
              {childFields.map(({ label, id, type }) => (
                <div key={id} className="flex flex-col gap-3">
                  <label htmlFor={id} className="font-medium text-lg">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    {...register(id, { required: `Please enter ${label}` })}
                    className="h-10 p-2 rounded border"
                    placeholder={label}
                  />
                  {errors[id] && (
                    <span className="text-red-500 text-sm">{errors[id]?.message}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Child File Upload */}
            <div className="justify-self-center">
              <label
                htmlFor="childFile"
                className="w-full flex items-center justify-center gap-3 border border-dashed border-sky-300 rounded-md p-4 text-sky-600 cursor-pointer hover:bg-sky-50"
              >
                <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                <span className="font-medium">Upload Profile</span>
              </label>
              <input
                type="file"
                id="childFile"
                className="hidden"
                multiple
                onChange={handleTempFile}
                accept="image/*"
              />
            </div>

            {tempFiles.length > 0 && (
              <div className="flex gap-4 justify-center" ref={scrollRef}>
                <button
                  onClick={addFile}
                  className="bg-blue-500 py-2 px-5 rounded-lg text-white"
                  type="button"
                >
                  Add File
                </button>
                <button
                  onClick={cancelFile}
                  className="bg-red-500 py-2 px-5 rounded-lg text-white"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}

            {files.length > 0 && (
              <div className="flex gap-5 overflow-auto" ref={photoScrollRef}>
                {files.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-40 h-40 object-cover"
                    />
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-lg text-red-600 absolute right-0 top-0 cursor-pointer"
                      onClick={() => deleteFile(idx)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col justify-center items-center gap-5 px-20">
              <label className="text-xl font-bold">Description about Child</label>
              <textarea
                className="resize-none w-full h-40 p-3 border rounded-lg"
                placeholder="Write here..."
                {...register("ChildDescription", { required: "Child description is required" })}
              />
              {errors.ChildDescription && (
                <span className="text-red-500 text-sm">{errors.ChildDescription.message}</span>
              )}
            </div>
          </div>
        )}

        {/* Step 2 - Parent */}
        {!checkNext && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 max-xsm:grid-cols-1 gap-5">
              {parentFields.map(({ label, id, type }) => (
                <div key={id} className="flex flex-col gap-3">
                  <label htmlFor={id} className="font-medium text-lg">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    {...register(id, { required: `Please enter ${label}` })}
                    className="h-10 p-2 rounded border"
                    placeholder={label}
                  />
                  {errors[id] && (
                    <span className="text-red-500 text-sm">{errors[id]?.message}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Parent File Upload */}
            <div className="justify-self-center">
              <label
                htmlFor="parentFile"
                className="w-full flex items-center justify-center gap-3 border border-dashed border-sky-300 rounded-md p-4 text-sky-600 cursor-pointer hover:bg-sky-50"
              >
                <FontAwesomeIcon icon={faUpload} className="text-2xl" />
                <span className="font-medium">Upload Profile</span>
              </label>
              <input
                type="file"
                id="parentFile"
                className="hidden"
                multiple
                onChange={handleParentTempFile}
                accept="image/*"
              />
            </div>

            {parentTempFiles.length > 0 && (
              <div className="flex gap-4 justify-center" ref={parentScrollRef}>
                <button
                  onClick={addParentFile}
                  className="bg-blue-500 py-2 px-5 rounded-lg text-white"
                  type="button"
                >
                  Add File
                </button>
                <button
                  onClick={cancelParentFile}
                  className="bg-red-500 py-2 px-5 rounded-lg text-white"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            )}

            {parentFiles.length > 0 && (
              <div className="flex gap-5 overflow-auto" ref={parentPhotoScrollRef}>
                {parentFiles.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-40 h-40 object-cover"
                    />
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-lg text-red-600 absolute right-0 top-0 cursor-pointer"
                      onClick={() => deleteParentFile(idx)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col justify-center items-center gap-5 px-20">
              <label className="text-xl font-bold">Description about Parent</label>
              <textarea
                className="resize-none w-full h-40 p-3 border rounded-lg"
                placeholder="Write here..."
                {...register("ParentDescription", { required: "Parent description is required" })}
              />
              {errors.ParentDescription && (
                <span className="text-red-500 text-sm">{errors.ParentDescription.message}</span>
              )}
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                className="bg-sky-500 px-10 py-3 self-center rounded-lg text-white hover:bg-sky-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4 px-10">
          { !checkNext && (
            <button
              type="button"
              onClick={() => setCheckNext(true)}
              className="text-gray-600 font-bold hover:underline"
            >
              Back
            </button>
          )}
          { checkNext && (
            <button
              type="button"
              onClick={() => setCheckNext(false)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterStudentPage;
