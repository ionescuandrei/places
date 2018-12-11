import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet,Button } from 'react-native';

import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';
import {Navigation} from 'react-native-navigation';
import MainText from "../../UI/mainText/MainText";
import HeadingText from "../../UI/headingText/HeadingText";
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from '../../components/PickLocation/PickLocation';


class SharePlace extends Component { 
  state={
    placeName: ''
  }  
  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
  }  
  placeNameInputHandler=val=>{
    this.setState({
      placeName:val
    })
  }
   

  navigationButtonPressed({ buttonTwo }) {
    Navigation.mergeOptions('Drawer', {
      sideMenu: {
        left: {
          visible: true
        }
      }
  });
  } 
  placeAddedHandler=()=>{
    if(this.state.placeName!==''){
      this.props.onAddPlace(this.state.placeName);
    }
      }
  render() {
    return (
      <ScrollView >
      <View style={styles.container}> 
      <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
      </MainText>
      <PickImage/>
      <PickLocation/>
         
         <PlaceInput paceName={this.state.placeName} onChangeText={this.placeNameInputHandler}/>
          <View style={styles.button}>
            <Button title="Share the Place!" onPress={this.placeAddedHandler}/>
          </View>
        </View>
      </ScrollView>
    );
  }  
}       
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
      width: "100%",
      height: "100%"
  }
});
const mapDispatchToProps=(dispatch)=>{
  return{
    onAddPlace:(placeName)=>dispatch(addPlace(placeName))
  }
}
export default connect(null,mapDispatchToProps)(SharePlace);