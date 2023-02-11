import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getJugadores, getJugadoresEquipos } from "../../redux/actions/actions";

import "./JugadoresEquipos.css";

const JugadoresEquipos = ({ equipoId }) => {
  const dispatch = useDispatch();

  const [relacionados, setRelacionados] = useState([]);
  const jugadoresEquipos = useSelector((state) => state.jugadoresEquipos);
  const jugadores = useSelector((state) => state.jugadores);
  const hayJugadoresEquipos =
    jugadoresEquipos && jugadoresEquipos.data && jugadoresEquipos.data.length;
  const hayJugadores = jugadores && jugadores.data && jugadores.data.length;

  useEffect(() => {
    dispatch(getJugadoresEquipos());
    dispatch(getJugadores());
  }, []);

  useEffect(() => {
    hayJugadoresEquipos &&
      hayJugadores &&
      jugadoresEquipos.data.map((item) => {
        const jugador = jugadores.data.find(
          (element) => element.id === equipoId
        );

        const result = {
          id: item.ID,
          emailJugador: jugador.email,
        };

        if (
          !relacionados.some(
            (relacionado) => relacionado.emailJugador === result.emailJugador
          )
        ) {
          setRelacionados([...relacionados, result]);
        }
      });
  }, [jugadoresEquipos, jugadores]);

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
      <h2 className="sub-title">Jugadores</h2>
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
                  <td className="table-data">{relacionado.emailJugador}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default JugadoresEquipos;
