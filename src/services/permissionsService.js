
import Permissions from 'react-native-permissions'
import { Alert } from 'react-native'


permissionsCheckpoint = () => {
  if (this.state.mapLocationPermission === 'undetermined') {
    Alert.alert(
      'Can we access your location?',
      'CityNapper needs permission to track your "always" in order to wake you up when you are close to your stop',
      [
        {
          text: 'No way',
          onPress: () => console.log('Permission denied'), // should send to a failure screen
          style: 'cancel',
        },
        this.state.mapLocationPermission === 'undetermined'
          ? { text: 'OK', onPress: this.requestLocationPermissions }
          : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  } else {
      locationFunction()
    }
  }

  export default {
    permissionsCheckpoint
  }


  // checkPermissions(CurrentPermissions, () => this.watchLocation())