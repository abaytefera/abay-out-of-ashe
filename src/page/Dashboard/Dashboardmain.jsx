import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faClock,
  faList,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ControlLogic } from '../../ControlLofic/Controllogic';
import { userControl } from '../../context/Controluser';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DashbordMain = () => {
  const { UserInformation, ChangeUserInformation } = userControl();
  const { isDarkmode } = ControlLogic();
  const navigate = useNavigate();
  const [EmployeList, setEmployeList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        ChangeUserInformation(user);

        const fetchEmployeeData = async () => {
          try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);

            if (!snapshot.empty) {
              const usersData = snapshot.docs.map((doc) => doc.data());
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

  const cardData = [
    { label: 'Total Tasks', icon: faList, color: 'bg-pink-400', count: 240 },
    { label: 'Completed Tasks', icon: faCheckCircle, color: 'bg-green-400', count: 112 },
    { label: 'Incomplete Tasks', icon: faTimesCircle, color: 'bg-red-500', count: 99 },
    { label: 'Overdue', icon: faClock, color: 'bg-pink-500', count: 100 },
  ];

  return (
  <div className={` px-10 py-5 ${isDarkmode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
    {/* Welcome Header */}
    <div className="mb-6">
      <h1 className="text-start capitalize font-bold text-2xl sm:text-3xl text-gray-400">
        Welcome back, {UserInformation?.firstname} {UserInformation?.lastname}
      </h1>
    </div>

    {/* Statistics Cards */}
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 `}>
      {cardData.map((item, index) => (
        <div key={index} className={`flex flex-col items-center justify-center gap-2  ${isDarkmode?"bg-gray-700":"bg-white"} p-4 rounded shadow`}>
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
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Employee List */}
      <div className="flex-1 order-2 lg:order-1">
        <h2 className={`${isDarkmode ? 'bg-gray-700' : 'bg-teal-100'} font-bold text-lg mb-3 px-3 py-2 rounded`}>
          Employees
        </h2>
        <div className="flex flex-col max-h-[300px] overflow-auto gap-3 pr-2">
          {EmployeList.map((emp, index) => (
            <div key={index} className={` flex items-center justify-between p-3 ${isDarkmode ?"hover:bg-gray-600":" hover:bg-pink-200"} rounded transition`}>
              <div className="flex items-center gap-3">
                <img src="bit.png" className="w-10 h-10 rounded-full object-cover" alt="Employee" />
                <div>
                  <p className="font-semibold">{emp.firstname} {emp.lastname}</p>
                  <span className="text-xs">{emp.email}</span>
                </div>
              </div>
              <span className="text-sm font-bold px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
                {emp.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="flex-1 order-1 lg:order-2">
        <h2 className={`${isDarkmode ? 'bg-gray-500' : 'bg-blue-200'} font-bold text-lg mb-3 px-3 py-2 rounded`}>
          Upcoming Tasks
        </h2>
        <div className="flex flex-col gap-4">
          {['2 days left', '7 days left'].map((day, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 cursor-pointer rounded ${isDarkmode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}   transition`}
            >
              <p className="font-semibold">register  10 student</p>
              <span className={`px-2 py-1 text-xs font-bold text-white rounded ${index === 0 ? 'bg-red-800' : 'bg-red-400'}`}>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default DashbordMain;
