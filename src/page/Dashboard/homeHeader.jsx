import {
  faBars,
  faBell,
  faChevronCircleDown,
  faHandsBound,
  faLock,
  faMessage,
  faMoon,
  faQuestion,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userControl } from "../../context/Controluser";
import { Controllogic } from "../../context/controlApplogic";
import { ControlLogic } from "../../ControlLofic/Controllogic";
import { auth, db } from "../../Config/firebase";
import { useMessageStore } from "../../context/messageStore";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";



const DashbordHeader = () => {
  const navigate = useNavigate();
  const { UserInformation } = userControl();
  const { ControlDisplay } = Controllogic();
  const { isDarkmode, ControlDarkMode } = ControlLogic();

  const [SearchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [DisplaySetting, setDisplaySetting] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [light, setLight] = useState(false);
  const {controlCurrentMessage,controlNewMessage,newMessageCount,messageCollection}=useMessageStore()
  
const {FalseDisplay}=Controllogic()

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
     controlCurrentMessage();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    const name = e.target.value.toLowerCase().trim();
    setSearchResult([]);

    if (!name) return;

    try {

      const searchRef = collection(db, 'childinfo');
      const snapshot = await getDocs(searchRef);

      if (!snapshot.empty) {
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filtered = results.filter(item =>
          `${item.childFirstName} ${item.childLastName}`.toLowerCase().includes(name)
        );
        setSearchResult(filtered);
      }
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

useEffect(() => {
  if (!auth?.currentUser?.uid) return;

  const refQuery = collection(db, "chats");
  const q = query(refQuery, where("participants", "array-contains", auth.currentUser.uid));

  const unsub = onSnapshot(q, async (snap) => {
    if (snap.empty) {
      controlNewMessage(0);
      return;
    }

    let countMessage = 0;

    // Use Promise.all to wait for all async checks
    await Promise.all(
      snap.docs.map(async (doc) => {
        const msgRef = collection(db, "chats", doc.id, "messages");
        const msgSnap = await getDocs(msgRef);

        if (!msgSnap.empty) {
          const unseenCount = msgSnap.docs.filter(
            (m) => !m.data().seenBy?.includes(auth.currentUser.uid)
          ).length;

          if (unseenCount > 0) {
            countMessage += 1; // Count chat as having unseen messages
          }
        }
      })
    );

    controlNewMessage(countMessage);
  });

  return () => unsub();
}, [auth?.currentUser?.uid,messageCollection]);





  return (
    <header className={` sticky top-0 z-50    w-full h-[60px] flex items-center justify-between px-10 shadow-md z-50 ${isDarkmode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button className="sm:hidden text-xl" onClick={ControlDisplay}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <img src="https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/out.png" alt="Company Logo" className="w-[100px] h-[40px] object-cover hidden sm:block" />
      </div>

      {/* Center: Search */}
      <div className="relative flex items-center w-full max-w-md justify-center">
        <button onClick={() => setShowSearch(prev => !prev)} className={isDarkmode ? "text-white" : "text-gray-700"}>
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <input
          type="search"
          placeholder="Search..."
          className={`ml-2 border border-gray-300 rounded-lg px-4 py-1 text-sm w-full sm:w-[60%] duration-300 ease-in-out ${showSearch ? "inline-block" : "hidden sm:inline-block"} ${isDarkmode ? "bg-gray-800 text-white placeholder:text-white" : ""}`}
          onChange={handleSearch}
        />

     {SearchResult.length > 0 && (
  <div
    className={`absolute top-12 w-full max-w-md sm:max-w-xl md:max-w-2xl max-h-[300px] overflow-y-auto rounded-lg shadow-xl z-50 ${
      isDarkmode
        ? "bg-gray-800 border border-white text-white"
        : "bg-white text-black"
    }`}
  >
    {SearchResult.map((data, index) => (
      <Link to={`/child/${data.id}`} key={data.id}>
        <div
          className={`flex justify-between items-center gap-4 px-4 py-3 cursor-pointer transition duration-300 ${
            isDarkmode ? "hover:bg-black" : "hover:bg-gray-200"
          }`}
        >
          {/* Profile + Name + Age */}
          <div className="flex items-center gap-3">
            <img
              src={data?.urlChildFiles?.[0]}
              alt="child"
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h1 className="capitalize text-md font-semibold">
                {data.childFirstName} {data.childLastName}
              </h1>
              <p className="text-sm">
                <span className="font-bold">Age: </span>
                {data.childAge}
              </p>
            </div>
          </div>

          {/* Grade */}
          <div className="text-right max-sm:hidden">
            <h1 className="text-md font-semibold">Grade</h1>
            <p className="font-bold text-sm">{data.Grade}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}

      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-6 text-white bg-gray-700 px-4 py-1 rounded-xl">
        {/* Messages */}
        <Link to="/message">
          <div className="relative cursor-pointer">
            <FontAwesomeIcon icon={faMessage} className="text-lg" />
            <span className="absolute -top-2 -right-3 text-xs font-bold bg-red-600 text-white rounded-full px-1">{newMessageCount>0 ?newMessageCount:""}</span>
          </div>
        </Link>

        {/* Notifications */}
        <Link to="/Notification">
          <div className="relative">
            <FontAwesomeIcon icon={faBell} className="text-lg" />
            <span className="absolute -top-2 -right-3 text-xs font-bold bg-red-600 text-white rounded-full px-1">2</span>
          </div>
        </Link>

        {/* Profile Menu */}
        <div className="relative">
          <button onClick={() => {setShowProfileMenu(prev => !prev)
          FalseDisplay()
          }
          } className="flex items-center  gap-2">
            <img src="https://zkjgdrtmexmdmqvstwuz.supabase.co/storage/v1/object/public/my-file/proman.webp" alt="Profile" className="w-10 h-10 rounded-full object-cover " />
<p className="px-4 md:hidden"></p>

            <p className="capitalize hidden sm:block ">
              {UserInformation?.firstname} {UserInformation?.lastname}
                
            </p>
         <span className="max-md:hidden"> <FontAwesomeIcon icon={faChevronCircleDown}  /></span>
          </button>

          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 shadow-md rounded-md w-40 py-2 z-50 ${isDarkmode ? "bg-gray-800 text-white border border-white" : "bg-white text-black"}`}>
              <Link to="/profile">
                <button className={` ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "} w-full text-left px-4 py-2 hover:bg-gray-100`}>Profile</button>
              </Link>

              <button className={`w-full text-left relative ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "}`}>
                <div className="px-4 py-2 hover:bg-gray-100" onClick={() => setDisplaySetting(prev => !prev)}>Settings</div>

                {DisplaySetting && (
                  <div className={`absolute top-10 right-7 w-52 py-2 rounded-md shadow-md z-50 flex flex-col gap-2 ${isDarkmode ? "bg-gray-800 text-white border border-white" : "bg-white text-black"}`}>
                    <Link to="/changePassword">
                      <div className={`${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "}  flex gap-2 items-center px-3 py-2 hover:bg-gray-100`}>
                        <FontAwesomeIcon icon={faLock} />
                        <p>Password</p>
                      </div>
                    </Link>
                    <div className={`flex gap-2 items-center px-3 py-2 ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "} `}>
                      <FontAwesomeIcon icon={faHandsBound} />
                      <p>About Application</p>
                    </div>
                    <div className={`flex ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "} gap-2 items-center px-3 py-2 hover:bg-gray-100`}>
                      <FontAwesomeIcon icon={faQuestion} />
                      <p>Help/FAQ</p>
                    </div>
                    <div className={`flex items-center justify-between px-3 py-2 hover:bg-gray-100 ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "}`}>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMoon} />
                        <p>Dark Mode</p>
                      </div>
                      <div
                        className={`w-9 h-5 rounded-full flex items-center px-1 cursor-pointer ${isDarkmode ? "bg-black" : "bg-gray-300"}`}
                        onClick={() => {
                          setLight(prev => !prev);
                          ControlDarkMode();
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${isDarkmode ? "bg-white ml-auto" : "bg-black"}`} />
                      </div>
                    </div>
                  </div>
                )}
              </button>

              <button className={`w-full text-left px-4 py-2 ${isDarkmode?"hover:bg-white hover:text-gray-800":"hover:bg-gray-100 "}`} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashbordHeader;
