import { createStackNavigator } from 'react-navigation'
import SearchContainer from './containers/SearchContainer'
import WelcomeContainer from './containers/WelcomeContainer'
import NapContainer from './containers/NapContainer'
import TripContainer from './containers/TripContainer'
import {AppRegistry} from 'react-native';

const TripStack = createStackNavigator(
  {
    Trip: {
      screen: TripContainer
    },
    Search: {
      screen: SearchContainer
    },
    Nap: {
      screen: NapContainer
    },
    Welcome: {
      screen: WelcomeContainer
    },
  },
  {
    mode: 'modal',
    header: null
  }
);

export default TripStack

AppRegistry.registerComponent('CityNapper', () => TripStack);