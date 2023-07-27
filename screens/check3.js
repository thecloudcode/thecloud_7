import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import firebase from '../firebase';

const UserProfileScreen = () => {
  const [RegNo, setRegNo] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
      console.log('Stored username:', storedUsername);
      setRegNo(storedUsername);
      fetchUserData(storedUsername);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const fetchUserData = (RegNo) => {
    const database = firebase.database();
    const userRef = database.ref('users').child(RegNo);

    userRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  return (
    <View>
      <Text style={styles.text}>Welcome, {RegNo}!</Text>
      {userData && (
        <View>
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
          {/* Add more properties as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    position: 'relative',
    color: 'black',
    // top: 100,
    fontSize: 20,
  },
});

export default UserProfileScreen;
