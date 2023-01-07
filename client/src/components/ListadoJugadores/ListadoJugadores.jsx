import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getJugadores } from "../../redux/actions/actions";

import "./ListadoJugadores.css";

const ListadoJugadores = () => {
  const dispatch = useDispatch();

  const jugadores = useSelector((state) => state.jugadores);
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;

  useEffect(() => {
    dispatch(getJugadores());
  }, []);

  return (
    <div className="listado-jugadores">
      <h2 className="sub-title">Lista de jugadores activos</h2>
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
          {!hayJugadores && (
            <tr>
              <td className="table-data example-text">Juan Pérez</td>
              <td className="table-data example-text">juanperez@example.com</td>
            </tr>
          )}
          {hayJugadores
            ? jugadores.data.map((jugador) => {
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

export default ListadoJugadores;
