import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "places.AuthScreen"
            }
          }
        ],
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false
          }
        }
      }
    }
  });
