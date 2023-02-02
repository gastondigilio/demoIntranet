import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import agregarIcon from "../../images/agregar-icon.svg";
import {
    getJugadores,
    createJugador,
} from "../../../redux/actions/actions";

import './ModalListadoEquipo.css'


export default function ModalListadoEquipo() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const initialInput = {
        email: "",
    };

    const [input, setInput] = useState(initialInput);
    // const [jugadoresAgregados, setJugadoresAgregados] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [lgShow, setLgShow] = useState(false);

  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);

    useEffect(() => {
        dispatch(getJugadores());
    }, []);

    // const handleAgregar = (e) => {
    //     e.preventDefault();
    //     setJugadoresAgregados([...jugadoresAgregados, input]);
    //     setInput(initialInput);
    // };



    const handleSelectChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleValidateAgregar = () => {
        return input.email === ""
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "#1976D2" }}>
                Añadir
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{ marginTop: 40 }}
                size="lg"
            >
                <div className='modalContainer'>
                    <div className='subModalContainer'>
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir jugador</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                            >
                                <select class="form-select" aria-label="Default select example" name="email"
                                    value={input.email}
                                    onChange={(e) => {
                                        handleSelectChange(e);
                                    }}>
                                    <option value={""} selected>Seleccione un jugador</option>
                                    {jugadores.data?.map((jugador) => {
                                        return (
                                            <>
                                                <option key={jugador.email} value={jugador.email}>
                                                    {jugador.email}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                                {!jugadores.data?.length && (
                                    <div className="error-sin-equipos">
                                        <p>
                                            Debe crear al menos un jugador para poder dar de alta
                                            un equipo
                                        </p>
                                        <a href="/crear-jugador">CREAR JUGADOR</a>
                                    </div>
                                )}
                                <Modal.Footer>
                                    <Button variant="primary"
                                        className="btn btn-primary me-md-2"
                                        type="submit"
                                        disabled={handleValidateAgregar()}>
                                        Agregar
                                    </Button>
                                </Modal.Footer>
                            </form>
                            <table className="table table-bordered tableContainer">
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%", textAlign: "center" }} scope="col">
                                            Nombre
                                        </th>
                                        <th style={{ width: "40%", textAlign: "center" }} scope="col">
                                            Equipo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="table-data example-text">Gaston</td>
                                        <td className="table-data example-text">FC Barcerlona</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Modal.Body>
                    </div>
                    <div className='subModalContainer1'>
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir entrenador</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                            >
                                <select class="form-select" aria-label="Default select example" name="email"
                                    value={input.email}
                                    onChange={(e) => {
                                        handleSelectChange(e);
                                    }}>
                                    <option value={""} selected>Seleccione un entrenador</option>
                                    {entrenadores.data?.map((entreador) => {
                                        return (
                                            <>
                                                <option key={entreador.email} value={entreador.email}>
                                                    {entreador.email}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                                {!entrenadores.data?.length && (
                                    <div className="error-sin-equipos">
                                        <p>
                                            Debe crear al menos un entreador para poder dar de alta
                                            un equipo
                                        </p>
                                        <a href="/crear-jugador">CREAR ENTRENADOR</a>
                                    </div>
                                )}
                                <Modal.Footer>
                                    <Button variant="primary"
                                        className="btn btn-primary me-md-2"
                                        type="submit"
                                        disabled={handleValidateAgregar()}>
                                        Agregar
                                    </Button>
                                </Modal.Footer>
                            </form>
                            <table className="table table-bordered tableContainer">
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%", textAlign: "center" }} scope="col">
                                            Nombre
                                        </th>
                                        <th style={{ width: "40%", textAlign: "center" }} scope="col">
                                            Equipo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="table-data example-text">Sebastían</td>
                                        <td className="table-data example-text">FC Barcerlona</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Modal.Body>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Aceptar
                </button>
            </Modal>
        </>
    );
}