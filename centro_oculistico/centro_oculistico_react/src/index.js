import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import Modal from './Modal';
import ModalLogin from "./ModalLogin";
import ModalCalendar from "./ModalCalendar";
import reportWebVitals from './reportWebVitals';
const UserProfile = React.lazy(() => import("./UserProfile"));

ReactDOM.render(
  <React.StrictMode>
      <Navbar />
      <App />
      <div id="jumbotron" className="p-5 text-center bg-image rounded-3 jumbotron" >
      <div id="main">
      <Jumbotron />
      </div>
          <div id="helper">

          </div>
      </div>
      <Modal />
      <ModalLogin />

    <input type="hidden" id="loginInput"  value="N"/>
  </React.StrictMode>,
  document.getElementById('root')

);
document.getElementById("loginButt").style.display="block"
document.getElementById("signinButt").style.display="block"
document.getElementById("logoutButt").style.display="none"
document.getElementById("profileItem").style.display="none"
document.getElementById("homeNavDoctor").style.display="none"
document.getElementById("appointmentItem").style.display="none";
document.getElementById("appointmentDoctorItem").style.display="none";
document.getElementById("doctorCalendarItem").style.display="none";
document.getElementById("doctorProfileItem").style.display="none";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
