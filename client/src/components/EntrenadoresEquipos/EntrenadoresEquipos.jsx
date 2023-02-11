import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getEntrenadoresEquipos,
  getEquipos,
} from "../../redux/actions/actions";

import "./EntrenadoresEquipos.css";

const EntrenadoresEquipos = ({ equipoId }) => {
  const dispatch = useDispatch();

  const [relacionados, setRelacionados] = useState([]);
  const entrenadoresEquipos = useSelector((state) => state.entrenadoresEquipos);
  const entrenadores = useSelector((state) => state.entrenadores);
  const hayEntrenadoresEquipos =
    entrenadoresEquipos &&
    entrenadoresEquipos.data &&
    entrenadoresEquipos.data.length;
  const hayEntrenadores =
    entrenadores && entrenadores.data && entrenadores.data.length;

  useEffect(() => {
    dispatch(getEntrenadoresEquipos());
    dispatch(getEntrenadores());
  }, []);

  useEffect(() => {
    hayEntrenadoresEquipos &&
      hayEntrenadores &&
      entrenadoresEquipos.data.map((item) => {
        const entrenador = entrenadores.data.find(
          (element) => element.id === equipoId
        );

        const result = {
          id: item.ID,
          emailEntrenador: entrenador.email,
        };

        if (
          !relacionados.some(
            (relacionado) =>
              relacionado.emailEntrenador === result.emailEntrenador
          )
        ) {
          setRelacionados([...relacionados, result]);
        }
      });
  }, [entrenadoresEquipos, entrenadores]);

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
      <h2 className="sub-title">Entrenadores</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
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
