import { GET_USER, ADD_USER } from "./actionTypes";

export const addUserProfile = (name, phone, photo, location) => ({
  type: ADD_USER,
  name: name,
  phone: phone,
  photo: photo,
  location: location
});
