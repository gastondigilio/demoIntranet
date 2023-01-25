import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createEntrenador,
  getEntrenadores,
  setLoading,
} from "../../redux/actions/actions";

import emailjs from '@emailjs/browser';

import "./CreateEntrenador.css";

import Spinner from "../Spinner/Spinner";
import { BASE_URL, REGISTER_ENTRENADOR } from "../../config";

const CreateEntrenador = () => {
  const dispatch = useDispatch();
  const linkEntrenador = "google.com"

  const initialInput = {
    nombre: "",
    email: "",
  };
  const [input, setInput] = useState(initialInput);
  const [entrenadoresAgregados, setEntrenadoresAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    setEntrenadoresAgregados([...entrenadoresAgregados, input]);
    setInput(initialInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    emailjs.init("A_EZ040hD2lkySGIj");

    entrenadoresAgregados.map(entrenador => {
      emailjs.send("service_0kg3rpc", "template_0vvf34c", {
        from_name: "CallStack IT",
        to_name: entrenador.nombre,
        to_email: entrenador.email,
      });
    })

    // entrenadoresAgregados.map((entrenador) => {
    //   try {
    //     dispatch(createEntrenador(entrenador));
    //   } catch (error) {
    //     console.log("ERROR: ", error);
    //   }
    //   dispatch(getEntrenadores());
    // });

    dispatch(setLoading(false));
    setEntrenadoresAgregados([]);
  };

  const handleValidateAgregar = () => {
    let regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !validateRepeat() &&
      regexEmail.test(input.email) &&
      input.nombre.length > 2
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleValidateAceptar = () => {
    return entrenadoresAgregados.length < 1;
  };

  const validateRepeat = () => {
    for (let i = 0; i < entrenadoresAgregados.length; i++) {
      if (entrenadoresAgregados[i].email === input.email) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="create-entrenador">
      <h2 className="sub-title">Dar de alta entrenadores</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre
          </span>

          <input
            name="nombre"
            value={input.nombre}
            placeholder="Juan Pérez"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Email
          </span>

          <input
            name="email"
            value={input.email}
            placeholder="juanperez@example.com"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Email"
            aria-describedby="addon-wrapping"
          />
        </div>

        {/* <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Contraseña
          </span>

          <input
            name="password"
            value={input.password}
            placeholder="Ingrese una contraseña"
            type="password"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Password"
            aria-describedby="addon-wrapping"
          />
        </div> */}

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-primary me-md-2"
            type="button"
            onClick={(e) => {
              handleAgregar(e);
            }}
            disabled={handleValidateAgregar()}
          >
            Agregar
          </button>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={handleValidateAceptar()}
          >
            Aceptar
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Nombre
            </th>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Email
            </th>
          </tr>
        </thead>

        <tbody>
          {!entrenadoresAgregados.length && (
            <tr>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                Juan Pérez
              </td>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                juanperez@example.com
              </td>
            </tr>
          )}
          {entrenadoresAgregados.length
            ? entrenadoresAgregados.map((entrenador) => {
              return (
                <tr key={entrenador.email}>
                  <td className="table-data">{entrenador.nombre}</td>
                  <td className="table-data">{entrenador.email}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default CreateEntrenador;
