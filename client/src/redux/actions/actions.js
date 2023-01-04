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

export function setLoading(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "SET_LOADING",
      payload: payload,
    });
  };
}
