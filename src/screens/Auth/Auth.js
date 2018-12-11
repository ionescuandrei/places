import React, {Component} from 'react';
import {View, Button, StyleSheet, ImageBackground} from 'react-native';
import startMainTab from "../MainTabs/startTab";
import DefaultTextInput from '../../UI/defaultTextInput/DefaultTextInput';
import HeadingText from '../../UI/headingText/HeadingText';
import MainText from '../../UI/mainText/MainText';
import imagBackground from '../../assets/background.jpg';
import ButtonWithbackground from '../../UI/buttonWithBackground/ButtonWithBackground';

class AuthScreen extends React.Component{
  loginHandler=() => {
    startMainTab();
  }
  render(){
    return(
      <ImageBackground source={imagBackground} style={styles.imageBackground}>
      <View style={styles.container}>      
        <MainText><HeadingText>Please login</HeadingText></MainText>
        <ButtonWithbackground color="#29aaf4" onPress={()=>{alert("Hello!")}}>Switch to login</ButtonWithbackground>       
        {/* <Button title="Switch to login"/> */}
        <View style={styles.inputContainer}>
        <DefaultTextInput placeholder="Your e-mail adress" style={styles.inputText}/>
        <DefaultTextInput placeholder="Set password" style={styles.inputText}/>
        <DefaultTextInput placeholder="Confirm password" style={styles.inputText}/>
        </View>
        <ButtonWithbackground  color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithbackground>       
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'   
  },
  inputContainer:{
    width:"80%"
  },
  inputText:{
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  imageBackground:{
    width:"100%",
    height:"100%",
    flex: 1
  }

})
export default AuthScreen;