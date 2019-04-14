
import Permissions from 'react-native-permissions'
import { Alert } from 'react-native'


const permissionsCheckpoint = (response, callback) => {
  if (response === 'denied' || response === 'restricted') {
    Alert.alert(
      'CityNapper does not have "always" location access!',
      'Please go to Settings and change the location permissions for this app to "Always".',
      [
      {
        text: 'No way',
        onPress: () => Alert.alert("Unfortunately, CityNapper only works when it has access to your location. If you would like to use CityNapper in the future, you can give it location access in your iPhone's Settings app."),
        // onPress: () => noLocationAccess()
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
          onPress: () => Alert.alert("Unfortunately, CityNapper only works when it has access to your location. If you would like to use CityNapper in the future, you can give it location access in your iPhone's Settings app."),
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

