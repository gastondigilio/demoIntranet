import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUid,
  setUserType,
  getEntrenadores,
  createEntrenador,
  getEquipos
} from "../../redux/actions/actions";

import emailjs from "@emailjs/browser";

import "./CreateEntrenador.css";

import Spinner from "../Spinner/Spinner";
import { ENTRENADORES, PRESIDENTE } from "../../config";
import ErrorPermisos from "../ErrorPermisos/ErrorPermisos";

const CreateEntrenador = () => {
  const dispatch = useDispatch();
  const initialInput = {
    nombre: "",
    email: "",
    nombreEquipo: "Real Madrid",
  };

  const [input, setInput] = useState(initialInput);
  const [entrenadoresAgregados, setEntrenadoresAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const entrenadores = useSelector((state) => state.entrenadores);
  const userType = useSelector((state) => state.userType);
  const uid = useSelector((state) => state.uid);
  const equipos = useSelector(state => state.equipos)
  console.log(equipos, "EQUIPOS")

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
    entrenadoresAgregados.map((entrenador) => {
      dispatch(createEntrenador(entrenador));
    });

    if (!error) {
      emailjs.init("A_EZ040hD2lkySGIj");

      entrenadoresAgregados.map((entrenador) => {
        emailjs.send("service_0kg3rpc", "template_rjblcxj", {
          from_name: "CallStack IT",
          to_name: entrenador.nombre,
          to_email: entrenador.email,
        });
      });
    }

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

  useEffect(() => {
    dispatch(getEntrenadores());
    dispatch(getEquipos());
    dispatch(setLoading(true));
    dispatch(setUid(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
  }, []);

  useEffect(() => {
    if (uid) dispatch(setUserType(uid, entrenadores.data, []));
  }, [entrenadores, uid]);

  const handleSelectChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : userType === PRESIDENTE || userType === ENTRENADORES ? (
        <div className="create-entrenador">
          <h2 className="sub-title">Dar de alta entrenadores</h2>

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

            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Equipo
              </span>
              <select name="nombreEquipo" value={input.nombreEquipo} onChange={(e) => {handleSelectChange(e)}}>
                <option>Seleccione un equipo</option>
                {equipos?.map(t =>{
                  return(
                    <>
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                    </>
                  )
                })}
              </select>

              {/* <input
                name="nombreEquipo"
                value={input.nombreEquipo}
                placeholder="Juvenil a"
                type="text"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="form-control"
                aria-label="nombreEquipo"
                aria-describedby="addon-wrapping"
              /> */}
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
      ) : (
        <ErrorPermisos />
      )}
    </>
  );
};

export default CreateEntrenador;
