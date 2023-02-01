import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getEntrenadores, getJugadores } from "../../../redux/actions/actions";


const RelacionesEquipos = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);

  useEffect(() => {
    dispatch(getEntrenadores())
    dispatch(getJugadores())
  }, [])

  return (
    <div className="relaciones-equipos">
      <div className="jugadores-relacionados">
        <h4>Jugadores relacionados</h4>
      </div>
      <div className="entrenadores-relacionados">
        <h4>Entrenadores relacionados</h4>
      </div>
    </div>
  )
}

export default RelacionesEquipos