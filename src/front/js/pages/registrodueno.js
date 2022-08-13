import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/register.css";
import Shape from "../component/shape";

export const RegistroDueno = () => {
  const owner_route = "/homedueno";
  let navigate = useNavigate();
  const { store, actions } = useContext(Context);

  // States for regristration
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);

  // BackEnd url
  const apiUrl =
    "https://3001-ramsescode-doggerapp-7ynxwuummvv.ws-us60.gitpod.io/owners";

  // Handling the values change
  const handleFname = (e) => {
    setFname(e.target.value);
  };
  const handleLname = (e) => {
    setLname(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBreed = (e) => {
    setBreed(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let body_content = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      name: name,
      breed: breed,
      age: age,
    });
    fetch(apiUrl, {
      method: "POST",
      body: body_content,
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        return result.json().then((data) => ({ status: result.status, data }));
      })
      .then((data) => {
        if (data.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.data.message,
          });
        } else {
          navigate(owner_route);
          actions.getInfo(data.data.results.id);
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="container-fluid">
      <div className="container align-items-center">
        <div className="row d-flex justify-content-center align-items-center h-100 w-75 mx-auto">
          <div className="col">
            <form className="card card-registration my-4 register">
              <div className="row g-0">
                <div className="col-xl-12">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5">CREA TU CUENTA</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleFname}
                            value={first_name}
                            type="text"
                            className="form-control form-control-lg"
                            id="first_name"
                          />
                          <label className="form-label" htmlFor="first_name">
                            Nombre
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleLname}
                            value={last_name}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Apellido</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        onChange={handleEmail}
                        value={email}
                        type="email"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Contraseña</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleUsername}
                            value={username}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">
                            Nombre de Usuario
                          </label>
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-5">REGISTRA A TU MASCOTA</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleName}
                            value={name}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Nombre</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleBreed}
                            value={breed}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Raza</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleAge}
                            value={age}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Edad</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-check mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                          />
                          <label className="form-check-label">
                            Acepto{" "}
                            <a href="#!" className="text-body">
                              <u>Términos y Condiciones</u>
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btn-lg ms-2 rounded-pill text-light"
                          id="btn_register"
                        >
                          Registrarse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Shape />
      </div>
    </div>
  );
};

RegistroDueno.propTypes = {
  match: PropTypes.object,
};
