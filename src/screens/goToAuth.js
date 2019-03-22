import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "places.AuthScreen",
              passProps: {
                text: "stack with one child"
              }
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: "Find my restaurant"
            }
          }
        }
      }
    }
  });
