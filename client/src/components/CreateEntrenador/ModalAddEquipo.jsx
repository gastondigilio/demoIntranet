import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import agregarIcon from "../../images/agregar-icon.svg";
import {
    getEquipos,
    createEquipo,
} from "../../redux/actions/actions";


export default function ModalAddEquipo() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const initialInput = {
        nombre: "",
    };

    const [input, setInput] = useState(initialInput);
    const [equiposAgregados, setEquiposAgregados] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const equipos = useSelector((state) => state.equipos);
    console.log(equipos, "EQUIPOS")

    useEffect(() => {
        dispatch(getEquipos());
    }, []);

    const handleAgregar = (e) => {
        e.preventDefault();
        setEquiposAgregados([...equiposAgregados, input]);
        setInput(initialInput);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        equiposAgregados.map((equipo) => {
            dispatch(createEquipo(equipo));
        });
        setEquiposAgregados([]);
    };

    const handleSelectChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleValidateAceptar = () => {
        return equiposAgregados.length < 1;
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
                    <Modal.Title>Añadir equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <select class="form-select" aria-label="Default select example" name="nombre"
                            value={input.nombre}
                            onChange={(e) => {
                                handleSelectChange(e);
                            }}>
                            <option value={""} selected>Seleccione un equipo</option>
                            {equipos.data?.map((equipo) => {
                                return (
                                    <>
                                        <option key={equipo.nombre} value={equipo.nombre}>
                                            {equipo.nombre}
                                        </option>
                                    </>
                                );
                            })}
                        </select>
                        {!equipos.data?.length && (
                            <div className="error-sin-equipos">
                                <p>
                                    Debe crear al menos un equipo para poder dar de alta
                                    entrenadores
                                </p>
                                <a href="/crear-equipo">CREAR EQUIPO</a>
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
                                type="button"
                                onClick={(e) => {
                                    handleAgregar(e);
                                }}>
                                Agregar
                            </Button>
                            <Button variant="primary"
                                type="submit"
                                disabled={handleValidateAceptar()}>Aceptar</Button>
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