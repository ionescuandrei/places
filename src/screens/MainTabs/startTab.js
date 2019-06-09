import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTab = () => {
  Promise.all([
    Icon.getImageSource("ios-search", 30),
    Icon.getImageSource("ios-add", 30),
    Icon.getImageSource("ios-menu", 30),
    Icon.getImageSource("ios-menu", 30),
    Icon.getImageSource("ios-map", 30),
    Icon.getImageSource("ios-pin", 25)
  ])
    .then(values => {
      findTab = values[0];
      shareTab = values[1];
      sideBtnFind = values[2];
      sideBtnShare = values[3];
      mapBtn = values[4];
      locationBtn = values[5];
      Navigation.setRoot({
        root: {
          sideMenu: {
            id: "sideMenu",
            left: {
              component: {
                id: "Drawer",
                name: "places.SideDrawer"
              }
            },
            center: {
              bottomTabs: {
                children: [
                  {
                    stack: {
                      id: "MyStack",
                      children: [
                        {
                          component: {
                            name: "places.FindPlace",
                            passProps: {
                              text: "This is tab 1"
                            },
                            options: {
                              topBar: {},
                              bottomTab: {
                                text: "Find",
                                icon: findTab,
                                iconColor: "red",
                                selectedIconColor: "blue",
                                currentTabIndex: 1
                              }
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    stack: {
                      id: "MyStack3",
                      children: [
                        {
                          component: {
                            name: "places.MapSearch",
                            id: "mapSearch",
                            passProps: {
                              text: "This is tab 2"
                            },
                            options: {
                              bottomTab: {
                                text: "Map",
                                icon: mapBtn,
                                iconColor: "red",
                                selectedIconColor: "blue",
                                currentTabIndex: 2
                              },
                              topBar: {
                                title: {
                                  text: "Locația mea"
                                },
                                leftButtons: [
                                  {
                                    id: "buttonOne",
                                    icon: locationBtn
                                  }
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    stack: {
                      id: "MyStack2",
                      children: [
                        {
                          component: {
                            name: "places.EditProfile",
                            id: "editProfile",
                            passProps: {
                              text: "This is tab 2"
                            },
                            options: {
                              bottomTab: {
                                text: "Profile",
                                icon: shareTab,
                                testID: "SECOND_TAB_BAR_BUTTON",
                                iconColor: "red",
                                selectedIconColor: "blue",
                                currentTabIndex: 3
                              },
                              topBar: {
                                leftButtons: [
                                  {
                                    id: "buttonOne",
                                    icon: sideBtnFind
                                  }
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export default startTab;
