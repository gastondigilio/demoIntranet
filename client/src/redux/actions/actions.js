import axios from "axios";
import "../../firebase/firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const url = "http://localhost:3001";
const auth = getAuth();

export function getEntrenadores() {
  return async function (dispatch) {
    let response = await axios.get(url + "/entrenadores");
    return dispatch({
      type: "GET_ENTRENADORES",
      payload: response || [],
    });
  };
}

export function createEntrenador(data) {
  return async function (dispatch) {
    const response = await axios.post(url + "/crear-entrenador", data);
    return dispatch({
      type: "CREATE_ENTRENADOR",
      payload: response,
    });
  };
}

export function getEquipos() {
  return async function (dispatch) {
    let response = await axios.get(url + "/equipos");
    return dispatch({
      type: "GET_EQUIPOS",
      payload: response || [],
    });
  };
}

export function createEquipo(data) {
  return async function (dispatch) {
    const response = await axios.post(url + "/crear-equipo", data);
    return dispatch({
      type: "CREATE_EQUIPO",
      payload: response,
    });
  };
}

export function getJugadores() {
  return async function (dispatch) {
    let response = await axios.get(url + "/jugadores");
    return dispatch({
      type: "GET_JUGADORES",
      payload: response || [],
    });
  };
}

export function createJugador(input) {
  return async function (dispatch) {
    try {
      let jugadores = await axios.get(url + "/jugadores");

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

      return dispatch({
        type: "CREATE_JUGADOR",
        payload: response,
      });
    } catch (error) {
      console.log("ERROR AL CREAR JUGADOR: ", error);
    }
  };
}

export function getNoticias() {
  return async function (dispatch) {
    let response = await axios.get(url + "/noticias-deportivas");
    return dispatch({
      type: "GET_NOTICIAS",
      payload: response,
    });
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
