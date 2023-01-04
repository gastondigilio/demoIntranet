const initialState = {
  entrenadores: [],
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
