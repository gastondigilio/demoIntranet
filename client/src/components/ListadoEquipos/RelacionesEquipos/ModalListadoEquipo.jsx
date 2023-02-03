import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getEntrenadores,
  getJugadores,
  relacionarJugadorEquipo,
  relacionarEntrenadorEquipo,
  getEntrenadoresEquipos,
  getJugadoresEquipos,
} from "../../../redux/actions/actions";

import agregarIcon from "../../../images/agregar-icon.svg";

import "./ModalListadoEquipo.css";

export default function ModalListadoEquipo({ nombreEquipo }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialJugador = {
    emailJugador: "",
  };
  const initialEntrenador = {
    emailEntrenador: "",
  };

  const [inputJugador, setInputJugador] = useState(initialJugador);
  const [inputEntrenador, setInputEntrenador] = useState(initialEntrenador);
  const [jugadoresRelacionados, setJugadoresRelacionados] = useState([]);
  const [entrenadoresRelacionados, setEntrenadoresRelacionados] = useState([]);
  const jugadoresEquipos = useSelector((state) => state.jugadoresEquipos);
  const entrenadoresEquipos = useSelector((state) => state.entrenadoresEquipos);
  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const equipos = useSelector((state) => state.equipos);

  useEffect(() => {
    dispatch(getJugadores());
    dispatch(getEntrenadores());
    dispatch(getJugadoresEquipos());
    dispatch(getEntrenadoresEquipos());
  }, []);

  const handleSelectJugador = (e) => {
    setInputJugador({ ...inputJugador, [e.target.name]: e.target.value });
  };

  const handleSelectEntrenador = (e) => {
    setInputEntrenador({ ...inputEntrenador, [e.target.name]: e.target.value });
  };

  const handleSubmitJugador = (e) => {
    e.preventDefault();
    dispatch(
      relacionarJugadorEquipo({
        nombre: nombreEquipo,
        email: inputJugador.emailJugador,
      })
    );
    setInputJugador(initialJugador);
    dispatch(getJugadores());
  };

  const handleSubmitEntrenador = (e) => {
    e.preventDefault();
    dispatch(
      relacionarEntrenadorEquipo({
        nombre: nombreEquipo,
        email: inputEntrenador.emailEntrenador,
      })
    );
    setInputEntrenador(initialEntrenador);
  };

  const handleValidateJugador = () => {
    return inputJugador.emailJugador === "";
  };

  const handleValidateEntrenador = () => {
    return inputEntrenador.emailEntrenador === "";
  };

  const getJugadoresRelacionados = () => {
    const equipo = equipos.data.find(
      (element) => element.nombre === nombreEquipo
    );
    jugadoresEquipos.data?.map((jugadorRelacionado) => {
      if (equipo.id === jugadorRelacionado.equipoId) {
        const jugador = jugadores.data.find(
          (element) => element.id === jugadorRelacionado.jugadorid
        );
        if (
          !jugadoresRelacionados.some(
            (relacionado) => relacionado.id === jugador.id
          )
        ) {
          setJugadoresRelacionados([...jugadoresRelacionados, jugador]);
        }
      }
    });
  };

  const getEntrenadoresRelacionados = () => {
    const equipo = equipos.data.find(
      (element) => element.nombre === nombreEquipo
    );
    entrenadoresEquipos.data?.map((entrenadorRelacionado) => {
      if (equipo.id === entrenadorRelacionado.equipoId) {
        const entrenador = entrenadores.data.find(
          (element) => element.id === entrenadorRelacionado.entrenadorid
        );
        if (
          !entrenadoresRelacionados.some(
            (relacionado) => relacionado.id === entrenador.id
          )
        ) {
          setEntrenadoresRelacionados([
            ...entrenadoresRelacionados,
            entrenador,
          ]);
        }
      }
    });
  };

  useEffect(() => {
    getJugadoresRelacionados();
  }, [jugadoresEquipos]);

  useEffect(() => {
    getEntrenadoresRelacionados();
  }, [entrenadoresEquipos]);

  return (
    <>
      <img className="agregar-icon" src={agregarIcon} onClick={handleShow} />

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: 40 }}
        size="lg"
      >
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </button>
        <div className="modalContainer">
          <div className="subModalContainer">
            <Modal.Header>
              <Modal.Title>Añadir jugador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmitJugador(e)}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="emailJugador"
                  value={inputJugador.emailJugador}
                  onChange={(e) => {
                    handleSelectJugador(e);
                  }}
                >
                  <option value={""} selected>
                    Seleccione un jugador
                  </option>
                  {jugadores.data?.map((jugador) => {
                    return (
                      <>
                        {!jugadoresRelacionados.some(
                          (relacionado) => relacionado.id === jugador.id
                        ) ? (
                          <option key={jugador.email} value={jugador.email}>
                            {jugador.email}
                          </option>
                        ) : (
                          <option
                            key={jugador.email}
                            value={jugador.email}
                            disabled
                          >
                            {jugador.email} (relacionado)
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                {/* {!jugadores.data?.length && (
                  <div className="error-sin-equipos">
                    <p>
                      Debe crear al menos un jugador para poder dar de alta un
                      equipo
                    </p>
                    <a href="/crear-jugador">CREAR JUGADOR</a>
                  </div>
                )} */}
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className="btn btn-primary me-md-2"
                    type="submit"
                    disabled={handleValidateJugador()}
                  >
                    Agregar
                  </Button>
                </Modal.Footer>
              </form>
              <table className="table table-bordered tableContainer">
                <thead>
                  <tr>
                    <th
                      style={{ width: "40%", textAlign: "center" }}
                      scope="col"
                    >
                      Relacionados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jugadoresRelacionados &&
                    jugadoresRelacionados.map((relacionado) => {
                      return (
                        <tr>
                          <td className="table-data example-text">
                            {relacionado.email}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Modal.Body>
          </div>
          <div className="subModalContainer1">
            <Modal.Header>
              <Modal.Title>Añadir entrenador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => handleSubmitEntrenador(e)}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="emailEntrenador"
                  value={inputEntrenador.emailEntrenador}
                  onChange={(e) => {
                    handleSelectEntrenador(e);
                  }}
                >
                  <option value={""} selected>
                    Seleccione un entrenador
                  </option>
                  {entrenadores.data?.map((entrenador) => {
                    return (
                      <>
                        {!entrenadoresRelacionados.some(
                          (relacionado) => relacionado.id === entrenador.id
                        ) ? (
                          <option
                            key={entrenador.email}
                            value={entrenador.email}
                          >
                            {entrenador.email}
                          </option>
                        ) : (
                          <option
                            key={entrenador.email}
                            value={entrenador.email}
                            disabled
                          >
                            {entrenador.email} (relacionado)
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                {/* {!entrenadores.data?.length && (
                  <div className="error-sin-equipos">
                    <p>
                      Debe crear al menos un entreador para poder dar de alta un
                      equipo
                    </p>
                    <a href="/crear-jugador">CREAR ENTRENADOR</a>
                  </div>
                )} */}
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className="btn btn-primary me-md-2"
                    type="submit"
                    disabled={handleValidateEntrenador()}
                  >
                    Agregar
                  </Button>
                </Modal.Footer>
              </form>
              <table className="table table-bordered tableContainer">
                <thead>
                  <tr>
                    <th
                      style={{ width: "40%", textAlign: "center" }}
                      scope="col"
                    >
                      Relacionados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entrenadoresRelacionados &&
                    entrenadoresRelacionados.map((relacionado) => {
                      return (
                        <tr>
                          <td className="table-data example-text">
                            {relacionado.email}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
}
