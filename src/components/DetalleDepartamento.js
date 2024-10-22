import React, { Component } from "react";
import Global from "./Global";
import axios from "axios";
import loading from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class DetalleDepartamento extends Component {
  state = {
    departamento: null,
  };

  findDepartamento = () => {
    let request = "api/departamentos/" + this.props.id; //el id viene dentro de props
    let url = Global.apiUrlDepartamentos + request;

    axios.get(url).then((response) => {
      console.log("Detalles departamento");
      this.setState({
        departamento: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.findDepartamento();
  };

  render() {
    return (
      <div>
        <NavLink to="/">Back to List</NavLink>
        {this.state.departamento ? (
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
