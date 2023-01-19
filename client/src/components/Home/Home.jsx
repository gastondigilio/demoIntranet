import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getEquipos,
  getJugadores,
  getNoticias,
} from "../../redux/actions/actions";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import "./Home.css";
import CreateEntrenador from "../CreateEntrenador/CreateEntrenador";
import ListadoEntrenadores from "../ListadoEntrenadores/ListadoEntrenadores";
import ListadoEquipos from "../ListadoEquipos/ListadoEquipos";
import CreateEquipo from "../CreateEquipo/CreateEquipo";
import CreateJugador from "../CreateJugador/CreateJugador";
import ListadoJugadores from "../ListadoJugadores/ListadoJugadores";
import Scraping from "../Scraping/Scraping";
import Login from "../Login/Login";

const Home = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const equipos = useSelector((state) => state.equipos);
  const jugadores = useSelector((state) => state.jugadores);

  const handleRefresh = () => {
    dispatch(getEntrenadores());
    dispatch(getEquipos());
    dispatch(getJugadores());

    if (entrenadores && entrenadores.data) {
      console.log("ENTRENADORES: ", entrenadores.data);
    }
    if (equipos && equipos.data) {
      console.log("EQUIPOS: ", equipos.data);
    }
    if (jugadores && jugadores.data) {
      console.log("JUGADORES: ", jugadores.data);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getEntrenadores());
  //     dispatch(getEquipos());
  //     dispatch(getJugadores());
  //   }, 1000);
  // }, []);

  return (
    <div className="home">
      <Grid container justifyContent="flex-end" padding={4}>
        <Grid item>
          <Link href="/login" variant="body2" style={{ textDecoration: 'none' }}>
              Intranet
          </Link>
        </Grid>
      </Grid>
      {/* <Login /> */}
      <CreateEntrenador />
      <ListadoEntrenadores />
      <CreateJugador />
      <ListadoJugadores />
      <CreateEquipo />
      <ListadoEquipos />
      {/* <Scraping /> */}
      {/* <button
        className="btn btn-primary"
        onClick={() => {
          handleRefresh();
        }}
      >
        Refresh and log
      </button> */}
    </div>
  );
};

export default Home;
