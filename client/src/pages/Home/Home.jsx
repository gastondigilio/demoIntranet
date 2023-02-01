import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntrenadores,
  getJugadores,
  setUserType,
  setUid,
  setLoading,
} from "../../redux/actions/actions";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import "./Home.css";

import HomeJugadores from "../PanelJugadores/HomeJugadores/HomeJugadores";
import HomePresidente from "../PanelPresidente/HomePresidente/HomePresidente";
import Spinner from "../../components/Spinner/Spinner";

import { JUGADORES, ENTRENADORES, PRESIDENTE } from "../../config";
import HomeEntrenadores from "../PanelEntrenador/HomeEntrenadores/HomeEntrenadores";

const Home = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  const entrenadores = useSelector((state) => state.entrenadores);
  const jugadores = useSelector((state) => state.jugadores);
  const userType = useSelector((state) => state.userType);
  const uid = useSelector((state) => state.uid);

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
    dispatch(getEntrenadores());
    dispatch(getJugadores());
    dispatch(setUid(true));
  }, []);

  useEffect(() => {
    if (uid) dispatch(setUserType(uid, entrenadores.data, jugadores.data));
  }, [jugadores, entrenadores, uid]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
              {userType === ENTRENADORES && <HomeEntrenadores />}
              {userType === PRESIDENTE && <HomePresidente />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
