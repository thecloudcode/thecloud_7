import firebase from '../firebase';
import React from "react";
import { View, Text, SafeAreaView, StyleSheet,  TouchableOpacity, Button} from 'react-native';
// Initialize Firebase app
// Make sure you have already set up your Firebase project and added the necessary configurations

// Function to save the timestamp in the Firebase Realtime Database
const saveTimestamp = (regg1, regg2) => {
  const userKey = `${regg1}${regg2}`;
  const alternateUserKey = `${regg2}${regg1}`;

  // Reference to the chat section in the Firebase Realtime Database
  const chatRef = firebase.database().ref('chat');

  // Check if the userKey exists
  chatRef.child(userKey).once('value', snapshot => {
    if (snapshot.exists()) {
      // UserKey exists, save the timestamp in regg1 key
      chatRef.child(`${userKey}/${regg1}`).set(Date.now());
    } else {
      // UserKey doesn't exist, check if alternateUserKey exists
      chatRef.child(alternateUserKey).once('value', alternateSnapshot => {
        if (alternateSnapshot.exists()) {
          // AlternateUserKey exists, save the timestamp in regg1 key
          chatRef.child(`${alternateUserKey}/${regg1}`).set(Date.now());
        } else {
          // AlternateUserKey doesn't exist, create userKey and save the timestamp in regg1 key
          chatRef.child(`${userKey}/${regg1}`).set(Date.now());
        }
      });
    }
  });
};

// Component that renders the button triggering the saveTimestamp function
const Timestamp = () => {
  const handleButtonPress = () => {
    const regg1 = '12201969';
    const regg2 = '11813914';
    saveTimestamp(regg1, regg2);
  };

  return (
    <TouchableOpacity style={{top:200}} onPress={handleButtonPress}>
        <Text>Save</Text>
    </TouchableOpacity>
  );
};

export default Timestamp;
