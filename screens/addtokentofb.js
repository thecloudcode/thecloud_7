import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import firebase from '../firebase';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const registerForPushNotificationsAsync = async () => {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      status = await Notifications.requestPermissionsAsync();
    }

    if (status !== 'granted') {
      return;
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
  };

  const addTokenToFirebase = async () => {
    try {
      let token = await registerForPushNotificationsAsync();

      if (token) {
        console.log('Expo Push Token:', token);

        const registrationNumber = '12219984'; // Replace with the registration number you want to use as the key
        const firebaseUrl = `https://thecloud-7-default-rtdb.firebaseio.com/tokens.json`;
        const response = await fetch(firebaseUrl, {
          method: 'PATCH', // Use PATCH to update a specific key in the Firebase object
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [registrationNumber]: token }), // Use object notation to set the token under the specified key
        });

        if (response.ok) {
          console.log('Token added to Firebase:', token);
        } else {
          console.log('Failed to add token to Firebase:', response);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await registerForPushNotificationsAsync();
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Add ExponentPushNotificationToken to Firebase:</Text>
      <Button title="Add Token" onPress={addTokenToFirebase} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
