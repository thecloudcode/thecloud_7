import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import firebase from 'firebase/app';
// import 'firebase/database';
import firebase from '../firebase';

const Screen1 = () => {
  const navigation = useNavigation();

  const saveTimestampToFirebase = () => {
    const regg1 = '12214352';
    const regg2 = '12214076';
    const userKey = `${regg1}${regg2}`; // Concatenate regg1 and regg2 to create the userKey

    firebase
      .database()
      .ref(`chat/${userKey}/${regg1}`)
      .set(Date.now())
      .then(() => {
        console.log('Timestamp saved to Firebase.');
      })
      .catch((error) => {
        console.log('Error saving timestamp:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Go to Screen 2" onPress={() => navigation.push('SignIn')} />
      <Button title="Save Timestamp" onPress={saveTimestampToFirebase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen1;