import logo from './logo.svg';
import UserProfile from "./UserProfile";
import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from "./Jumbotron";
import Branches from "./Branches";
import Doctor from "./Doctor";
import BookAppointment from "./BookAppointment";
import JumbotronDoctor from "./JumbotronDoctor";
import UserAppointment from "./UserAppointment";
import DoctorTimeSlot from "./DoctorTimeSlot";
import DoctorAppointment from "./DoctorAppointment";
import DoctorProfile from "./DoctorProfile";

function logoutUser(){
    window.location.href = "/public/index.html";
}
function showAppointmentDoctorData(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {
                var data=JSON.parse(xmlHttp.responseText);
                ReactDOM.render(<DoctorAppointment data={data} />, document.getElementById('main'));

            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/appointment/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}
function showCalendarDoctorData(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {
                var data=JSON.parse(xmlHttp.responseText);
                ReactDOM.render(<DoctorTimeSlot data={data} />, document.getElementById('main'));

            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/timeSlot/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}

function showAppointmentData(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {
                var data=JSON.parse(xmlHttp.responseText);
                ReactDOM.render(<UserAppointment data={data} />, document.getElementById('main'));

            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/appointment/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}
function showDoctorProfile(){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {

                var data=JSON.parse(xmlHttp.responseText);
                for (var i =0;i<data.length;i++){
                    if (data[i].doctorId==document.getElementById("loginInput").dataset.doctorid){
                        ReactDOM.render(<DoctorProfile name={data[i].name} surname={data[i].surname} gender={data[i].gender} dateOfBirth={data[i].dateOfBirth} email={data[i].email} phoneNumber={data[i].phoneNumber} headOffice={data[i].headOffice} />, document.getElementById('main'));
                    }
                }
            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/doctor/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}

function showUserData(){
    if (document.getElementById("loginInput").value=="S"){
        var loginData={
            "passwd" : document.getElementById("loginInput").getAttribute("data-passwd"),
            "cdf" : document.getElementById("loginInput").getAttribute("data-cdf")
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if ( xmlHttp.status == 200) {

                    var data=JSON.parse(xmlHttp.responseText)[0];
                    ReactDOM.render(<UserProfile name={data.name} surname={data.surname} cdf={data.cdf} email={data.email} passwd={data.passwd} gender={data.gender} phoneNumber={data.phoneNumber} dateOfBirth={data.dateOfBirth} />, document.getElementById('main'));

                }else if (xmlHttp.status == 404){
                    alert(JSON.parse(xmlHttp.responseText).message);

                }else if (xmlHttp.status == 400){
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/user/read.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(loginData));
    }else{
        window.location.href = "/public/index.html";
    }
}

function showBranchesData() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {
                var data=JSON.parse(xmlHttp.responseText);
                ReactDOM.render(<Branches data={data} />, document.getElementById('main'));

            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/branch/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}

function showBookAppointment(){
    if (document.getElementById("loginInput").value != "N"){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var doctor = JSON.parse(xmlHttp.responseText);

                    var xmlHttp1 = new XMLHttpRequest();
                    xmlHttp1.onreadystatechange = function () {
                        if (xmlHttp1.readyState == 4) {
                            if (xmlHttp1.status == 200) {
                                var branches = JSON.parse(xmlHttp1.responseText);
                                ReactDOM.render(<BookAppointment branches={branches}
                                                                 doctor={doctor}/>, document.getElementById('main'));
                            } else if (xmlHttp1.status == 404) {
                                alert(JSON.parse(xmlHttp1.responseText).message);

                            } else if (xmlHttp1.status == 400) {
                                alert(JSON.parse(xmlHttp1.responseText).message);
                            }
                        }
                    }
                    xmlHttp1.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/branch/read.php", true); // true for asynchronous
                    xmlHttp1.setRequestHeader("Content-Type", "application/json");
                    xmlHttp1.send(null);

                } else if (xmlHttp.status == 404) {
                    alert(JSON.parse(xmlHttp.responseText).message);

                } else if (xmlHttp.status == 400) {
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/doctor/read.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(null);
    }else {
        document.getElementById("loginButt").click();
    }
}

function showDoctorData(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if ( xmlHttp.status == 200) {
                var doctor=JSON.parse(xmlHttp.responseText);
                ReactDOM.render(<Doctor doctor={doctor} />, document.getElementById('main'));

            }else if (xmlHttp.status == 404){
                alert(JSON.parse(xmlHttp.responseText).message);

            }else if (xmlHttp.status == 400){
                alert(JSON.parse(xmlHttp.responseText).message);
            }
        }
    }
    xmlHttp.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/doctor/read.php", true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);
}




function Navbar() {
    return (
        <div id="menu" className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-light bg-$cyan-100">
                <div className="container-fluid">
                    <a id="homeNav" className="navbar-brand" href="#" onClick={()=>{ return ReactDOM.render(<Jumbotron />,document.getElementById('main'));}}>Centro Vista</a>
                    <a id="homeNavDoctor" className="navbar-brand" href="#" onClick={()=>{ return ReactDOM.render(<JumbotronDoctor  />,document.getElementById('main'));}}>Centro Vista</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    Le nostre sedi
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a onClick={showBranchesData} className="dropdown-item" href="#">Dove siamo?</a></li>
                                    <li><a onClick={showDoctorData} className="dropdown-item" href="#">Dottori e Orari di visita</a></li>

                                </ul>
                            </li>
                            <li className="nav-item">
                                <a id="bookNav" onClick={showBookAppointment} className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true">Prenota la tua Visita</a>
                            </li>
                            <li id="profileItem" className="nav-item">
                                <a className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true" onClick={showUserData}>I miei dati</a>
                            </li>
                            <li id="appointmentItem" className="nav-item">
                                <a className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true" onClick={showAppointmentData}>Le mie prenotazioni</a>
                            </li>
                            <li id="appointmentDoctorItem" className="nav-item">
                                <a className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true" onClick={showAppointmentDoctorData}>Appuntamenti</a>
                            </li>
                            <li id="doctorCalendarItem" className="nav-item">
                                <a className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true" onClick={showCalendarDoctorData}>I miei orari</a>
                            </li>
                            <li id="doctorProfileItem" className="nav-item">
                                <a className="nav-link" href="#" tabIndex="-1"
                                   aria-disabled="true" onClick={showDoctorProfile}>I miei dati</a>
                            </li>
                        </ul>

                                <button id="loginButt" className="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropLogin">Login</button>
                                <button id="signinButt" className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Sign in</button>
                                <button id="logoutButt" onClick={logoutUser} className="btn btn-warning" type="button">Logout</button>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;