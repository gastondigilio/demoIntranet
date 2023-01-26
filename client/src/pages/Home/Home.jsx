import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getJugadores,
  setUserType,
  setUid,
} from "../../redux/actions/actions";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import "./Home.css";

import HomeJugadores from "../PanelJugadores/HomeJugadores/HomeJugadores";
import HomePresidente from "../PanelPresidente/HomePresidente/HomePresidente";

import { JUGADORES, ENTRENADORES, PRESIDENTE } from "../../config";

const Home = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const userType = useSelector((state) => state.userType);
  const uid = useSelector((state) => state.uid);

  useEffect(() => {
    dispatch(getEntrenadores());
    dispatch(getJugadores());
    dispatch(setUid(true));
  }, []);

  useEffect(() => {
    console.log("UID: ", uid);
    console.log("entrenadores: ", entrenadores);
    console.log("jugadores: ", jugadores);

    if (uid) dispatch(setUserType(uid, entrenadores.data, jugadores.data));
  }, [jugadores, entrenadores, uid]);

  return (
    <div className="home">
      {!uid ? (
        <>
          <Grid container justifyContent="flex-end">
            <Grid item padding={2}>
              <Link
                href="/login"
                variant="body2"
                style={{ textDecoration: "none" }}
              >
                Iniciar sesión
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        <div>
          {userType === JUGADORES && <HomeJugadores />}
          {userType === ENTRENADORES && <p>ES ENTRENADOR</p>}
          {userType === PRESIDENTE && <HomePresidente />}
        </div>
      )}
    </div>
  );
};

export default Home;
