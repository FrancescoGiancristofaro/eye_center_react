import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from "./UserProfile";


class ModalUpdateAppointment extends React.Component {
    renderBranches(){
        return this.props.branches.map((branches,id_Branch) => {
            const { city, address , idBranch } = branches;
            return (
                <option key={idBranch} data-id={idBranch}>
                    {city} , {address}
                </option>
            )
        })
    }
    renderDoctor(){
        return this.props.doctor.map((doctor,doctor_id) => {
            const { name, surname , doctorId } = doctor;
            return (
                <option key={doctorId} data-id={doctorId}>
                    Dott. {name} {surname}
                </option>
            )
        })
    }

    updateAppointment(appointmentId,cdf){
        var docId=document.getElementById("inputdoctor");
        var branchId=document.getElementById("inputbranch");
        var updateData={
            "appointmentId" : appointmentId,
            "cdf" : cdf,
            "branchId" : branchId.options[branchId.selectedIndex].dataset.id,
            "doctorId" : docId.options[docId.selectedIndex].dataset.id,
            "timeSlot" : document.getElementById("inputtimeSlot").value,
            "day" : document.getElementById("inputday").value
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if ( xmlHttp.status == 200) {
                    document.getElementById("appointmentItem").firstElementChild.click();
                    document.getElementById("closeButton").click();
                    alert(JSON.parse(xmlHttp.responseText).message+" "+JSON.parse(xmlHttp.responseText).idAppointment);
                }else if (xmlHttp.status == 503){
                    alert(JSON.parse(xmlHttp.responseText).message);

                }else if (xmlHttp.status == 400){
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/appointment/update.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(updateData));

    }

    deleteAppointment(appointmentId,cdf){
        var del=prompt("Sei sicuro di voler disdire l'appuntamento selezionato? L'operazione è irreversibile. Si/No");
        if (del.toLowerCase()=="si"){

            var deleteData={
                "appointmentId" : appointmentId,
                "cdf" : cdf
            }
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    if ( xmlHttp.status == 200) {
                        document.getElementById("appointmentItem").firstElementChild.click();
                        document.getElementById("closeButton").click();
                        alert(JSON.parse(xmlHttp.responseText).message);
                    }else if (xmlHttp.status == 503){
                        alert(JSON.parse(xmlHttp.responseText).message);

                    }else if (xmlHttp.status == 400){
                        alert(JSON.parse(xmlHttp.responseText).message);
                    }
                }
            }
            xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/appointment/delete.php", true); // true for asynchronous
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(deleteData));
        }

    }
    render() {
        return (

            <div className="modal fade" id="staticBackdropUpdateAppointment" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Dettagli Appuntamento</h5>
                            <button id="closeButton" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="inputbranch" className="form-label">Sede</label>
                                    <select id="inputbranch" className="form-select" required>
                                        {this.renderBranches()}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputdoctor" className="form-label">Dottore</label>
                                    <select id="inputdoctor" className="form-select" required>
                                        {this.renderDoctor()}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="inputday" className="form-label">Giorno</label>
                                    <input type="text" className="form-control" id="inputday"
                                           placeholder="AAAA-MM-DD" required/>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="inputtimeSlot" className="form-label">Fascia oraria</label>
                                    <input type="text" className="form-control" id="inputtimeSlot"
                                           placeholder="HH:MM:SS" required/>
                                </div>


                                <div className="modal-footer">
                                    <button id="deleteButton" onClick={()=> {
                                        this.deleteAppointment(this.props.appointmentId, this.props.cdf)
                                    }} type="button" className="btn btn-secondary btn-danger" >Cancella Appuntamento
                                    </button>
                                    <button type="button" onClick={()=> {
                                        this.updateAppointment(this.props.appointmentId, this.props.cdf)
                                    }} className="btn btn-primary">Modifica</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default ModalUpdateAppointment;