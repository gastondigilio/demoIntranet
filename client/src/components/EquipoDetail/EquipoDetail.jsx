import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getEquipos } from "../../redux/actions/actions";

import EntrenadoresEquipos from "../EntrenadoresEquipos/EntrenadoresEquipos";
import JugadoresEquipos from "../JugadoresEquipos/JugadoresEquipos";
import RelacionesEquipos from "../RelacionesEquipos/RelacionesEquipos";

import "./EquipoDetail.css";

export default function EquipoDetail() {
  const dispatch = useDispatch();
  const { nombre } = useParams();

  const [equipo, setEquipo] = useState();
  const equipos = useSelector((state) => state.equipos);
  const hayEquipos = equipos && equipos.data && equipos.data.length;

  useEffect(() => {
    dispatch(getEquipos());
  }, []);

  useEffect(() => {
    hayEquipos &&
      equipos.data.map((e) => {
        if (e.nombre === nombre) {
          setEquipo(e);
          console.log("EQUIPO: ", e);
        }
      });
  }, [equipos]);

  return (
    <div className="equipo-detail">
      <h2 className="title">Equipo {nombre}</h2>
      <div className="relaciones-container">
        <div className="relacion-container">
          {equipo && <EntrenadoresEquipos equipoId={equipo.id} />}
        </div>
        <div className="relacion-container">
          {equipo && <JugadoresEquipos equipoId={equipo.id} />}
        </div>
      </div>
      {equipo && <RelacionesEquipos nombreEquipo={equipo.nombre} />}
    </div>
  );
}
