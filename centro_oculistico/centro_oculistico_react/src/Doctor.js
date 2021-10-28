import React from 'react';
import ReactDOM from 'react-dom';
import "./Doctor.css";
import $ from 'jquery';
import Branches from "./Branches";
import ModalCalendar from "./ModalCalendar";

function counter(){
    var x=0;
    return function (){
        return ++x;
    }
}
var count=counter();


class Doctor extends React.Component {
    showCalendar(doctor_id,name,surname){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                var timeSlot=new Array();
                if ( xmlHttp.status == 200) {
                    var data=JSON.parse(xmlHttp.responseText);
                    for(var i=0;i<data.length;i++){
                        if (data[i].doctor_id==doctor_id){
                            for (const [key, value] of Object.entries(data[i])) {
                                if (key!="doctor_id"){
                                    if (value!="00:00:00" && value!=null && value!="")
                                    timeSlot.push(value)
                                    else
                                        timeSlot.push("NON DISPONIBILE")
                                }
                            }
                        }
                    }
                    ReactDOM.render(<ModalCalendar name={name} surname={surname} slot1={timeSlot[0]} slot2={timeSlot[1]} slot3={timeSlot[2]} slot4={timeSlot[3]} slot5={timeSlot[4]} slot6={timeSlot[5]} slot7={timeSlot[6]} slot8={timeSlot[7]} slot9={timeSlot[8]} slot10={timeSlot[9]} slot11={timeSlot[10]} slot12={timeSlot[11]} slot13={timeSlot[12]} slot14={timeSlot[13]} />, document.getElementById('helper'));
                    document.getElementById("hiddenButton").click();
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

    counter(){
        var x=0;
        return function (){
            return ++x;
        }
    }
    renderDoctor(){
        count=counter();

        return this.props.doctor.map((doctor,idDoctor) => {
            const { doctorId, name, surname, gender , dateOfBirth, email , phoneNumber,headOffice } = doctor;
            var number=count();
            return (
                <tr key={doctorId}>
                    <th scope="row">{number}</th>
                    <td>{name}</td>
                    <td>{surname}</td>
                    <td>{gender}</td>
                    <td>{dateOfBirth}</td>
                    <td>{email}</td>
                    <td>{headOffice}</td>
                    <td><a onClick={() => this.showCalendar(doctorId,name,surname)} href="#">Vedi orari</a>
                        <button data-doctor={doctorId} id="hiddenButton" type="button" className="btn btn-info btn-lg" data-bs-toggle="modal"
                                data-bs-target="#staticBackdropCalendar"></button></td>
                </tr>
            )
        })
    }
    render() {

        return (
            <table className="table doctorTable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Cognome</th>
                    <th scope="col">Sesso</th>
                    <th scope="col">Data di nascita</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ufficio</th>
                    <th scope="col"></th>

                </tr>
                </thead>
                <tbody>
                {this.renderDoctor()}

                </tbody>
            </table>

        );
    }
}

export default Doctor;