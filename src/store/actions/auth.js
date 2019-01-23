import { TRY_AUTH, SET_AUTH_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTab from "../../screens/MainTabs/startTab";
import { AsyncStorage } from "react-native";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyCObW-CUni5ICoxpot3NXr3UXzjr6L5vQ8";
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      apiKey;
    if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        apiKey;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication faild, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(uiStopLoading());
        if (!resParsed.idToken) {
          alert("Authentication faild, please try again!");
        } else {
          dispatch(authStoreToken(resParsed.idToken, resParsed.expiresIn));
          startMainTab();
        }
      });
  };
};
export const authSetToken = token => {
  return {
    type: SET_AUTH_TOKEN,
    token: token
  };
};
export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken());
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    console.log(now, new Date(expiryDate));
    AsyncStorage.setItem("place:auth:token", token);
    AsyncStorage.setItem("place:auth:expiryDate", expiryDate.toString());
  };
};
export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem("place:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          });
      } else {
        resolve(token);
      }
    });
    promise.catch(err => dispatch(authClearStorage()));
    return promise;
  };
};
export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => startMainTab())
      .catch(err => console.log(err));
  };
};
export const authClearStorage = () => {
  AsyncStorage.removeItem("place:auth:token");
  AsyncStorage.removeItem("place:auth:expiryDate");
};
