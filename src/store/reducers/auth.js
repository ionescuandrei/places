import {
  SET_AUTH_TOKEN,
  AUTH_REMOVE_TOKEN,
  TRY_AUTH,
  GET_EMAIL
} from "../actions/actionTypes";

const initialState = {
  name: "John Doe",
  email: "",
  token: null,
  expiryDate: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    case TRY_AUTH:
      return {
        ...state,
        name: action.name,
        email: action.email
      };
    case GET_EMAIL:
      return {
        ...state,
        email: action.email
      };
    default:
      return state;
  }
};

export default reducer;
