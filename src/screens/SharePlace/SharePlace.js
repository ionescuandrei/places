import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";
import { addPlace, startAddPlace } from "../../store/actions/index";
import { Navigation } from "react-native-navigation";
import MainText from "../../UI/mainText/MainText";
import HeadingText from "../../UI/headingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlace extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    });
  };
  componentDidUpdate() {
    console.log(this.props.placeAdded);
    if (this.props.placeAdded) {
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex: 0
        }
      });
      this.props.onStartAddedPlace();
    }
  }
  placeNameInputHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  navigationButtonPressed({ buttonTwo }) {
    Navigation.mergeOptions("Drawer", {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }
  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );

    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  };
  locationPickHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };
  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };
  render() {
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <View style={styles.previewImage}>
            <PickImage
              onImagePicked={this.imagePickedHandler}
              ref={ref => (this.imagePicker = ref)}
            />
          </View>

          <View style={styles.pickMap}>
            <PickLocation
              onLocationPicked={this.locationPickHandler}
              ref={ref => (this.locationPicker = ref)}
            />
          </View>

          <View style={styles.placeInputText}>
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameInputHandler}
            />
          </View>

          {submitButton}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    height: "90%",
    marginLeft: 10,
    marginRight: 10
  },
  pickMap: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    height: "90%",
    marginLeft: 10,
    marginRight: 10
  },
  placeInputText: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    height: "90%",
    marginLeft: 10,
    marginRight: 10
  }
});
const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image)),
    onStartAddedPlace: () => dispatch(startAddPlace())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlace);
