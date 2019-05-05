import { TRY_AUTH, SET_AUTH_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTab from "../../screens/MainTabs/startTab";
import { AsyncStorage } from "react-native";
import { goToAuth } from "../../screens/goToAuth";
const apiKey = "AIzaSyCObW-CUni5ICoxpot3NXr3UXzjr6L5vQ8";
export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());

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
        console.log(authData);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(uiStopLoading());
        if (!resParsed.idToken) {
          alert("Authentication faild, please try again!");
        } else {
          dispatch(
            authStoreToken(
              resParsed.idToken,
              resParsed.expiresIn,
              resParsed.refreshToken
            )
          );
          console.log(authData.name, authData.email);
          dispatch(getName(authData.name, authData.email));
          startMainTab();
        }
      });
  };
};
export const getName = (name, email) => {
  return {
    type: TRY_AUTH,
    name: name,
    email: email
  };
};
export const authSetToken = (token, expiryDate) => {
  return {
    type: SET_AUTH_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};
export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 100000;
    console.log(expiresIn);
    console.log(now, new Date(expiryDate));
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem("place:auth:token", token);
    AsyncStorage.setItem("place:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("place:auth:refreshToken", refreshToken);
  };
};
export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("place:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("place:auth:expiryDate");
            // dispatch(authSetToken(tokenFromStorage));
            // resolve(tokenFromStorage);
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
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("place:auth:refreshToken")
          .then(refreshToken => {
            return fetch(
              "https://securetoken.googleapis.com/v1/token?key=" + apiKey,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refresh_token=" + refreshToken
              }
            );
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log("Refresh token worked!");
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
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
  return dispatch => {
    AsyncStorage.removeItem("place:auth:token");
    AsyncStorage.removeItem("place:auth:expiryDate");
    return AsyncStorage.removeItem("place:auth:refreshToken");
  };
};
export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => goToAuth());
    dispatch(authRemoveToken());
  };
};
export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
