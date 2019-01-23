import {
  REMOVE_PLACE,
  SET_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://us-central1-voucher-221208.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch(
          "https://voucher-221208.firebaseio.com/places.json?auth=" + authToken,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        )
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
            dispatch(placeAdded());
            dispatch(uiStopLoading());
          })
          .catch(err => {
            dispatch(uiStopLoading());
            alert("Something went wrong please try again!");
            console.log(err);
          });
      })
      .catch(err => {
        dispatch(uiStopLoading());
        alert("Something went wrong please try again!");
        console.log(err);
      });
  };
};
export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};
export const getPlace = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        return fetch(
          "https://voucher-221208.firebaseio.com/places.json?auth=" + token
        );
      })

      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong loading ...");
        console.log(err);
      });
  };
};
export const setPlaces = places => {
  return {
    type: SET_PLACE,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://voucher-221208.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
