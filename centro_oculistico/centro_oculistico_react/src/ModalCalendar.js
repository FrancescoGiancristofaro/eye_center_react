import React from 'react';
import ReactDOM from 'react-dom';


class ModalCalendar extends React.Component {

    render() {

        return (
            <div className="modal fade" id="staticBackdropCalendar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="staticBackdropLabel">Orari Dott. {this.props.name+" "+this.props.surname}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="staticBackdropCalendar-body" className="modal-body">
                        <h6>Riceve nelle seguenti fascie orarie:</h6>
                            <br/>
                            <ul className="list-group">
                                <li className="list-group-item">{this.props.slot1}</li>
                                <li className="list-group-item">{this.props.slot2}</li>
                                <li className="list-group-item">{this.props.slot3}</li>
                                <li className="list-group-item">{this.props.slot4}</li>
                                <li className="list-group-item">{this.props.slot5}</li>
                                <li className="list-group-item">{this.props.slot6}</li>
                                <li className="list-group-item">{this.props.slot7}</li>
                                <li className="list-group-item">{this.props.slot8}</li>
                                <li className="list-group-item">{this.props.slot9}</li>
                                <li className="list-group-item">{this.props.slot10}</li>
                                <li className="list-group-item">{this.props.slot11}</li>
                                <li className="list-group-item">{this.props.slot12}</li>
                                <li className="list-group-item">{this.props.slot13}</li>
                                <li className="list-group-item">{this.props.slot14}</li>

                            </ul>
                            <div className="modal-footer">
                                <button id="closeButton" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ModalCalendar;