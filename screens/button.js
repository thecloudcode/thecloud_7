import React, { useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
import firebase from '../firebase';

const Buttonlol = () => {
  const [count, setCount] = useState(0);

  const handleAddButtonPress = () => {
    setCount(count + 1);
  };

  const addDataToNotification = async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref(`/notifications/12212952`)
        .once('value');
      const data = snapshot.val();
      data.unshift('lol');
      await firebase
        .database()
        .ref(`/notifications/12212952`)
        .set(data);
      console.log('Data added successfully');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Add" onPress={addDataToNotification} />
      <View style={{ marginTop: 20 }}>
        <Text>Count: {count}</Text>
      </View>
    </View>
  );
};

export default Buttonlol;
