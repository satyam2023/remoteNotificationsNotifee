import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
export const notificationChannel="notification_channel";

export const setNotificationsHandler = async () => {
  let granted = await checkNotificationPermissionStatus();
  await messaging().registerDeviceForRemoteMessages();
  if (!granted) {
    const authorizationStatus = await messaging().requestPermission();
   await notifee.requestPermission()
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
    return;
  }
  const token = await messaging().getToken();
  console.log("Token::",token);
};

export const checkNotificationPermissionStatus = async (): Promise<boolean> => {
  try {
    const permissionStatus = await messaging().hasPermission();
    const granted =
      permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return granted;
  } catch (error) {
    console.error('Error checking notification permission:', error);
    throw error;
  }
};

export const displayNotification=async(title:string,body:string)=>{
 let channel;
  notifee.registerForegroundService(() => {
    return new Promise(() => {
      notifee.onForegroundEvent(({ type, detail }) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail?.pressAction?.id === "stop"
        ) {
          notifee.stopForegroundService();
        }
      });
    });
  });
  const isChannelCreated = await notifee.isChannelCreated(
    "notification_channel",
  );
  if (!isChannelCreated) {
    channel = await notifee.createChannel({
      id: "notification_channel",
      name: "notification_channel",
    });
  } else channel = "notification_channel";

    notifee.displayNotification({
        title,
        body,
        android: {
          channelId:channel,
          sound: "default",
          importance: AndroidImportance.HIGH,
          color: '#4caf50',
          pressAction: {
            id: notificationChannel,
          },
        },
      });
}
