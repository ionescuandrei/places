import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';


import PlaceList from '../../components/PlaceList/PlaceList'
 class FindPlaces extends Component {
  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
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
   itemSelectedHandler=key=>{
    const selPlace=this.props.places.find(place=>{
      return place.key===key;});
    Navigation.push('MyStack', {
      component: {
        name: 'places.PlaceDetail',
        passProps: {
          text: 'Pushed screen',
          selectedPlace:selPlace
        },
        options: {
          topBar: {
            title: {
              text: selPlace.name
            }
          }
        }
      }
    });
  }
   render() {
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
      </View>
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    places: state.places.places
  };
};
export default connect(mapStateToProps)(FindPlaces)