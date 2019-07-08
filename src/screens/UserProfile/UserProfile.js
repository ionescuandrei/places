import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Navigation } from "react-native-navigation";
import { addUserProfile } from "../../store/actions/users";
import AvatarPickPhoto from "../../components/AvatarPickPhoto/AvatarPickPhoto";

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
      reviews: "",
      email: ""
    };
  }
  navigationButtonPressed({ buttonTwo }) {
    Navigation.mergeOptions("Drawer", {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }

  componentDidMount() {
    this.onCollectionUpdate();
    Navigation.events().bindComponent(this);
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
          photo: { uri: doc.data().photo },
          location: doc.data().location
        });
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };

  phoneHandler = phone => {
    this.setState({ phone });
  };
  locationHandler = location => {
    this.setState({ location });
  };
  userAddHandler = () => {
    this.props.onAddUser(this.state.name, this.state.phone, this.state.photo);
    console.log(this.state.name);
    this.ref.doc(this.state.email).set(
      {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        photo: this.state.photo.uri,
        location: this.state.location
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AvatarPickPhoto
              onImagePicked={this.photoPickedHandler}
              ref={ref => (this.pickedImage = ref)}
              nume={this.state.name}
              photo={this.state.photo}
            />
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.info}>{this.state.email}</Text>
              <View style={styles.textIn}>
                <Input
                  onChangeText={this.phoneHandler.bind(this)}
                  placeholder={this.state.phone}
                  value={this.state.phone}
                />
              </View>
              <View style={styles.textIn}>
                <Input
                  placeholder={this.state.location}
                  onChangeText={this.locationHandler.bind(this)}
                  value={this.state.location}
                />
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textIn: {
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
    onAddUser: (name, phone, photo, location) =>
      dispatch(addUserProfile(name, phone, photo, location))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
