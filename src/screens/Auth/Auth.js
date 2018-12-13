import React, {Component} from 'react';
import {View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTab from "../MainTabs/startTab";
import DefaultTextInput from '../../UI/defaultTextInput/DefaultTextInput';
import HeadingText from '../../UI/headingText/HeadingText';
import MainText from '../../UI/mainText/MainText';
import imagBackground from '../../assets/background.jpg';
import ButtonWithbackground from '../../UI/buttonWithBackground/ButtonWithBackground';

class AuthScreen extends React.Component{
  state={
    viewMode:Dimensions.get("window").height>500? "portrait":"landscape"
  }
  constructor(props){
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);  
    
  }
  componentWillUnmount(){
    Dimensions.removeEventListener("change", this.updateStyles)
  }
  updateStyles=(dims)=>{
    this.setState({viewMode:dims.window.height>500? "portrait":"landscape"})  
  }
  loginHandler=() => {
    startMainTab();
  }
  render(){
    let headingText=null;
    if(this.state.viewMode === "portrait"){
      headingText=(
        <MainText><HeadingText>Please login</HeadingText></MainText>
      )
    }
    return(
      <ImageBackground source={imagBackground} style={styles.imageBackground}>
      <View style={styles.container}>      
        {headingText}
        <ButtonWithbackground color="#29aaf4" onPress={()=>{alert("Hello!")}}>Switch to login</ButtonWithbackground>       
        {/* <Button title="Switch to login"/> */}
        <View style={styles.inputContainer}>
        <DefaultTextInput placeholder="Your e-mail adress" style={styles.inputText}/>
        <View style={this.state.viewMode === "portrait"?styles.portraitPasswordContainer:styles.landscapePasswordContainer}>
        <View style={this.state.viewMode === "portrait"?styles.portraitPasswordWrapper:styles.landscapePasswordWrapper}><DefaultTextInput placeholder="Confirm password" style={styles.inputText}/></View>
        <View style={this.state.viewMode === "portrait"?styles.portraitPasswordWrapper:styles.landscapePasswordWrapper}><DefaultTextInput placeholder="Set password" style={styles.inputText}/></View>
        </View>
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
  },
  portraitPasswordContainer:{
    flexDirection:"column"     
  },
  landscapePasswordContainer:{
    flexDirection: "row",
    justifyContent:"space-between"
  },
  portraitPasswordWrapper:{
    width:"100%"    
  },
  landscapePasswordWrapper:{
    width:"45%"    
  }

})
export default AuthScreen;