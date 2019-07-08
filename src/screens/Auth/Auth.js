import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import DefaultTextInput from "../../UI/defaultTextInput/DefaultTextInput";
import HeadingText from "../../UI/headingText/HeadingText";
import MainText from "../../UI/mainText/MainText";
import imagBackground from "../../assets/dan-gold.jpg";
import ButtonWithbackground from "../../UI/buttonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { connect } from "react-redux";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";
import firebase from "react-native-firebase";

class AuthScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.state = {
      viewMode:
        Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      authMode: "login",
      controls: {
        name: {
          value: ""
        },
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLenght: 6
          },
          touched: false
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password"
          },
          touched: false
        }
      }
    };
    Dimensions.addEventListener("change", this.updateStyles);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
    this.getRealtimeUpdates();
  }
  componentDidMount() {
    this.props.onAutoSignIn();
  }
  switchAuthModeHanddler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };
  getRealtimeUpdates() {
    let unsubscribe = this.ref.onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc && doc.exists) {
          const myData = doc.data();
          console.log("subscript", myData);
        }
      });
    });
    console.log("subscript");
    unsubscribe();
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  authHandler = () => {
    const authData = {
      name: this.state.controls.name.value,
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    if (this.state.authMode === "signup") {
      this.ref.doc(authData.email).set({
        name: this.state.controls.name.value,
        email: this.state.controls.email.value
      });
    }
    this.props.onTryAuth(authData, this.state.authMode);
  };
  nameHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          name: {
            ...prevState.controls.name,
            value: val
          }
        }
      };
    });
  };
  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };
  render() {
    let headingText = null;
    let confirmPass = null;
    let name = null;
    let submitButton = (
      <ButtonWithbackground
        color="#29aaf4"
        onPress={this.authHandler}
        disable={
          (!this.state.controls.email.valid &&
            this.state.authMode === "signup") ||
          !this.state.controls.password.valid ||
          !this.state.controls.confirmPassword.valid
        }
      >
        Submit
      </ButtonWithbackground>
    );
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please login</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      name = (
        <DefaultTextInput
          placeholder="Your name"
          style={styles.inputText}
          value={this.state.controls.name.value}
          onChangeText={this.nameHandler}
        />
      );
      confirmPass = (
        <DefaultTextInput
          placeholder="Confirm password"
          style={styles.inputText}
          value={this.state.controls.confirmPassword.value}
          onChangeText={val => this.updateInputState("confirmPassword", val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      );
    }
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ImageBackground source={imagBackground} style={styles.imageBackground}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithbackground
            color="#29aaf4"
            onPress={this.switchAuthModeHanddler}
          >
            Switch to {this.state.authMode === "login" ? "Signup" : "Login"}
          </ButtonWithbackground>
          {/* <Button title="Switch to login"/> */}
          <View style={styles.inputContainer}>
            {name}
            <DefaultTextInput
              placeholder="Your e-mail adress"
              style={styles.inputText}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View
              style={
                this.state.viewMode === "portrait" ||
                this.state.authMode === "login"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultTextInput
                  placeholder="Set password"
                  style={styles.inputText}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState("password", val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry
                />
              </View>
              <View
                style={
                  this.state.viewMode === "portrait"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                {confirmPass}
              </View>
            </View>
          </View>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  inputText: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  portraitPasswordContainer: {
    flexDirection: "column"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  landscapePasswordWrapper: {
    width: "45%"
  }
});
const mapStateToProps = state => {
  console.log(state);
  return {
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
