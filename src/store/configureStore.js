import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
import usersReducer from "./reducers/users";

import placesReducer from "./reducers/places";

const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer,
  users: usersReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
