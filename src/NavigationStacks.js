import { createStackNavigator } from 'react-navigation'
import SearchComponent from './components/SearchComponent'
import SavedComponent from './components/SavedComponent'
import NapContainer from './containers/NapContainer'
import TripContainer from './containers/TripContainer'
import {AppRegistry} from 'react-native';

const TripStack = createStackNavigator(
  {
    Trip: {
      screen: TripContainer
    },
    Search: {
      screen: SearchComponent
    },
    Saved: {
      screen: SavedComponent
    },
    Nap: {
      screen: NapContainer
    },
  },
  {
    mode: 'modal',
    header: null
  }

);

export default TripStack
// const UserStack = createStackNavigator(
//   {
//     profile: UserProfile,
//     settings: UserSettings,
//   },
//   {
//     initialRouteName: 'profile',
//   }
// );

AppRegistry.registerComponent('CityNapper', () => TripStack);