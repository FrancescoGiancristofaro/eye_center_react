import React from 'react';
import ReactDOM from 'react-dom';
import './UserProfile.css';

class UserProfile extends React.Component {

    showPass(){
        if (document.getElementById('flexCheckIndeterminate').checked){
            document.getElementById("passwd").classList.remove("pass");
            document.getElementById("passwd").classList.add("show");
        }else {
            document.getElementById("passwd").classList.add("pass");
            document.getElementById("passwd").classList.remove("show");
        }
    }

    onchange(){
document.getElementById("buttonUpdate").removeAttribute("disabled");
        document.getElementById("buttonUpdate").addEventListener("click",this.updateData);
    }

    updateData(){

        var cdf=document.getElementById("loginInput").dataset.cdf;
        var passwd=document.getElementById("loginInput").dataset.passwd;
        var updateData={
            "passwd" : passwd,
            "cdf" : cdf,
            "email" : document.getElementById("email").value,
            "phoneNumber" : document.getElementById("phone").value,
            "new_passwd" : document.getElementById("passwd").value
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if ( xmlHttp.status == 200) {
                    document.getElementById("loginInput").setAttribute("data-passwd",document.getElementById("passwd").value)
                    alert(JSON.parse(xmlHttp.responseText).message);
                }else if (xmlHttp.status == 503){
                    alert(JSON.parse(xmlHttp.responseText).message);

                }else if (xmlHttp.status == 400){
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/user/update.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(updateData));
    }
    removeAccount(){
        var del=prompt("Sei sicuro di voler cancellare il tuo profilo? L'operazione è irreversibile. Si/No");
        if (del!="" && del!=null && del!=undefined && del.toLowerCase()=="si"){

            var deleteData={
                "passwd" : document.getElementById("loginInput").dataset.passwd,
                "cdf" : document.getElementById("loginInput").dataset.cdf
            }
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) {
                    if ( xmlHttp.status == 200) {
                        alert(JSON.parse(xmlHttp.responseText).message);
                        window.location.href = "/public/index.html";
                    }else if (xmlHttp.status == 503){
                        alert(JSON.parse(xmlHttp.responseText).message);

                    }else if (xmlHttp.status == 400){
                        alert(JSON.parse(xmlHttp.responseText).message);
                    }
                }
            }
            xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/user/delete.php", true); // true for asynchronous
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify(deleteData));
        }
    }
    render() {

        return (
            <ul style={{backgroundColor:"white"}} className="list-group userProfile">
                <li className="list-group-item"><a onClick={this.removeAccount} style={{color:"red",float:"right"}} href="#">Rimuovi account</a></li>
                <li className="list-group-item"><b className="data">Nome</b> {this.props.name}</li>
                <li className="list-group-item"><b className="data">Cognome</b> {this.props.surname}</li>
                <li className="list-group-item"><b className="data">Email</b> <input onKeyUp={()=> {
                    this.onchange()
                }} onPaste={()=> {
                    this.onchange()
                }} onInput={()=> {
                    this.onchange()
                }} className="updateUserData" id="email" type="email" defaultValue={this.props.email} /></li>
                <li className="list-group-item"><b className="data">Password</b> <input onKeyUp={()=> {
                    this.onchange()
                }} onPaste={()=> {
                    this.onchange()
                }} onInput={()=> {
                    this.onchange()
                }} className="updateUserData pass" id="passwd" type="text" defaultValue={this.props.passwd} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <input  onClick={
                            this.showPass
                        } style={{marginTop:"7px"}} className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />           &nbsp;
                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">Mostra</label>
                    </li>
                <li className="list-group-item"><b className="data">Telefono</b> <input onKeyUp={()=> {
                    this.onchange()
                }} onPaste={()=> {
                    this.onchange()
                }} onInput={()=> {
                    this.onchange()
                }} className="updateUserData" id="phone" type="text" defaultValue={this.props.phoneNumber}/></li>
                <li className="list-group-item"><b className="data">Sesso</b> {this.props.gender}</li>
                <li className="list-group-item"><b className="data">Codice Fiscale</b> {this.props.cdf}</li>
                <li className="list-group-item"><b className="data">Data di nascita</b> {this.props.dateOfBirth}</li>

                <li className="list-group-item"><button id="buttonUpdate" type="button" className="btn btn-primary" disabled>Modifica</button></li>

            </ul>

        );
    }
}

export default UserProfile;