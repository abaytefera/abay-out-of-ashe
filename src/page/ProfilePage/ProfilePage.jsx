import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ControlLogic } from "../../ControlLofic/Controllogic";
import { userControl } from "../../context/Controluser";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";

const ProfilePage = () => {
  const { isDarkmode } = ControlLogic();
  const { UserInformation, ChangeUserInformation } = userControl();
  const [isEditing, setIsEditing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    educationBackground: "",
  });
  const [isLoading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  // Listen to auth changes and update user info context
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) ChangeUserInformation(user);
      else ChangeUserInformation(null);
    });
    return () => unsub();
  }, [ChangeUserInformation]);

  // Populate form when user info changes
  useEffect(() => {
    if (UserInformation) {
      setFormInfo({
        firstname: UserInformation.firstname || "",
        lastname: UserInformation.lastname || "",
        email: UserInformation.email || "",
        phone: UserInformation.phone || "",
        educationBackground: UserInformation.educationBackground || "",
      });
    }
  }, [UserInformation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => firstInputRef.current?.focus(), 0);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormInfo({
      firstname: UserInformation.firstname || "",
      lastname: UserInformation.lastname || "",
      email: UserInformation.email || "",
      phone: UserInformation.phone || "",
      educationBackground: UserInformation.educationBackground || "",
    });
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      alert("No authenticated user.");
      return;
    }
    setLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        firstname: formInfo.firstname,
        lastname: formInfo.lastname,
        email: formInfo.email,
        phone: formInfo.phone,
        educationBackground: formInfo.educationBackground,
      });
      // Update local user info context with updated data (formInfo)
      ChangeUserInformation({
        ...UserInformation,
        ...formInfo,
      });

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isDarkmode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } flex flex-col gap-10  pb-30 px-10 overflow-auto relative`}
    >
      {isLoading && (
        <div className="absolute bg-black bg-opacity-50 z-[1000] w-full h-full left-0 top-0 flex items-center justify-center">
          <svg
            className="animate-spin h-20 w-20 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      <div
        className={`font-bold text-start py-2 pl-2 text-lg shadow-md rounded-xl ${
          isDarkmode ? "bg-gray-800" : "bg-white"
        }`}
      >
        My Profile
      </div>

      <div
        className={`flex items-center gap-5 px-5 shadow-md rounded-xl ${
          isDarkmode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-center relative">
          <img
            src="bit.png"
            alt={`${UserInformation?.firstname || "User"}'s Profile`}
            className="w-30 h-30 rounded-full object-cover max-[360px]:w-15 max-[360px]:h-15"
          />
          <FontAwesomeIcon
            icon={faCamera}
            className="absolute right-6 top-24 text-lg cursor-pointer max-[360px]:text-sm max-[360px]:top-10 max-[360px]:right-2 text-gray-900"
            tabIndex={0} // so it's keyboard accessible if you add functionality later
            aria-label="Change profile picture"
          />
        </div>
        <div>
          <p className="text-xl capitalize font-semibold max-[360px]:text-sm">
            {UserInformation?.firstname} {UserInformation?.lastname}
          </p>
          <span className={isDarkmode ? "text-white" : "text-gray-600"}>
            {UserInformation?.role || "User"}
          </span>
        </div>
      </div>

      <div
        className={`shadow-md rounded-xl ${
          isDarkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center p-3">
          <p
            className={`text-xl font-bold max-[360px]:text-sm ${
              isDarkmode ? "text-white" : "text-gray-600"
            }`}
          >
            Personal Information
          </p>
          {!isEditing ? (
            <button
              className="px-4 bg-orange-500 rounded-xl text-white text-sm"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="py-1 px-2 bg-gray-300 rounded-md font-semibold"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="py-1 px-2 bg-sky-500 text-white rounded-md font-semibold"
                type="button"
                onClick={handleSave}
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10 max-[360px]:grid-cols-1 p-5">
          {[
            { label: "First Name", name: "firstname", ref: firstInputRef },
            { label: "Last Name", name: "lastname" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone" },
            { label: "Education Background", name: "educationBackground" },
          ].map(({ label, name, ref, type = "text" }) => (
            <div className="flex flex-col gap-2" key={name}>
              <label
                htmlFor={name}
                className={`self-start text-md font-semibold ${
                  isDarkmode ? "text-white" : "text-gray-500"
                }`}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                ref={ref}
                type={type}
                value={formInfo[name]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`p-4 rounded-lg border outline-green-500 ${
                  !isEditing
                    ? isDarkmode
                      ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                      : "bg-gray-100 text-gray-600 cursor-not-allowed"
                    : "bg-white text-gray-900"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
