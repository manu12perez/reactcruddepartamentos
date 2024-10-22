import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class HomeDepartamentos extends Component {
  state = {
    status: false,
    departamentos: [],
  };

  loadDepartamento = () => {
    let request = "api/departamentos";
    let url = Global.apiUrlDepartamentos + request;

    axios.get(url).then((response) => {
      console.log("Leyendo departamentos");
      this.setState({
        departamentos: response.data,
        status: true,
      });
    });
  };

  deleteDepartamento = (idDepartamento) => {
    let request = "api/departamentos/" + idDepartamento;
    let url = Global.apiUrlDepartamentos + request;

    axios.delete(url).then(response => {
      console.log("Eliminado")
      this.loadDepartamento();
    })
  }

  componentDidMount = () => {
    this.loadDepartamento();
  };

  render() {
    if (this.state.status == false) {
      return (
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
      )
    } else {
      return (
        <div>
          <h1>Home Departamentos</h1>
          <table className="table table-warning">
            <thead>
              <tr>
                <th>Id departamento</th>
                <th>Nombre</th>
                <th>Localidad</th>
                <th>Funcionalidad</th>
              </tr>
            </thead>
            <tbody>
              {this.state.departamentos.map((departamento, index) => {
                return (
                  <tr key={index}>
                    <td>{departamento.numero}</td>
                    <td>{departamento.nombre}</td>
                    <td>{departamento.localidad}</td>
                    <td>
                      <NavLink to={"/detalles/" + departamento.numero} className={"btn btn-info"}>Detalle</NavLink>
                      <NavLink to={"/update/" + departamento.numero + "/" + departamento.nombre + "/" + departamento.localidad} className={"btn btn-success"}>
                        Modificar
                      </NavLink>
                      <NavLink to={"/delete/" + departamento.numero} className={"btn btn-danger"}>
                        Eliminar
                      </NavLink>
                      {/* <button className="btn btn-danger" onClick={() => {this.deleteDepartamento(departamento.numero)}}>
                        Eliminar
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
