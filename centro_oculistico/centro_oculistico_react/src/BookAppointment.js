import React from 'react';
import ReactDOM from 'react-dom';
import "./BookAppointment.css";

function createAppointment(){
    var docId=document.getElementById("inputdoctor");
    var branchId=document.getElementById("inputbranch");
    var requestNewAppointment = {
        "email" : document.getElementById("inputEmail4").value,
        "cdf" : document.getElementById("inputcdf").value,
        "branchId" : branchId.options[branchId.selectedIndex].dataset.id,
        "doctorId" : docId.options[docId.selectedIndex].dataset.id,
        "day" : document.getElementById("inputday").value,
        "timeSlot" : document.getElementById("inputtimeSlot").value
    };
    // Sending and receiving data in JSON format using POST method
//
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 ) {
            if (xhr.status === 201) {
                document.getElementById("homeNav").click();
                alert("Successo! Questo è il codice di prenotazione (NON PERDERLO, ti servirà per modificare o cancellare l'appuntamento): "+JSON.parse(xhr.responseText).idAppointment);
            }else if (xhr.status===400)
                alert(JSON.parse(xhr.responseText).message);
            else if (xhr.status===503)
                alert(JSON.parse(xhr.responseText).message);
        }
    };
    xhr.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/appointment/create.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(requestNewAppointment);
    xhr.send(data);
}
class BookAppointment extends React.Component {
    setEmail(){

        if(document.getElementById("loginInput").value=="S") {
            return (<div className="col-md-6">
                <label htmlFor="inputcdf" className="form-label">Codice Fiscale</label>
                <input type="text" className="form-control" id="inputcdf" value={document.getElementById("loginInput").dataset.cdf} disabled/>
            </div>);
        }else{
            return (<div className="col-md-6">
                <label htmlFor="inputcdf" className="form-label">Codice Fiscale</label>
                <input type="text" className="form-control" id="inputcdf" required/>
            </div>);
        }
    }
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
    render() {
        return (

                        <div className="container-lg">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" required/>
                                </div>
                                {this.setEmail()}
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
                                    <button onClick={createAppointment} type="button" className="btn btn-primary" >Prenota</button>
                                </div>
                            </form>
                        </div>
        );
    }
}

export default BookAppointment;