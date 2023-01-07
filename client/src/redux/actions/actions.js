import axios from "axios";

const url = "http://localhost:3001";

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

export function createJugador(data) {
  return async function (dispatch) {
    const response = await axios.post(url + "/crear-jugador", data);
    return dispatch({
      type: "CREATE_JUGADOR",
      payload: response,
    });
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
