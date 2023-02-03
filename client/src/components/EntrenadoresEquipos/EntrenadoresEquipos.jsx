import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getEntrenadoresEquipos,
  getEquipos,
} from "../../redux/actions/actions";

import "./EntrenadoresEquipos.css";

const EntrenadoresEquipos = () => {
  const dispatch = useDispatch();

  const [relacionados, setRelacionados] = useState([]);
  const entrenadoresEquipos = useSelector((state) => state.entrenadoresEquipos);
  const entrenadores = useSelector((state) => state.entrenadores);
  const equipos = useSelector((state) => state.equipos);

  useEffect(() => {
    dispatch(getEntrenadoresEquipos());
    dispatch(getEntrenadores());
    dispatch(getEquipos());
  }, []);

  useEffect(() => {
    if (entrenadoresEquipos.data && entrenadores.data && equipos.data) {
      entrenadoresEquipos.data.map((item) => {
        const entrenador = entrenadores.data.find(
          (element) => element.id === item.entrenadorid
        );
        const equipo = equipos.data.find(
          (element) => element.id === item.equipoid
        );

        const result = {
          id: item.ID,
          nombreEquipo: equipo.nombre,
          emailEntrenador: entrenador.email,
        };

        if (
          !relacionados.some(
            (relacionado) =>
              relacionado.nombreEquipo === result.nombreEquipo &&
              relacionado.emailEntrenador === result.emailEntrenador
          )
        ) {
          setRelacionados([...relacionados, result]);
        }
      });
    }
  }, [entrenadoresEquipos, entrenadores, equipos]);

  useEffect(() => {
    let relacionadosOrdenados = relacionados;

    relacionadosOrdenados.sort((a, b) => {
      if (a.nombreEquipo < b.nombreEquipo) {
        return -1;
      }
      if (a.nombreEquipo > b.nombreEquipo) {
        return 1;
      }
      return 0;
    });

    setRelacionados(relacionadosOrdenados);
  }, [relacionados]);

  return (
    <div className="entrenadores-equipos">
      <h2 className="sub-title">Relacion entre entrenadores y equipos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Nombre del equipo
            </th>
            <th style={{ width: "50%", textAlign: "center" }} scope="col">
              Email del entrenador
            </th>
          </tr>
        </thead>

        <tbody>
          {relacionados &&
            relacionados.map((relacionado) => {
              return (
                <tr>
                  <td className="table-data">{relacionado.nombreEquipo}</td>
                  <td className="table-data">{relacionado.emailEntrenador}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EntrenadoresEquipos;
