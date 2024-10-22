import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class DeleteDepartamento extends Component {

  state = {
    status: false,
  };

  loadDepartamento = () => {
    
  }

  deleteDepartamento = () => {
    let id = this.props.id
    let request = "api/departamentos/" + id;
    let url = Global.apiUrlDepartamentos + request;

    axios.delete(url).then((response) => {
      console.log("Eliminado");
    });
  };

  render() {
    return (
      <div>
        <NavLink to="/">Back to List</NavLink>
        {this.state.status == true ? (
          <div>
            <ul className="list-group-item">
              <li className="list-group-item">
                Número: {this.state.departamento.numero}
              </li>
              <li className="list-group-item">
                Nombre: {this.state.departamento.nombre}
              </li>
              <li className="list-group-item">
                Localidad: {this.state.departamento.localidad}
              </li>
            </ul>
            <button className="btn btn-dark" onClick={this.deleteDepartamento}>
              Eliminar departamento
            </button>
          </div>
        ) : (
          <img
            src={loading}
            style={{
              display: "block",
              margin: "0 auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    );
  }
}
