
import { PushNotificationIOS } from 'react-native';
import fire_truck_air_horn from '../media/fire_truck_air_horn.wav'
import church_chime from '../media/church_chime.wav'

const requestPermissions = () => {
  PushNotificationIOS.requestPermissions({
    alert: true,
    badge: false,
    sound: true
  })
}

const localNotification = (destName) => {
  PushNotificationIOS.presentLocalNotification({
    alertTitle:"Wake up!!",
    alertBody: `You are about to arrive at ${destName}.`, 
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  }) 
  // cancelAllLocalNotifications()
}

// const endNapOnOpen = (notificationId, endNap) => {
//   PushNotificationIOS.addEventListener(
//     notificationId, 
//     endNap)
//   }

const cancelAllLocalNotifications = () => {
  PushNotificationIOS.cancelAllLocalNotifications()
}

export default {
  localNotification,
  cancelAllLocalNotifications,
  requestPermissions,
  // endNapOnOpen
 };
