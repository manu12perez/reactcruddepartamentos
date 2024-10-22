import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loading from "./../assets/images/loading.jpg";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Asegúrate de importar SweetAlert

export default class DeleteDepartamento extends Component {

  state = {
    status: false,
    completado: false,
    departamento: null
  };

  findDepartamento = () => {
    let request = "api/departamentos/" + this.props.id; //el id viene dentro de props
    let url = Global.apiUrlDepartamentos + request;

    axios.get(url).then((response) => {
      console.log("Detalles departamento");
      this.setState({
        departamento: response.data,
        status: true
      });
    });
  };

  componentDidMount = () => {
    this.findDepartamento();
  };

  deleteDepartamento = () => {
    // Mostrar alerta de confirmación antes de eliminar
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
      cancelButtonText: "No, ¡cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        let id = this.props.id;
        let request = "api/departamentos/" + id;
        let url = Global.apiUrlDepartamentos + request;

        // Si se confirma, realiza la eliminación
        axios.delete(url).then((response) => {
          console.log("Eliminado " + id);
          this.setState({
            completado: true
          });

          // Mostrar alerta de éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: "El departamento ha sido eliminado.",
            icon: "success"
          });
        });
      }
    });
  };

  render() {
    if (this.state.completado === true) {
      return (<Navigate to="/" />);
    } 
    return (
      <div>
        <NavLink to="/">Back to List</NavLink>
        {this.state.status === true ? (
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
