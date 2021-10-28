import ReactDOM from "react-dom";
import JumbotronDoctor from "./JumbotronDoctor";

function LogInUser(){
    var radio =document.getElementsByName("inlineRadioOptions");
    var checked;
    for(var i = 0; i < radio.length; i++) {
        if(radio[i].checked)
            checked=radio[i].value;
    }
    if (checked=="Utente"){
        var loginData = {
            "passwd": document.getElementById("inputPassword").value,
            "cdf": document.getElementById("inputcdf1").value
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    //login avvenuto
                    document.getElementById("loginInput").value = "S";
                    document.getElementById("loginInput").setAttribute("data-cdf", loginData.cdf);
                    document.getElementById("loginInput").setAttribute("data-passwd", loginData.passwd);
                    document.getElementById("loginButt").style.display = "none";
                    document.getElementById("signinButt").style.display = "none";
                    document.getElementById("logoutButt").style.display = "block";
                    document.getElementById("profileItem").style.display = "block";
                    document.getElementById("appointmentItem").style.display="block";
                    document.getElementById("closeButton").click();
                    document.getElementById("homeNav").click();

                } else if (xmlHttp.status == 404) {
                    alert(JSON.parse(xmlHttp.responseText).message);

                } else if (xmlHttp.status == 400) {
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/user/read.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(loginData));
    }else {
        var loginData = {
            "passwd": document.getElementById("inputPassword").value,
            "doctorId": document.getElementById("inputcdf1").value
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    //login avvenuto
                    var data=JSON.parse(xmlHttp.responseText);
                    for (var i =0 ; i<data.length;i++){
                        if (data[i].doctorId==loginData.doctorId && data[i].passwd==loginData.passwd){
                            document.getElementById("loginInput").value = "S";
                            document.getElementById("loginInput").setAttribute("data-doctorId", loginData.doctorId);
                            document.getElementById("loginInput").setAttribute("data-passwd", loginData.passwd);
                            document.getElementById("loginInput").setAttribute("data-name", data[i].name);
                            document.getElementById("loginInput").setAttribute("data-surname", data[i].surname);
                            document.getElementById("loginButt").style.display = "none";
                            document.getElementById("signinButt").style.display = "none";
                            document.getElementById("logoutButt").style.display = "block";
                            document.getElementById("bookNav").style.display = "none";
                            document.getElementById("homeNavDoctor").style.display="block";
                            document.getElementById("appointmentDoctorItem").style.display="block";
                            document.getElementById("doctorCalendarItem").style.display="block";
                            document.getElementById("homeNav").style.display="none";
                            document.getElementById("doctorProfileItem").style.display="block";
                            document.getElementById("closeButton").click();
                            document.getElementById("homeNavDoctor").click();
                        }
                    }



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
    }
    }

function ModalLogin(){
    return (
        <div className="modal fade" id="staticBackdropLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">
                            <div className="col-12">
                                <div className="form-check form-check-inline" style={{float: "right"}}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="inlineRadio1" value="Utente" checked/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Utente</label>
                                </div>
                                <div className="form-check form-check-inline" style={{float: "right"}}>
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                           id="inlineRadio2" value="Dottore"/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Dottore</label>
                                </div>

                            </div>
                            <div className="col-12">
                                <label htmlFor="inputcdf1" className="form-label">Codice Fiscale</label>
                                <input type="text" className="form-control" id="inputcdf1"
                                       placeholder="CHMBMD30C30G442O / ID Dottore" required/>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword" required/>
                            </div>

                            <div className="modal-footer">
                                <button id="closeButton" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={LogInUser}>Login</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ModalLogin;