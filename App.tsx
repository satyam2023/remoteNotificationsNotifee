/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {displayNotification, setNotificationsHandler} from './src/utils';
import messaging from '@react-native-firebase/messaging';
import HomeScreenViewModel from './src/viewModels/HomeScreenViewModel';


function App(): React.JSX.Element {
  
  useEffect(() => {
    setNotificationsHandler();
    const unsubscribe = messaging().onMessage(async message => {
      if (!message || !message?.data) {
        return;
      }
      const { description, title } = message.data;
      displayNotification(title as string,description as string);
    });
    return unsubscribe;
  }, []);

  return <HomeScreenViewModel/>;
}

export default App;
