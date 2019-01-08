import { REMOVE_PLACE, SET_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-voucher-221208.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => {
        dispatch(uiStopLoading());
        alert("Something went wrong please try again!");
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch("https://voucher-221208.firebaseio.com/places.json", {
          method: "POST",
          body: JSON.stringify(placeData)
        })
          .catch(err => {
            dispatch(uiStopLoading());
            alert("Something went wrong please try again!");
            console.log(err);
          })
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
          });
      });
  };
};
export const getPlace = () => {
  return dispatch => {
    fetch("https://voucher-221208.firebaseio.com/places.json")
      .catch(err => {
        alert("Something went wrong loading ...");
        console.log(err);
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
    dispatch(removePlace(key));
    fetch(
      "https://awesome-places-1511248766522.firebaseio.com/places/" +
        key +
        ".json",
      {
        method: "DELETE"
      }
    )
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
