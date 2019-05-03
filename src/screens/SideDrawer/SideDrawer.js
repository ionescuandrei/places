import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { authLogout } from "../../store/actions";
class SideDrawer extends Component {
  pushShareScreen() {
    Navigation.push("MyStack", {
      component: {
        name: "places.SharePlace",
        passProps: {
          text: "Pushed screen"
        },
        options: {
          topBar: {
            title: {
              text: "Add a restaurant"
            }
          }
        }
      }
    });
    Navigation.mergeOptions("Drawer", {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }}
              />

              <Text style={styles.name}>John Doe </Text>
              <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
              <Text style={styles.userInfo}>Florida </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: "https://png.icons8.com/home/win8/50/ffffff" }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: "https://png.icons8.com/settings/win8/50/ffffff"
                  }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Settings</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: "https://png.icons8.com/news/win8/50/ffffff" }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>News</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={this.pushShareScreen}
              style={styles.item}
            >
              <View style={styles.iconContent}>
                <Icon
                  name="ios-share"
                  size={30}
                  color="#FFFFFF"
                  style={styles.icon}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Share a restaurant</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.onLogout} style={styles.item}>
              <View style={styles.iconContent}>
                <Icon
                  name="ios-log-out"
                  size={30}
                  color="#FFFFFF"
                  style={styles.icon}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Sign out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
    flex: 1
  },
  header: {
    backgroundColor: "#DCDCDC"
  },
  headerContent: {
    padding: 30,
    alignItems: "center"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600"
  },
  body: {
    flex: 1,
    backgroundColor: "#778899",
    height: 500
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginRight: 150
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF"
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
