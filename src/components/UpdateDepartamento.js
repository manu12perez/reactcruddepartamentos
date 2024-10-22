import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate, NavLink } from "react-router-dom";

export default class UpdateDepartamento extends Component {
  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaLocalidad = React.createRef();

  state = {
    status: false,
  };

  updateDepartamento = (e) => {
    e.preventDefault();
    let request = "api/departamentos";
    let url = Global.apiUrlDepartamentos + request;

    let id = parseInt(this.cajaId.current.value);
    let nombre = this.cajaNombre.current.value;
    let localidad = this.cajaLocalidad.current.value;

    let departamento = {
      numero: id,
      nombre: nombre,
      localidad: localidad,
    };

    axios.put(url, departamento).then((response) => {
      console.log("Actualizado");
      this.setState({
        status: true,
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.status == true && <Navigate to="/" />}
        <h1>Update Departamento</h1>
        <NavLink to="/">Back to List</NavLink>
        <form>
          <label>Id departamento</label>
          <input
            type="text"
            ref={this.cajaId}
            defaultValue={this.props.id}
            className="form-control"
          />
          <label>Nombre</label>
          <input
            type="text"
            ref={this.cajaNombre}
            defaultValue={this.props.nombre}
            className="form-control"
          />
          <label>Localidad</label>
          <input
            type="text"
            ref={this.cajaLocalidad}
            defaultValue={this.props.localidad}
            className="form-control"
          />
          <br />
          <button className="btn btn-dark" onClick={this.updateDepartamento}>
            Modificar departamento
          </button>
        </form>
      </div>
    );
  }
}
