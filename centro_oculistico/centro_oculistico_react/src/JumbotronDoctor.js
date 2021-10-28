import './JumbotronDoctor.css';
import ReactDOM from "react-dom";
import React from "react";

function JumbotronDoctor(){
    return(


        <div className="container">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white">
                    <h1 className="mb-3">Benvenuto Dott. {document.getElementById("loginInput").dataset.name+" "+document.getElementById("loginInput").dataset.surname}</h1>
                    <h4 className="mb-3">Da questo pannello puoi gestire comodamente i tuoi orari e consultare gli appuntamenti</h4>

                </div>
            </div>

        </div>
    );
}
export  default JumbotronDoctor;

