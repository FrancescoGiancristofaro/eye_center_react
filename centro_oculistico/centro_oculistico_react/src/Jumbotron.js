import './Jumbotron.css';
import ReactDOM from "react-dom";
import BookAppointment from "./BookAppointment";
import React from "react";
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
    }else
    {
        document.getElementById("loginButt").click();
    }
}
function Jumbotron(){
    return(


            <div className="container">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-white">
                        <h1 className="mb-3">Benvenuto!</h1>
                        <h4 className="mb-3">Centro Vista da oltre 50 anni è il principale punto di riferimento per la salute dei tuoi occhi.Con cinque diversi centri e una grande squadra di specialisti, ci impegniamo ogni giorno ad offrire un servizio impeccabile.</h4>
                        <a onClick={showBookAppointment} className="btn btn-outline-light btn-lg" href="#!" role="button">Prenota</a>
                    </div>
                </div>

        </div>
    );
}
export  default Jumbotron;

