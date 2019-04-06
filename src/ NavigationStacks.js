import { createStackNavigator } from 'react-navigation'
import SearchComponent from './components/SearchComponent'
import TripContainer from './containers/TripContainer'

const TripStack = createStackNavigator(
  {
    Trip: TripContainer,
    Search: SearchComponent,
  },
  {
    initialRouteName: 'Trip',
  }
);

// const UserStack = createStackNavigator(
//   {
//     profile: UserProfile,
//     settings: UserSettings,
//   },
//   {
//     initialRouteName: 'profile',
//   }
// );

export { TripStack }
