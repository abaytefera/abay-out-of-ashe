import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faList, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ControlLogic } from '../../ControlLofic/Controllogic';
import { userControl } from '../../context/Controluser';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const DashbordMain = () => {
  const { UserInformation, User, ChangeUserInformation } = userControl();
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

  return (
    <div className={`grid grid-rows-[80px_200px_1fr] gap-[60px] ${isDarkmode ? "bg-gray-800 text-white" : "bg-gray-200"} h-full overflow-scroll max-sm:overflow-auto max-2xsm:grid-rows-[80px_1fr_1fr] max-sm:w-full p-4 overflow-auto pb-40`}>

      <div>
        <h1 className="text-start capitalize font-bold text-3xl text-gray-400 pt-[30px] max-2xsm:text-xl">
          Welcome back, {UserInformation?.firstname} {UserInformation?.lastname}
        </h1>
      </div>

      <div className="grid grid-cols-4 max-xsm:grid-cols-2 max-2xsm:grid-cols-1 gap-4">
        {[
          { label: 'Total Tasks', icon: faList, color: 'bg-pink-400', count: 240 },
          { label: 'Completed Tasks', icon: faCheckCircle, color: 'bg-green-400', count: 112 },
          { label: 'Incomplete Tasks', icon: faTimesCircle, color: 'bg-red-500', count: 99 },
          { label: 'Overdue', icon: faClock, color: 'bg-pink-500', count: 100 }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-[5px]">
            <h1 className="font-bold">{item.label}</h1>
            <div className="flex items-center gap-[10px]">
              <div className={`${item.color} w-[60px] h-[60px] flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110`}>
                <FontAwesomeIcon icon={item.icon} className="text-white text-[24px] cursor-pointer" />
              </div>
              <span className="font-bold">{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-6 max-md:flex-col">
        <div className="order-2 max-sm:w-full flex-1">
          <h1 className={`${isDarkmode ? "bg-gray-700" : "bg-teal-100"} font-bold text-[20px] mb-2 px-2 py-1 rounded`}>Employees</h1>
          <div className="flex flex-col max-h-100 overflow-auto gap-3 pr-2">
            {EmployeList.map((emp, index) => (
              <div key={index} className="flex items-center justify-between p-2 cursor-pointer hover:bg-pink-200 rounded">
                <div className="flex gap-3 items-center">
                  <img src="bit.png" className="w-10 h-10 rounded-full object-cover" alt="Employee" />
                  <div>
                    <p className="font-bold">{emp.firstname} {emp.lastname}</p>
                    <span className="text-[10px]">{emp.email}</span>
                  </div>
                </div>
                <p className={` ${isDarkmode ? "text-white" : "text-black"} font-bold text-sm px-3 py-1 rounded`}>
                  {emp.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-[30px]">
            <h1 className={`${isDarkmode ? "bg-gray-500" : "bg-blue-200"} font-bold p-2 rounded`}>Upcoming Tasks</h1>
            <div className="flex flex-col gap-[20px]">
              {["2 days left", "7 days left"].map((day, index) => (
                <div key={index} className={`${isDarkmode ? "bg-transparent" : "bg-gray-100"} flex justify-between items-center cursor-pointer p-2 rounded`}>
                  <p className="font-bold">Normal Meeting</p>
                  <h4 className={`bg-red-${index === 0 ? '800' : '400'} text-white font-bold px-2 py-1 rounded text-xs`}>{day}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashbordMain;