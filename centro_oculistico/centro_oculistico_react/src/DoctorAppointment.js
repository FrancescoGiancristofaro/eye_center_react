import React from 'react';
import ReactDOM from 'react-dom';
import "./UserAppointment.css";
import Doctor from "./Doctor";
import ModalUpdateAppointment from "./ModalUpdateAppointment";
import BookAppointment from "./BookAppointment";

var find=false;
class DoctorAppointment extends React.Component {


    renderAppointment(){
        return this.props.data.map((appointment,numberAppointment) => {
            const { appointmentId, doctorId, branchId,day, timeSlot , cdf } = appointment
            if (doctorId==document.getElementById("loginInput").dataset.name+" "+document.getElementById("loginInput").dataset.surname) {
                find=true;
                return (
                    <tr key={numberAppointment}>
                        <th scope="row">{numberAppointment}</th>
                        <td>{appointmentId}</td>
                        <td>{cdf}</td>
                        <td>{branchId}</td>
                        <td>{day}</td>
                        <td>{timeSlot}</td>
                    </tr>
                );
            }
            if (numberAppointment==this.props.data.length-1 && find==false){
                return (<tr style={{color:"red"}}><td></td><td>NESSUN APPUNTAMENTO</td></tr>);
            }
        })
    }
    render() {

        return (
            <div>
                <table style={{backgroundColor:"white"}} className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codice Appuntamento</th>
                        <th scope="col">Utente</th>
                        <th scope="col">Sede</th>
                        <th scope="col">Giorno</th>
                        <th scope="col">Ora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderAppointment()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DoctorAppointment;