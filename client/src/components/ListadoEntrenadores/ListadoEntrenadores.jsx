import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getEntrenadores } from "../../redux/actions/actions";

import "./ListadoEntrenadores.css";

const ListadoEntrenadores = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length;

  useEffect(() => {
    dispatch(getEntrenadores());
  }, []);

  return (
    <div className="listado-entrenadores">
      <h2 className="sub-title">Lista de entrenadores activos</h2>
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
          {hayEntrenadores &&
            entrenadores.data.map((entrenador) => {
              return (
                <tr key={entrenador.email}>
                  <td className="table-data">{entrenador.nombre}</td>
                  <td className="table-data">{entrenador.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoEntrenadores;
