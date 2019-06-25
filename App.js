import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import FindPlaces from "./src/screens/FindPlace/FindPlace";
import SharePlace from "./src/screens/SharePlace/SharePlace";
import PlaceDetail from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import MapSearch from "./src/screens/MapSearch/MapSearch";
import EditProfile from "./src/screens/UserProfile/UserProfile";
import configureStore from "./src/store/configureStore";
import TopPicks from "./src/screens/TopPicks/TopPicks";
import Settings from "./src/screens/Settings/Settings";
import { Provider } from "react-redux";
import { goToAuth } from "./src/screens/goToAuth";
const store = configureStore();
//Register Screens
Navigation.registerComponentWithRedux(
  "places.AuthScreen",
  () => AuthScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.FindPlace",
  () => FindPlaces,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.SharePlace",
  () => SharePlace,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.PlaceDetail",
  () => PlaceDetail,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.SideDrawer",
  () => SideDrawer,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.MapSearch",
  () => MapSearch,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.EditProfile",
  () => EditProfile,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.TopPicks",
  () => TopPicks,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "places.Settings",
  () => Settings,
  Provider,
  store
);
//Start a app
goToAuth();
