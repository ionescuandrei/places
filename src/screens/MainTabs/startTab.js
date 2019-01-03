import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

const startTab =()=>{  
  Promise.all(
    [
      Icon.getImageSource('ios-search', 30),
      Icon.getImageSource("ios-add", 30),
      Icon.getImageSource("ios-menu", 30),
      Icon.getImageSource("ios-menu", 30)
    ]
  ).then((values) => {
    findTab = values[0];
    shareTab = values[1];
    sideBtnFind = values[2];
    sideBtnShare  = values[3];
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
          center:{
            bottomTabs: {
              children: [{
                stack: {
                  id:'MyStack',
                  children: [{
                    component: {
                      name: 'places.FindPlace',
                      passProps: {
                        text: 'This is tab 1'
                      },
                        options: {
                        topBar: {
                                      leftButtons: [
                                        {
                                          id: 'buttonOne',
                                          icon: sideBtnFind
                                        }
                                                    ]
                                    },
                       bottomTab: {
                                      text: 'Find',
                                      icon:findTab,
                                      testID: 'FIRST_TAB_BAR_BUTTON',
                                      iconColor: 'red',
                                      selectedIconColor: 'blue'
                                    }
    
                      }
                    }
                  }],
                  options: {
                  //   topBar: {
                  //                 leftButtons: [
                  //                   {
                  //                     id: 'buttonOne',
                  //                     icon: sideBtnFind
                  //                   }
                  //                               ]
                  //               },
                  //  bottomTab: {
                  //                 text: 'Find',
                  //                 icon:findTab,
                  //                 testID: 'FIRST_TAB_BAR_BUTTON'
                  //               }

                  }
                }
              },{
                stack: {
                  id:'MyStack2',
                  children: [ {
                    component: {
                      name: 'places.SharePlace',
                      id:'shareScreen',
                      passProps: {
                        text: 'This is tab 2'
                      },
                      options: {                   
                        bottomTab: {
                          text: 'Share',
                          icon: shareTab,
                          testID: 'SECOND_TAB_BAR_BUTTON',
                          iconColor: 'red',
                          selectedIconColor: 'blue'
                        },
                        topBar: {
                          leftButtons: [
                            {
                              id: 'buttonOne',
                              icon: sideBtnFind
                            }
                                        ]
                        }
                      }
                    }
                  }],
                  options: {
                  //   topBar: {
                  //                 leftButtons: [
                  //                   {
                  //                     id: 'buttonOne',
                  //                     icon: sideBtnFind
                  //                   }
                  //                               ]
                  //               },
                  //  bottomTab: {
                  //                 text: 'Find',
                  //                 icon:findTab,
                  //                 testID: 'FIRST_TAB_BAR_BUTTON'
                  //               }

                  }
                }
              },
             ]
            }          
          }
        }
      }      
    });
  }).catch((error) => {
    console.log(error);    
  })
  } 
  
export default startTab;