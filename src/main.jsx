import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import Login from './page/LoginPage/login_page.jsx'
import { Route,Routes } from 'react-router-dom'
import PasswordChange from './page/passwordChangepage/passwordChange.jsx'
import Dashbord from './page/Dashboard/Dashboard.jsx'
import SideMenu from './componet/sideComponen.jsx'
import CreateTaskMain from './page/CreateTask/createTaskMain.jsx'
import EmployeRegisterPage from './page/employeRigsterPage/employeRigsterPage.jsx'
import MessagepageMain from './page/messagepage/messagepageMain.jsx'

import NotificationMainPage from './page/NotificationPage/NotificationMainPage.jsx'
import ProfileMain from './page/ProfilePage/profilePageMain.jsx'
import HomeMain from './page/Home.jsx/Homain.jsx'
import InnerChangePasswordMain from './page/InnerChangePassword/InnerChangePasswordMian.jsx'
import RegisterStudentMain from './page/Regsterpage/RegisterStudentMain.jsx'
import StudentSingleMain from './page/StudentSinglePage/StudentSingleMain.jsx'
import What from './page/StudentSinglePage/What.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     
<Router>

   <div className='w-[100%] h-[100%] absolute left-0 bottom-0 top-0'>
  <Routes>
   
<Route path="/"  Component={HomeMain}></Route>
<Route path='/Dashboard' Component={Dashbord}> </Route>
<Route path='/RegisterNewEmployee' Component={EmployeRegisterPage}></Route>
<Route path='/createTask' Component={CreateTaskMain}></Route>
<Route path='/Notification' Component={NotificationMainPage}></Route>
<Route path='/message' Component={MessagepageMain}></Route>
<Route path='/profile' Component={ProfileMain}></Route>
<Route path='/Login' Component={Login}></Route>
<Route path='/HomeMain' Component={HomeMain}></Route>
<Route path='/changePassword' Component={InnerChangePasswordMain}></Route>
<Route path='/RegisterNewStudent' Component={RegisterStudentMain}></Route>
<Route path='/Child/:id' Component={StudentSingleMain}></Route>








  </Routes>
  </div>

 </Router>

  
  </StrictMode>,
)
