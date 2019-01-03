import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ButtonWithBackground =props => (
  <TouchableOpacity onPress={props.onPress}>
    <View>
        <Text style={[styles.buttonBackground, {backgroundColor:props.color}, props.disable ? styles.disable:null]}>{props.children}</Text>
    </View>
  </TouchableOpacity>
    
);
 const styles = StyleSheet.create({
   buttonBackground:{
      padding: 10,
      margin:5,
      borderRadius:5,
      borderWidth:1
   },
   disable:{
     backgroundColor:"#eee",     
     borderColor:"#aaa"
   }
 })

export default ButtonWithBackground;
