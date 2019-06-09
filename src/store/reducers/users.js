import { ADD_USER } from "../actions/actionTypes";
const initialState = {
  users: []
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: state.users.concat({
          key: Math.random(),
          name: action.name,
          //   email: action.email,

          phone: action.phone,
          photo: action.photo,
          location: action.location
        })
      };
    default:
      return state;
  }
};
export default userReducer;
