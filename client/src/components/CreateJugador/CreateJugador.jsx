import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import {
  createJugador,
  getJugadores,
  setLoading,
} from "../../redux/actions/actions";

import "./CreateJugador.css";

const CreateJugador = () => {
  const dispatch = useDispatch();

  const initialInput = {
    nombre: "",
    email: "",
  };
  const [input, setInput] = useState(initialInput);
  const [jugadoresAgregados, setJugadoresAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    setJugadoresAgregados([...jugadoresAgregados, input]);
    setInput(initialInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    jugadoresAgregados.map((jugador) => {
      try {
        dispatch(createJugador(jugador));
      } catch (error) {
        console.log("ERROR: ", error);
      }
      dispatch(getJugadores());
    });

    dispatch(setLoading(false));
    setJugadoresAgregados([]);
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
    return jugadoresAgregados.length < 1;
  };

  const validateRepeat = () => {
    for (let i = 0; i < jugadoresAgregados.length; i++) {
      if (jugadoresAgregados[i].email === input.email) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="create-jugador">
      <h2 className="sub-title">Dar de alta jugadores</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre del jugador
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
            Email del jugador
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
          {!jugadoresAgregados.length && (
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
          {jugadoresAgregados.length
            ? jugadoresAgregados.map((jugador) => {
                return (
                  <tr key={jugador.email}>
                    <td className="table-data">{jugador.nombre}</td>
                    <td className="table-data">{jugador.email}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default CreateJugador;
