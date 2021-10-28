function signInUser(){
    var requestNewUser = {
        "email" : document.getElementById("inputEmail4").value,
        "passwd" : document.getElementById("inputPassword4").value,
        "name" : document.getElementById("inputname4").value,
        "surname" : document.getElementById("inputsurname4").value,
        "cdf" : document.getElementById("inputcdf").value,
        "dateOfBirth" : document.getElementById("inputbirth").value,
        "gender" : document.getElementById("inputgender").value,
        "phoneNumber" : document.getElementById("inputnumber").value,
    };

    // Sending and receiving data in JSON format using POST method
//
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 ) {
            if (xhr.status === 201) {
                window.location.href = "/public/index.html";
                alert(JSON.parse(xhr.responseText).message+" Adesso puoi usufruire dei nostri servizi");
            }else if (xhr.status===400)
                alert(JSON.parse(xhr.responseText).message);
            else if (xhr.status===503)
                alert(JSON.parse(xhr.responseText).message);
        }
    };
    xhr.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/user/create.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(requestNewUser);
    xhr.send(data);

}
function Modal(){
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Registrazione</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">

                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputname4" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="inputname4" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputsurname4" className="form-label">Cognome</label>
                                <input type="text" className="form-control" id="inputsurname4" required/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputcdf" className="form-label">Codice Fiscale</label>
                                <input type="text" className="form-control" id="inputcdf"
                                       placeholder="CHMBMD30C30G442O" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputnumber" className="form-label">Numero di telefono</label>
                                <input type="text" className="form-control" id="inputnumber" required/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputbirth" className="form-label">Data di nascita</label>
                                <input type="text" className="form-control" id="inputbirth" placeholder="AAAA-MM-DD" required/>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="inputgender" className="form-label">Sesso</label>
                                <select id="inputgender" className="form-select" required>
                                    <option>M</option>
                                    <option>F</option>
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={signInUser}>Sign in</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Modal;