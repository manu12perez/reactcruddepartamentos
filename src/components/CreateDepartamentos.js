import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";

export default class CreateDepartamentos extends Component {
  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaLocalidad = React.createRef();

  state = {
    status: false,
  }

  insertarDepartamento = (e) => {
    e.preventDefault();
    let request = "api/departamentos";
    let url = Global.apiUrlDepartamentos + request;

    let id = parseInt(this.cajaId.current.value);
    let nombre = this.cajaNombre.current.value;
    let localidad = this.cajaLocalidad.current.value;

    let departamento = {
        numero: id,
        nombre: nombre,
        localidad: localidad
    }

    axios.post(url, departamento).then(response => {
        console.log("Insertado")
        this.setState({
            status: true,
        })
    })
  }

  render() {
    if (this.state.status == true) {
        return (<Navigate to="/" />)
    } else {
        return(
            <div>
                <h1>Nuevo Departamento</h1>
                <form>
                    <label>Id departamento</label>
                    <input type="text" ref={this.cajaId} className="form-control"></input>
                    <label>Nombre</label>
                    <input type="text" ref={this.cajaNombre} className="form-control"></input>
                    <label>Localidad</label>
                    <input type="text" ref={this.cajaLocalidad} className="form-control"></input>
                    <br />
                    <button className="btn btn-info" onClick={this.insertarDepartamento}>
                        Insertar departamento
                    </button>
                </form>
            </div>
        )
    }
  }
}
