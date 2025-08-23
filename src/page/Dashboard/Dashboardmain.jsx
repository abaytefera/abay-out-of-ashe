import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faClock,
  faList,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../componet/footer';
import { ControlLogic } from '../../ControlLofic/Controllogic';
import { userControl } from '../../context/Controluser';
import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);
const DashbordMain = () => {
  const { UserInformation, ChangeUserInformation } = userControl();
  const { isDarkmode } = ControlLogic();
  const navigate = useNavigate();
  const [EmployeList, setEmployeList] = useState([]);
    const headingRef = useRef(null);
    const cursorRef=useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        ChangeUserInformation(user);

        const fetchEmployeeData = async () => {
          try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);

            if (!snapshot.empty) {
              const usersData = snapshot.docs.map((doc) => ({id:doc.id,...doc.data()}));
              const filteredUsers = usersData.filter(
                (item) => item.email !== user.email
              );
              setEmployeList(filteredUsers);
            } else {
              setEmployeList([]);
            }
          } catch (err) {
            console.error('Error fetching employee data:', err.message);
          }
        };

        fetchEmployeeData();
      } else {
        ChangeUserInformation(null);
        navigate('/Login');
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(()=>{
gsap.to(headingRef.current,{
text:`Welcome back,${UserInformation?.firstname ? UserInformation?.firstname:""} ${UserInformation?.lastname ? UserInformation?.lastname:""}`,
duration:3,
ease:'none',
onComplete:()=>{

gsap.to(cursorRef.current,{
opacity:0,
yoyo: true,
 duration: 0.6,
ease: "power1.inOut",



})

}


})





  },[UserInformation])

  const cardData = [
    { label: 'Total Tasks', icon: faList, color: 'bg-pink-400', count: 240 },
    { label: 'Completed Tasks', icon: faCheckCircle, color: 'bg-green-400', count: 112 },
    { label: 'Incomplete Tasks', icon: faTimesCircle, color: 'bg-red-500', count: 99 },
    { label: 'Overdue', icon: faClock, color: 'bg-pink-500', count: 100 },
  ];

  return (
    <div className={` h-screen space-y-100  pt-10 overflow-y-auto pb-15  ${isDarkmode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
      {/* Welcome Header */}
      <div className="mb-6 flex">
        <h1 ref={headingRef} className="text-4xl capitalize ml-10 font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
         
       
        </h1>
         <span className="text-4xl capitalize  font-bold bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 bg-clip-text text-transparent" ref={cursorRef}>|</span>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 gap-4 mx-3 mb-8">
        {cardData.map((item, index) => (
          <div key={index} className={`flex flex-col items-center justify-center gap-2 ${isDarkmode ? 'bg-gray-700' : 'bg-white'} p-4 rounded shadow`}>
            <h2 className="font-semibold text-center">{item.label}</h2>
            <div className="flex items-center gap-3">
              <div className={`${item.color} w-14 h-14 flex items-center justify-center rounded-full hover:scale-110 transition-transform`}>
                <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
              </div>
              <span className="text-lg font-bold">{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Employees & Upcoming Tasks */}
      <div className="flex   justify-end   w-[100%]  lg:flex-row mt-20">
        {/* Employee List */}
        
        {/* Upcoming Tasks */}
        <div className=" self-end mr-10 lg:order-2">
          <h2 className={`${isDarkmode ? 'bg-gray-500' : 'bg-blue-200'} font-bold text-lg mb-3 px-3 shadow-xl  py-2 rounded`}>
            Upcoming Tasks
          </h2>
          <div className="flex flex-col space-x-5 gap-4">
            {['2 days left', '7 days left'].map((day, index) => (
              <div
                key={index}
                className={`flex items-center space-x-5 justify-between p-3 cursor-pointer rounded ${isDarkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition`}
              >
                <p className="font-semibold">Register 10 students</p>
                <span className={`px-2 py-1 text-xs font-bold text-white rounded ${index === 0 ? 'bg-red-800' : 'bg-red-400'}`}>
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <div className='flex justify-start -mt-140 max-md:-mt-70 w-full items-center'>
      <div className=" order-2 lg:order-1  ml-10 min-h-0">
          <h2 className={`${isDarkmode ? 'bg-gray-700' : 'bg-teal-100'} font-bold text-lg mb-3 px-3 py-2 rounded`}>
            Employees
          </h2>
          <div className="flex flex-col px-2 py-1 overflow-auto gap-3 pr-2 shadow-xl rounded">
            {EmployeList.map((emp, index) => (
             < Link to={`/employee/${emp.id}`} key={index}><div
                
                className={`flex items-center justify-between cursor-pointer p-3 ${isDarkmode ? 'hover:bg-gray-600' : 'hover:bg-pink-200'} rounded transition`}
              >
                <div className="flex items-center gap-3">
                  <img src="bit.png" className="w-10 h-10 rounded-full object-cover" alt="Employee" />
                  <div>
                    <p className="font-semibold">{emp.firstname} {emp.lastname}</p>
                    <span className="text-xs">{emp.email}</span>
                  </div>
                </div>
                <span className={`text-sm font-bold ${isDarkmode ? "bg-gray-700 ":"bg-gray-200"} px-3 py-1 rounded`}>
                  {emp.role}
                </span>
              </div>
              </Link>
            ))}
          </div>
        </div>
        </div>

          <Footer />
    </div>
  );
};

export default DashbordMain;
