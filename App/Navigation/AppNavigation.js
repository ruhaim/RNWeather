import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import WeatherDetailScreen from "../Containers/WeatherDetailScreen";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    WeatherDetailScreen: { screen: WeatherDetailScreen }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
