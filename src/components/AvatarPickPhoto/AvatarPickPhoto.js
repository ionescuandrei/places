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
        <Image
          source={
            this.props.photo === null
              ? {
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }
              : this.props.photo
          }
          style={styles.avatar}
        />
        <View>
          <Button title="Edit Photo" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 180
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
    marginTop: 30
  }
});
