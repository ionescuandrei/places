import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default class SideDrawer extends Component {
  
  render() {
    return (
      <View style={[style.container,{width:Dimensions.get('window').width*0.8}]}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container:{
    paddingTop: 20,
    backgroundColor:'white',
    flex: 1    
  }
})