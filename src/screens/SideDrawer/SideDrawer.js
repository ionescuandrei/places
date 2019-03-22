import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { authLogout } from "../../store/actions";
class SideDrawer extends Component {
  render() {
    return (
      <View
        style={[
          style.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={style.drawerItem}>
            <Icon
              name="ios-log-out"
              size={30}
              color="#bbb"
              style={style.drawerItemIcon}
            />
            <Text> Sign out </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SideDrawer);
