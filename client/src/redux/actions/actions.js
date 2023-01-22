import axios from "axios";
import "../../firebase/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const url = "http://localhost:3001";
const auth = getAuth();
const UID_PRESIDENTE = "SsForRCB55f5xfiyPu0AN51DMQI3";

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

export function createEntrenador(data) {
  return async function (dispatch) {
    try {
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
      window.location.pathname = "/";

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
      window.location.pathname = "/";
      return dispatch({
        type: "LOGIN",
        payload: response,
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

export function setUid() {
  return async function (dispatch) {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        return dispatch({
          type: "SET_UID",
          payload: res.uid,
        });
      } else {
        return dispatch({
          type: "SET_UID",
          payload: null,
        });
      }
    });
  };
}

export function getUserType(uid, entrenadores, jugadores) {
  return async function (dispatch) {
    let userType = null;

    if (uid === String(UID_PRESIDENTE)) {
      userType = "1";
    }

    entrenadores &&
      entrenadores.map((entrenador) => {
        if (entrenador.uid === uid) {
          userType = "2";
        }
      });

    jugadores &&
      jugadores.map((jugador) => {
        if (jugador.uid === uid) {
          userType = "3";
        }
      });

    return dispatch({
      type: "SET_USERTYPE",
      payload: userType,
    });
  };
}
