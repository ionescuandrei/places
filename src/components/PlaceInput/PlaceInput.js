import React, { Component } from "react";

import DefaultInput from "../../UI/defaultTextInput/DefaultTextInput";
const PlaceInput = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeData.value}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
      onChangeText={props.onChangeText}
    />
  );
};

export default PlaceInput;
