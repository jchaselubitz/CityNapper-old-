import { createStackNavigator } from 'react-navigation'
import SearchComponent from './components/SearchComponent'
import SelectionContainer from './containers/SelectionContainer'
import TripContainer from './containers/TripContainer'
import Icon from 'react-native-elements'
import {AppRegistry} from 'react-native';

const TripStack = createStackNavigator(
  {
    Trip: {
      screen: TripContainer
    },
    Selection: {
      screen: SelectionContainer
    },
    Search: {
      screen: SearchComponent
    }
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