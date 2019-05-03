import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import ImagePicker from "react-native-image-picker";
export default class AvatarPickPhoto extends Component {
  state = {
    pickedImage: null
  };
  reset = () => {
    this.setState({
      pickedImage: null
    });
  };
  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an image", maxHeight: 800, maxWidth: 600 },
      res => {
        if (res.didCancel) {
          console.log("User Canceled");
        } else if (res.error) {
          console.log("error");
        } else {
          this.setState({
            pickedImage: { uri: res.uri }
          });
          this.props.onImagePicked({ uri: res.uri, base64: res.data });
        }
      }
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image source={this.props.photo} style={styles.avatar} />
        <View>
          <Button title="Edit Photo" onPress={this.pickImageHandler} />
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.nume}</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 50
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});
