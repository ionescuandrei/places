import {
  SET_AUTH_TOKEN,
  AUTH_REMOVE_TOKEN,
  TRY_AUTH
} from "../actions/actionTypes";

const initialState = {
  name: "John Doe",
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
        name: action.name
      };
    default:
      return state;
  }
};

export default reducer;
