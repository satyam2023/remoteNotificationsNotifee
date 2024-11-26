/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { displayNotification } from './src/utils';
import notifee, { EventType } from '@notifee/react-native';


notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.PRESS:
      console.log('Notification Pressed in Background:', detail.notification);
      break;
    case EventType.DISMISSED:
      console.log('Notification Dismissed in Background:', detail.notification);
      break;
  }
});

messaging().setBackgroundMessageHandler(message => {
  const { description, title } = message.data;
  displayNotification(title, description) ;
}
);

messaging().getInitialNotification(message => {
  const { description, title } = message.data;
  displayNotification(title, description) ;
})

AppRegistry.registerComponent(appName, () => App);
