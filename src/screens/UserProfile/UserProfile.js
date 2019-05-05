import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { addUserProfile } from "../../store/actions/users";
import AvatarPickPhoto from "../../components/AvatarPickPhoto/AvatarPickPhoto";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

class EditProfile extends Component {
  state = {
    name: "",
    photo: { uri: "https://bootdey.com/img/Content/avatar/avatar6.png" },
    phone: "",
    location: "",
    description: "",
    reviews: "",
    email: ""
  };

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
  }
  phoneHandler = val => {
    this.setState({
      phone: val
    });
  };
  userAddHandler = () => {
    this.props.onAddUser(this.props.name, this.state.phone, this.state.photo);
    console.log(this.state.name);
  };
  photoPickedHandler = image => {
    this.setState({
      photo: image
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <AvatarPickPhoto
          onImagePicked={this.photoPickedHandler}
          ref={ref => (this.pickedImage = ref)}
          nume={this.props.name}
          photo={this.state.photo}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.props.name}</Text>
            <Text style={styles.info}>{this.props.email}</Text>
            <View style={styles.textInput}>
              <Input
                onChangeText={this.phoneHandler}
                placeholder="Phone number"
              />
            </View>
            <View style={styles.textInput}>
              <Input placeholder="Short description" />
            </View>

            <TouchableOpacity
              onPress={this.userAddHandler}
              style={styles.buttonContainer}
            >
              <Text>Save</Text>
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
    marginBottom: 5,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80
  },
  textInput: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
    height: 20
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 5
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
  return {
    name: state.auth.name,
    email: state.auth.email
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (name, phone, photo) =>
      dispatch(addUserProfile(name, phone, photo))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
