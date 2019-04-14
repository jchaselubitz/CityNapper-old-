import { createStackNavigator } from 'react-navigation'
import SearchContainer from './containers/SearchContainer'
import NapContainer from './containers/NapContainer'
import TripContainer from './containers/TripContainer'
import LocationErrorContainer from './containers/LocationErrorContainer'
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
    LocationWarning: {
      screen: LocationErrorContainer
    },
  },
  {
    mode: 'modal',
    header: null
  }
);

export default TripStack

AppRegistry.registerComponent('CityNapper', () => TripStack);