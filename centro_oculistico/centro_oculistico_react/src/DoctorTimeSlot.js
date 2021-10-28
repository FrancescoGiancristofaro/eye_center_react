import React from 'react';
import ReactDOM from 'react-dom';
import Doctor from "./Doctor";
import ModalUpdateAppointment from "./ModalUpdateAppointment";
import BookAppointment from "./BookAppointment";

var num=0;
class DoctorTimeSlot extends React.Component {
    updateData(){

        var doctor_id=document.getElementById("loginInput").dataset.doctorid;
        var passwd=document.getElementById("loginInput").dataset.passwd;
        var slots=new Array();
        for (let item of document.getElementsByClassName("singleSlot")){
            if (item.firstElementChild.value!="NON DISPONIBILE")
            slots[item.dataset.number]=item.firstElementChild.value;
            else
                slots[item.dataset.number]="";
        }
        console.log(slots)
        var updateData={
            "passwd" : passwd,
            "doctor_id" : doctor_id,
            "slots" : slots
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if ( xmlHttp.status == 200) {
                    document.getElementById("homeNavDoctor").click();
                    document.getElementById("doctorCalendarItem").firstElementChild.click();
                    alert(JSON.parse(xmlHttp.responseText).message);
                }else if (xmlHttp.status == 503){
                    alert(JSON.parse(xmlHttp.responseText).message);

                }else if (xmlHttp.status == 400){
                    alert(JSON.parse(xmlHttp.responseText).message);
                }
            }
        }
        xmlHttp.open("POST", "http://127.0.0.1:80/centro_oculistico/centro_oculisticoREST/timeSlot/update.php", true); // true for asynchronous
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(JSON.stringify(updateData));

    }
    onchange(){
        document.getElementById("buttonUpdateSlots").removeAttribute("disabled");
        document.getElementById("buttonUpdateSlots").style.backgroundColor="#0000FF";
        document.getElementById("buttonUpdateSlots").addEventListener("click",this.updateData);
    }
    renderSlots(){

        var data=this.props.data;
        for (var i =0;i<data.length;i++){
            if (data[i].doctor_id==document.getElementById("loginInput").dataset.doctorid){
                var arrayTimeSlot=new Array();
                for (const [key, value] of Object.entries(data[i])) {
                    if (key!="doctor_id"){
                        if (value!="00:00:00" && value!=null && value!="")
                            arrayTimeSlot.push(value)
                        else
                            arrayTimeSlot.push("NON DISPONIBILE")
                    }
                }
                return arrayTimeSlot.map((timeSlot,numberTimeSlot) => {
                    return (
                        <tr key={numberTimeSlot}>
                            <td data-value={timeSlot} data-number={++numberTimeSlot} className="singleSlot"><input onKeyUp={()=> {
                                this.onchange()
                            }} onPaste={()=> {
                                this.onchange()
                            }} onInput={()=> {
                                this.onchange()
                            }} style={{textAlign:"center"}} className="updateTimeSlotData" type="text" defaultValue={timeSlot} /></td>
                        </tr>
                    );

                })
            }
        }

    }
    render() {

        return (
            <div>
                <table style={{backgroundColor:"white",width:"70%",marginLeft:"15%"}} className="table">
                    <thead>
                    <tr>

                        <th scope="col">Fascie orarie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderSlots()}
                    <tr><button style={{marginTop:"15px",marginBottom:"15px",color:"white",backgroundColor:"lightgray",borderRadius:"3px"}} id="buttonUpdateSlots" type="button" disabled>Modifica</button></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DoctorTimeSlot;