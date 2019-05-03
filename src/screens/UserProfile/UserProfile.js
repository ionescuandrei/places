import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AvatarPickPhoto from "../../components/AvatarPickPhoto/AvatarPickPhoto";
import { Button } from "react-native-elements";
class EditProfile extends Component {
  state = {
    name: "",
    photo: { uri: "https://bootdey.com/img/Content/avatar/avatar6.png" },
    telefone: "",
    description: "",
    reviews: "",
    email: ""
  };

  photoPickedHandler = image => {
    this.setState({
      photo: image
    });
  };
  render() {
    return (
      <AvatarPickPhoto
        onImagePicked={this.photoPickedHandler}
        ref={ref => (this.pickedImage = ref)}
        nume={this.props.name}
        photo={this.state.photo}
      />
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
    marginTop: 90
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
const mapStateToProps = state => {
  console.log(state.auth.name);
  return {
    name: state.auth.name
  };
};

export default connect(
  mapStateToProps,
  null
)(EditProfile);
