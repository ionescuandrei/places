import React, { Component } from "react";

import DefaultInput from '../../UI/defaultTextInput/DefaultTextInput';
const PlaceInput = props => {
  return (
    <DefaultInput placeholder="Place Name" value={props.placeName} onChangeText={props.onChangeText}/>
   );
  }

export default PlaceInput;
