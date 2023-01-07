const initialState = {
  equipos: [],
  entrenadores: [],
  jugadores: [],
  scraping: [],
  isLoading: false,
  hasError: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ENTRENADORES":
      return {
        ...state,
        entrenadores: action.payload,
      };
    case "CREATE_ENTRENADOR":
      return {
        ...state,
        entrenadores: Array.isArray(state.entrenadores)
          ? [...state.entrenadores, action.payload]
          : [action.payload],
      };
    case "GET_EQUIPOS":
      return {
        ...state,
        equipos: action.payload,
      };
    case "CREATE_EQUIPO":
      return {
        ...state,
        equipos: Array.isArray(state.equipos)
          ? [...state.equipos, action.payload]
          : [action.payload],
      };
    case "GET_JUGADORES":
      return {
        ...state,
        jugadores: action.payload,
      };
    case "CREATE_JUGADOR":
      return {
        ...state,
        jugadores: Array.isArray(state.jugadores)
          ? [...state.jugadores, action.payload]
          : [action.payload],
      };
    case "GET_NOTICIAS":
      return {
        ...state,
        scraping: Array.isArray(state.scraping)
          ? [...state.scraping, action.payload]
          : [action.payload],
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
