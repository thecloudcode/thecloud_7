import React from 'react';
import { View, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Pushnotes({mssg}) {
  const handleButtonPress = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'thecloud',
        body: mssg,
      },
      trigger: null,
    });
    // Alert.alert('Notification scheduled!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Notification" onPress={handleButtonPress} />
    </View>
  );
}
