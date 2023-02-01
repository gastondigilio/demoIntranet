import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import agregarIcon from "../../images/agregar-icon.svg";
import {
    getJugadores,
    createJugador,
} from "../../redux/actions/actions";


export default function ModalAddJugador({jugadoresAgregados, setJugadoresAgregados}) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const initialInput = {
        email: "",
    };

    const [input, setInput] = useState(initialInput);
    // const [jugadoresAgregados, setJugadoresAgregados] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const jugadores = useSelector((state) => state.jugadores);
    console.log(jugadores, "JUGADORES")

    useEffect(() => {
        dispatch(getJugadores());
    }, []);

    // const handleAgregar = (e) => {
    //     e.preventDefault();
    //     setJugadoresAgregados([...jugadoresAgregados, input]);
    //     setInput(initialInput);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.email !== "") {
            setJugadoresAgregados([...jugadoresAgregados, input.email]);
            setInput(initialInput);
        }
        // jugadoresAgregados.map((jugador) => {
        //     dispatch(createJugador(jugador));
        // });
        // setJugadoresAgregados([]);
    };

    const handleSelectChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleValidateAgregar = () => {
        return input.email === ""
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Añadir
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Añadir jugador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
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
                                        <option key={jugador.nombre} value={jugador.nombre}>
                                            {jugador.nombre}
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
                        {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                className="btn btn-primary me-md-2"
                                type="button"
                                onClick={(e) => {
                                    handleAgregar(e);
                                }}
                            // disabled={handleValidateAgregar()}
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
                        </div> */}
                        <Modal.Footer>
                        <Button variant="primary"
                                className="btn btn-primary me-md-2"
                                type="submit"
                                disabled={handleValidateAgregar()}>
                                Agregar
                            </Button>
                            {/* <Button variant="primary"
                            type="submit"
                            disabled={handleValidateAceptar()}>Aceptar</Button> */}
                        </Modal.Footer>
                    </form>
                    {/* <a
                        className="button-agregar"
                        href="/crear-entrenador"
                        target={"_blank"}
                    >
                        <img className="agregar-icon" src={agregarIcon} />
                    </a> */}
                </Modal.Body>
            </Modal>
        </>
    );
}