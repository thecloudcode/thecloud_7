import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

sendPushNotifications = () => {
    let response = fetch('https://exp.host/--/api/v2/push/send',{
        method: 'POST',
        headers: {
            Accept: 'applications/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            to: 'ExponentPushToken[Z41lHSOs8Rc3YffaRwQdDu]',
            sound: 'default',
            title: 'I am the best',
            body: 'But my mum is better'
        })
    });
}

export default function App(){

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    return(
        <View style={styles.container}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <Button title='Send' onPress={sendPushNotifications()}></Button>
            <StatusBar style="auto"></StatusBar>
        </View>
    );
}

const styles= StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }