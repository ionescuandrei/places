import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";
import GetDirections from "../../components/Direction/getDirections";
import { Badge, AirbnbRating, Divider } from "react-native-elements";
import { updatePlace } from "../../store/actions/places";
import firebase from "react-native-firebase";
import ListOfComments from "../../components/ListComments/ListComments";

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("users");
    this.state = {
      viewMode: "portrait",
      rating: props.selectedPlace.rating,
      starchoose: true,
      user: null
    };
  }
  componentDidMount() {
    Dimensions.addEventListener("change", this.updateStyles);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.onCollectionUpdate();
  }
  componentDidUpdate() {
    console.log("state rating", this.state.rating);
    this.props.onUpdateRating(this.props.selectedPlace.key, this.state.rating);
  }
  onCollectionUpdate = () => {
    var getDoc = this.ref
      .doc(this.props.email)
      .get()
      .then(doc => {
        this.setState({
          user: doc.data()
        });
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };
  handleClickWeb = () => {
    Linking.canOpenURL(this.props.selectedPlace.web.value).then(supported => {
      if (supported) {
        Linking.openURL(this.props.selectedPlace.web.value);
      } else {
        console.log(
          "Don't know how to open URI: " + this.props.selectedPlace.web.value
        );
      }
    });
  };
  placeDeletedHandler = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop("MyStack");
  };
  ratingCompleted(rat) {
    this.setState(state => {
      return {
        rating: {
          value: state.rating.value + rat,
          count: state.rating.count + 1,
          starchoose: false
        }
      };
    });

    console.log("state rating", this.state.rating, rat);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  callNumber = () => {
    let phone = this.props.selectedPlace.phone;
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const score = this.state.rating.value / this.state.rating.count;
    return (
      <ScrollView style={styles.styleScrol}>
        <View
          style={[
            styles.container,
            this.state.viewMode === "portrait"
              ? styles.portraitContainer
              : styles.landscapeContainer
          ]}
        >
          <View>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <View style={styles.placeNameTitle}>
                <Text style={styles.placeName}>
                  {this.props.selectedPlace.name}
                </Text>
                <Text>Specific: {this.props.selectedPlace.type}</Text>
              </View>

              <View style={styles.badgeContaniner}>
                <Text style={styles.badge}>{score.toFixed(1)}</Text>
              </View>
            </View>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <GetDirections
              mylocation={this.props.mylocation}
              location={this.props.selectedPlace.location}
            />
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <TouchableOpacity onPress={this.handleClickWeb}>
              <View style={styles.button}>
                <Text style={styles.textWeb}>
                  {this.props.selectedPlace.web.value}
                </Text>
              </View>
            </TouchableOpacity>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View style={styles.adressContainer}>
              <Text style={styles.adressStyle}>Pentru rezervări sună la</Text>
              <TouchableOpacity onPress={this.callNumber}>
                <View style={styles.callButton}>
                  <Icon
                    size={30}
                    name={Platform.OS === "android" ? "md-call" : "ios-call"}
                    color="blue"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View>
              <AirbnbRating
                count={5}
                reviews={[
                  "Rău",
                  "Mediocru",
                  "Bun",
                  "Foarte Bun",
                  "Extraordinar"
                ]}
                defaultRating={3}
                size={30}
                onFinishRating={this.ratingCompleted}
              />
            </View>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View style={styles.adressContainer}>
              <Text style={styles.adressStyle}>
                Adresa:
                {this.props.selectedPlace.adress}
              </Text>
            </View>
            {/* <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity> */}

            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "200" }}>Recenzii</Text>
              <ListOfComments
                keie={this.props.selectedPlace.key}
                user={this.state.user}
                comments={this.props.selectedPlace.comments}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  styleScrol: { height: "100%", width: "100%" },
  container: {
    display: "flex"
  },
  subContainer: {
    flex: 1,
    margin: 15
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeImage: {
    width: 500,
    height: 250
  },
  placeNameTitle: {
    alignItems: "flex-start"
  },
  badgeContaniner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 30,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#258",
    alignSelf: "flex-start"
  },
  badge: { fontSize: 18 },
  placeName: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 28
  },
  adressStyle: {
    fontSize: 20,
    fontFamily: "Times New Roman"
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    flexDirection: "row"
  },
  deleteButton: {
    alignItems: "center"
  },
  adressContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textWeb: {
    fontSize: 20,
    fontFamily: "Times New Roman",
    alignSelf: "center"
  }
});
const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key)),
    onUpdateRating: (key, rating) => dispatch(updatePlace(key, rating))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDetail);
