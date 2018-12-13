import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class SideDrawer extends Component {
  
  render() {
    return (
      <View style={[style.container,{width:Dimensions.get('window').width*0.8}]}>
        <TouchableOpacity >
              <View style={style.drawerItem}>  
                  <Icon name="ios-log-out" size={30} color="#bbb" style={style.drawerItemIcon}/>   
                  <Text> Sign out </Text>                       
                </View>
         </TouchableOpacity>
      </View>
      
    );
  }
}
const style = StyleSheet.create({
  container:{
    paddingTop: 20,
    backgroundColor:'white',
    flex: 1    
  },
  drawerItem:{
    flexDirection: 'row',
    alignItems:"center",
    padding: 5,
    backgroundColor:"#eee"
  },
  drawerItemIcon:{
    marginRight: 10
  }
})