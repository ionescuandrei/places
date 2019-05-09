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
import firebase from "react-native-firebase";

class EditProfile extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("users");
    this.unsubscribe = null;
    this.state = {
      name: "",
      photo: { uri: "https://bootdey.com/img/Content/avatar/avatar6.png" },
      phone: "",
      location: "",
      description: "",
      reviews: "",
      email: ""
    };
  }

  componentDidMount() {
    this.onCollectionUpdate();
  }
  onCollectionUpdate = () => {
    var getDoc = this.ref
      .doc(this.props.email)
      .get()
      .then(doc => {
        this.setState({
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          photo: { uri: doc.data().photo }
        });
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };

  phoneHandler = val => {
    this.setState({
      phone: val
    });
  };
  userAddHandler = () => {
    console.log("starea curenta", this.state.email, this.state.name);
    this.props.onAddUser(this.state.name, this.state.phone, this.state.photo);
    console.log(this.state.name);
    this.ref.doc(this.state.email).set(
      {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        photo: this.state.photo.uri
      },
      { merge: true }
    );
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
          nume={this.state.name}
          photo={this.state.photo}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.info}>{this.state.email}</Text>
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
