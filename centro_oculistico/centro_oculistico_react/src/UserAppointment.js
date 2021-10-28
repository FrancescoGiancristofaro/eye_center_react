import React from 'react';
import ReactDOM from 'react-dom';
import "./UserAppointment.css";
import Doctor from "./Doctor";
import ModalUpdateAppointment from "./ModalUpdateAppointment";
import BookAppointment from "./BookAppointment";
var find=false;
class UserAppointment extends React.Component {

    openUpdatePanel(cdf,appointmentId){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if ( xmlHttp.status == 200) {
                    var doctor=JSON.parse(xmlHttp.responseText);

                    var xmlHttp1 = new XMLHttpRequest();
                    xmlHttp1.onreadystatechange = function() {
                        if (xmlHttp1.readyState == 4) {
                            if ( xmlHttp1.status == 200) {
                                var branches=JSON.parse(xmlHttp1.responseText);
                                ReactDOM.render(<ModalUpdateAppointment cdf={cdf} appointmentId={appointmentId} branches={branches} doctor={doctor}/>, document.getElementById('helper'))
                                document.getElementById("showUpdateAppointment").click();
                            }else if (xmlHttp1.status == 404){
                                alert(JSON.parse(xmlHttp1.responseText).message);

                            }else if (xmlHttp1.status == 400){
                                alert(JSON.parse(xmlHttp1.responseText).message);
                            }
                        }
                    }
                    xmlHttp1.open("GET", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/branch/read.php", true); // true for asynchronous
                    xmlHttp1.setRequestHeader("Content-Type", "application/json");
                    xmlHttp1.send(null);

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

    renderAppointment(){
        return this.props.data.map((appointment,numberAppointment) => {
            const { appointmentId, doctorId, branchId,day, timeSlot , cdf } = appointment
            if (cdf==document.getElementById("loginInput").dataset.cdf) {
                find=true;
                return (
                    <tr className="roww" onDoubleClick={()=>{this.openUpdatePanel(cdf, appointmentId)}}  key={numberAppointment}>
                        <th scope="row">{numberAppointment}</th>
                        <td>{appointmentId}</td>
                        <td>{doctorId}</td>
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
                    <th scope="col">Dottore</th>
                    <th scope="col">Sede</th>
                    <th scope="col">Giorno</th>
                    <th scope="col">Ora</th>
                </tr>
                </thead>
                <tbody>
                {this.renderAppointment()}
                </tbody>
            </table>
                <button id="showUpdateAppointment" style={{display:"none"}} className="btn btn-link" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropUpdateAppointment"></button>
            </div>
        );
    }
}

export default UserAppointment;