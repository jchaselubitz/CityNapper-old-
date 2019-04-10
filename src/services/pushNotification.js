
import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS } from 'react-native';

const configure = () => {
  PushNotification.configure({

    onRegister: function(token) {
      //process token
 },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
      //Process the notification here
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: false,
      sound: true
  },
    requestPermissions: true
  
  })

}

const localNotification = () => {
  setTimeout(function(){ 
  PushNotification.localNotification({
    title: "Wake up!!", // (optional)
    message: `You are about to arrive at your destination!.`, // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  })  
  }, 1000);
}

const cancelAllLocalNotifications = () => {
  PushNotificationIOS.cancelAllLocalNotifications()
}

export default {
  configure,
  localNotification,
  cancelAllLocalNotifications
 };
