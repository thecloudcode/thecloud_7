import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import firebase from '../../firebase';

const ProfilePic = () => {
  const [profileData, setProfileData] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState('');

  useEffect(() => {
    retrieveStoredCredentials();
  }, []);

  const retrieveStoredCredentials = async () => {
    try {
      const username = await SecureStore.getItemAsync('username');
      const password = await SecureStore.getItemAsync('password');
      setRegistrationNumber(username || '');
      console.log(setRegistrationNumber);

      if (username && password) {
        const userRef = firebase.database().ref(`users/${username}`);
        userRef.once('value', (snapshot) => {
          const userData = snapshot.val();
          setProfileData(userData);
          console.log(setProfileData);
        });
      }
    } catch (error) {
      console.log('Error retrieving stored credentials:', error);
    }
  };

  const handleEditProfile = () => {
    // Handle edit profile action
    // ...
  };

  return (
    <View style={styles.container}>
      <Image source={{uri:profileData.profilepic}} style={styles.profileImage} />
      {/* <Image
                      // source={{ uri: user.profilepic }}
                      // style={styles.profilePic}
                    // /> */}
      <View style={styles.overlay}>
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.registrationNumber}>
          Registration Number: {profileData?.registrationNumber}
        </Text>
        <Text style={styles.aboutText}>I love you Badal!</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <AntDesign name="edit" size={24} color="black" style={{ backgroundColor: '#fb3768' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -90,
    alignItems: 'center',
    height: 270,
    width: 370,
    borderRadius: 30,
  },
  profileImage: {
    width: 370,
    height: 370,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  editButton: {
    position: 'absolute',
    bottom: -125,
    right: 30,
    backgroundColor: '#fb3768',
    borderRadius: 30,
    padding: 15,
  },
  overlay: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileName: {
    paddingLeft: 17,
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fb3768',
    marginBottom: 5,
  },
  registrationNumber: {
    paddingLeft: 17,
    fontSize: 16,
    color: 'white',
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 16,
    color: 'grey',
  },
});

export default ProfilePic;
