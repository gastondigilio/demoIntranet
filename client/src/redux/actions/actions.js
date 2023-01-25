import axios from "axios";

import "../../firebase/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { UID_PRESIDENTE } from "../../config";
import { JUGADORES, ENTRENADORES, PRESIDENTE } from "../../config";

const url = "http://localhost:3001";
const auth = getAuth();

export function hasError(error) {
  return async function (dispatch) {
    return dispatch({
      type: "HAS_ERROR",
      payload: error,
    });
  };
}

export function resetError() {
  return async function (dispatch) {
    return dispatch({
      type: "RESET_ERROR",
    });
  };
}

export function getEntrenadores() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/entrenadores");
      return dispatch({
        type: "GET_ENTRENADORES",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET ENTRENADORES");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createEntrenador(input) {
  return async function (dispatch) {
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      let data = {
        uid: user.user.uid,
        nombre: input.nombre,
        email: input.email,
      };

      const response = await axios.post(url + "/crear-entrenador", data);

      return dispatch({
        type: "CREATE_ENTRENADOR",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE ENTRENADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getEquipos() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/equipos");
      return dispatch({
        type: "GET_EQUIPOS",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET EQUIPOS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createEquipo(data) {
  return async function (dispatch) {
    try {
      const response = await axios.post(url + "/crear-equipo", data);
      return dispatch({
        type: "CREATE_EQUIPO",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE EQUIPO");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getJugadores() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/jugadores");
      return dispatch({
        type: "GET_JUGADORES",
        payload: response || [],
      });
    } catch (error) {
      console.log("ERROR EN GET JUGADORES");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function createJugador(input) {
  return async function (dispatch) {
    try {
      let user = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      let data = {
        uid: user.user.uid,
        nombre: input.name,
        email: input.email,
      };

      let response = await axios.post(url + "/crear-jugador", data);

      await signInWithEmailAndPassword(auth, input.email, input.password);

      return dispatch({
        type: "CREATE_JUGADOR",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN CREATE JUGADOR");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function getNoticias() {
  return async function (dispatch) {
    try {
      let response = await axios.get(url + "/noticias-deportivas");
      return dispatch({
        type: "GET_NOTICIAS",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR EN GET NOTICIAS");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function setLoading(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "SET_LOADING",
      payload: payload,
    });
  };
}

export function login(input) {
  return async function (dispatch) {
    try {
      let response = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      return dispatch({
        type: "LOGIN",
        payload: response.user.uid,
      });
    } catch (error) {
      console.log("ERROR EN LOGIN");
      return dispatch({
        type: "HAS_ERROR",
        payload: error,
      });
    }
  };
}

export function setUid(set) {
  return async function (dispatch) {
    if (!set) {
      return dispatch({
        type: "SET_UID",
        payload: null,
      });
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return dispatch({
            type: "SET_UID",
            payload: user ? user.uid : null,
          });
        } else {
          console.log("NO HAY USUARIO LOGUEADO");
        }
      });
    }
  };
}

export function setUserType(uid, entrenadores, jugadores) {
  return async function (dispatch) {
    let userType = null;

    if (uid === String(UID_PRESIDENTE)) {
      userType = PRESIDENTE;
    }

    entrenadores &&
      entrenadores.map((entrenador) => {
        if (entrenador.uid === uid) {
          userType = ENTRENADORES;
        }
      });

    jugadores &&
      jugadores.map((jugador) => {
        if (jugador.uid === uid) {
          userType = JUGADORES;
        }
      });

    return dispatch({
      type: "SET_USERTYPE",
      payload: userType,
    });
  };
}
