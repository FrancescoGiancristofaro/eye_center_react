import React from 'react';
import ReactDOM from 'react-dom';
import "./Branches.css";

class Branches extends React.Component {
    renderBranches(){
       return this.props.data.map((branch,numberBranch) => {
           const { idBranch, address, city, switchboardNumber } = branch
           return (
               <tr key={idBranch}>
                   <th scope="row">{idBranch}</th>
                   <td>{city}</td>
                   <td>{address}</td>
                   <td>{switchboardNumber}</td>
               </tr>
           )
       })
    }
    render() {

        return (
            <table className="table branchesTable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Città</th>
                    <th scope="col">Indirizzo</th>
                    <th scope="col">Numero centralino</th>
                </tr>
                </thead>
                <tbody>
                {this.renderBranches()}
                </tbody>
            </table>

        );
    }
}

export default Branches;