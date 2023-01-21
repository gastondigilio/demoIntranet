const initialState = {
  uids: { presidente: [], entrenadores: [], jugadores: [] },
  equipos: [],
  entrenadores: [],
  jugadores: [],
  scraping: [],
  isLoading: false,
  user: "",
  error: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HAS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: "",
      };
    case "GET_ENTRENADORES":
      return {
        ...state,
        entrenadores: action.payload,
        error: "",
      };
    case "CREATE_ENTRENADOR":
      return {
        ...state,
        entrenadores: Array.isArray(state.entrenadores)
          ? [...state.entrenadores, action.payload]
          : [action.payload],
        error: "",
      };
    case "GET_EQUIPOS":
      return {
        ...state,
        equipos: action.payload,
        error: "",
      };
    case "CREATE_EQUIPO":
      return {
        ...state,
        equipos: Array.isArray(state.equipos)
          ? [...state.equipos, action.payload]
          : [action.payload],
        error: "",
      };
    case "GET_JUGADORES":
      return {
        ...state,
        jugadores: action.payload,
        error: "",
      };
    case "CREATE_JUGADOR":
      return {
        ...state,
        uids: {
          ...state.uids,
          jugadores: [...state.uids.jugadores, action.payload.data.uid],
        },
        jugadores: Array.isArray(state.jugadores)
          ? [...state.jugadores, action.payload]
          : [action.payload],
        error: "",
      };
    case "GET_NOTICIAS":
      return {
        ...state,
        scraping: Array.isArray(state.scraping)
          ? [...state.scraping, action.payload]
          : [action.payload],
        error: "",
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: "jugador",
        error: "",
      };
    default:
      return state;
  }
};

export default rootReducer;
