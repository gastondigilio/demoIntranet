import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import {
  createEquipo,
  getEquipos,
  setLoading,
  getEntrenadores,
  getJugadores
} from "../../redux/actions/actions";

import ModalAddEntrenador from "./ModalAddEntrenador";
import ModalAddJugador from "./ModalAddJugador";

import "./CreateEquipo.css";

const CreateEquipo = () => {
  const dispatch = useDispatch();

  const initialInput = {
    nombre: "",
    ciudad: "",
    entrenadoresAgregados: [],
    jugadoresAgregados: [],
  };
  const [input, setInput] = useState(initialInput);
  const [equiposAgregados, setEquiposAgregados] = useState([]);
  const [entrenadoresAgregados, setEntrenadoresAgregados] = useState([]);
  const [jugadoresAgregados, setJugadoresAgregados] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    setEquiposAgregados([...equiposAgregados, input]);
    setInput(initialInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    equiposAgregados.map((equipo) => {
      dispatch(createEquipo(equipo));
    });

    dispatch(setLoading(false));
    setEquiposAgregados([]);
  };

  const handleValidateAgregar = () => {
    if (!validateRepeat() && input.ciudad.length > 3) {
      return false;
    } else {
      return true;
    }
  };

  const handleValidateAceptar = () => {
    return equiposAgregados.length < 1;
  };

  const validateRepeat = () => {
    for (let i = 0; i < equiposAgregados.length; i++) {
      if (equiposAgregados[i].email === input.email) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getEntrenadores());
    dispatch(getJugadores());
    dispatch(getEquipos());
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
  }, []);


  useEffect(() => {
    setInput({ ...input, equiposAgregados })
  }, [equiposAgregados])

  useEffect(() => {
    setInput({ ...input, entrenadoresAgregados, jugadoresAgregados })
  }, [entrenadoresAgregados, jugadoresAgregados])

  useEffect(() => {
    console.log("equiposAgregados", equiposAgregados)
  }, [equiposAgregados])

  return (
    <div className="create-equipo">
      <h2 className="sub-title">Dar de alta equipos</h2>

      {isLoading && <Spinner />}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Nombre del equipo
          </span>

          <input
            name="nombre"
            value={input.nombre}
            placeholder="FC Example"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Nombre"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Ciudad del equipo
          </span>

          <input
            name="ciudad"
            value={input.ciudad}
            placeholder="Example City"
            type="text"
            onChange={(e) => {
              handleInputChange(e);
            }}
            className="form-control"
            aria-label="Ciudad"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Categoría
          </span>

          <input
            name="ciudad"
            // value={input.ciudad}
            placeholder="Juvenil A"
            type="text"
            // onChange={(e) => {
            //   handleInputChange(e);
            // }}
            className="form-control"
            aria-label="Categoría"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Año
          </span>

          <input
            name="año"
            // value={input.ciudad}
            placeholder="1995"
            type="number"
            // onChange={(e) => {
            //   handleInputChange(e);
            // }}
            className="form-control"
            aria-label="Año"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Liga
          </span>

          <input
            name="liga"
            // value={input.ciudad}
            placeholder="Liga profesional"
            type="text"
            // onChange={(e) => {
            //   handleInputChange(e);
            // }}
            className="form-control"
            aria-label="Liga"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Añadir entrenador
          </span>
          <ModalAddEntrenador entrenadoresAgregados={entrenadoresAgregados} setEntrenadoresAgregados={setEntrenadoresAgregados} />
        </div>

        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            Añadir jugador
          </span>
          <ModalAddJugador jugadoresAgregados={jugadoresAgregados} setJugadoresAgregados={setJugadoresAgregados} />
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
              Ciudad
            </th>
          </tr>
        </thead>

        <tbody>
          {!equiposAgregados.length && (
            <tr>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                FC Example
              </td>
              <td
                className="example-text"
                style={{ textAlign: "center", fontSize: "12px" }}
              >
                Example City
              </td>
            </tr>
          )}
          {equiposAgregados.length
            ? equiposAgregados.map((equipo) => {
              return (
                <tr key={equipo.nombre}>
                  <td className="table-data">{equipo.nombre}</td>
                  <td className="table-data">{equipo.ciudad}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
      <div className='listado-agregados'>
        <p>Entrenadores agregados: </p>
        {
          entrenadoresAgregados.map(entrenador => {
            return <p key="entrenador" className="equipo-agregado">{entrenador}</p>
          })
        }
      </div>
      <div className='listado-agregados'>
        <p>Jugadores agregados: </p>
        {
          jugadoresAgregados.map(jugador => {
            return <p key="jugador" className="equipo-agregado">{jugador}</p>
          })
        }
      </div>
    </div>
  );
};

export default CreateEquipo;
