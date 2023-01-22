import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getJugadores,
  setUid,
  getUserType,
} from "../../redux/actions/actions";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import "./Home.css";

import HomeJugadores from "../PanelJugadores/HomeJugadores/HomeJugadores";
import Logout from "../../components/Logout/Logout";

const Home = () => {
  const dispatch = useDispatch();

  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const uid = useSelector((state) => state.uid);
  const userType = useSelector((state) => state.userType);

  useEffect(() => {
    dispatch(getEntrenadores());
    dispatch(getJugadores());
    dispatch(setUid());
  }, []);

  useEffect(() => {
    if (uid) dispatch(getUserType(uid, entrenadores.data, jugadores.data));
  }, [jugadores, entrenadores, uid]);

  return (
    <div className="home">
      {!uid ? (
        <Grid container justifyContent="flex-end" padding={2}>
          <Grid item padding={2}>
            <Link
              href="/login"
              variant="body2"
              style={{ textDecoration: "none" }}
            >
              Log In
            </Link>
          </Grid>
          <Grid item padding={2}>
            <Link
              href="/register"
              variant="body2"
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Logout />
          {userType === "1" && <p>ES PRESIDENTE</p>}
          {userType === "2" && <p>ES ENTRENADOR</p>}
          {userType === "3" && <p>ES JUGADOR</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
