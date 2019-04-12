
import Permissions from 'react-native-permissions'
import { Alert } from 'react-native'


const permissionsCheckpoint = (response, callback) => {
  console.log('#############RESPONSE##################', response)
  if (response === 'denied' || response === 'restricted') {
    Alert.alert(
      'CityNapper does not have "always" location access!',
      'Please go to Settings and change the location permissions for this app to "Always".',
      [
      {
        text: 'No way',
        onPress: () => console.log('Permission denied'), // should send to a failure screen
        style: 'cancel',
      },
      { text: 'Open Settings', 
        onPress: Permissions.openSettings
      },
    ],
    )
  }
  if (response === 'undetermined') {
    Alert.alert(
      'Can we access your location?',
      'CityNapper needs permission to track your "always" in order to wake you up when you are close to your stop.',
      [
        {
          text: 'No way',
          onPress: () => console.log('Permission denied'), // should send to a failure screen
          style: 'cancel',
        },
        { text: 'OK', 
        onPress: () => requestLocationPermissions(callback),
        }
      ],
    )
  } else {
    callback()
  }
}

const requestLocationPermissions = (callback) => {
  Permissions.request('location', { type: 'whenInUse'})
  .then(response => permissionsCheckpoint(response, callback))
}

  export default {
    permissionsCheckpoint,
  }


  // checkPermissions(CurrentPermissions, () => this.watchLocation())