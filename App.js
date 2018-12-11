import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaces from './src/screens/FindPlace/FindPlace';
import SharePlace from './src/screens/SharePlace/SharePlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer  from "./src/screens/SideDrawer/SideDrawer";
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();
//Register Screens
Navigation.registerComponentWithRedux("places.AuthScreen", ()=>AuthScreen, Provider, store);
Navigation.registerComponentWithRedux("places.FindPlace", ()=>FindPlaces, Provider, store);
Navigation.registerComponentWithRedux("places.SharePlace", ()=>SharePlace, Provider, store);
Navigation.registerComponentWithRedux("places.PlaceDetail", ()=>PlaceDetail, Provider, store);
Navigation.registerComponentWithRedux("places.SideDrawer", ()=>SideDrawer, Provider, store);
//Start a app
Navigation.setRoot({
  root: {
    stack: {
      children: [{
        component: {
          name: 'places.AuthScreen',
          passProps: {
            text: 'stack with one child'
          }
        }
      }],
      options: {
        topBar: {
          title: {
            text: 'Welcome screen'
          }
        }
      }
    }
  }
});