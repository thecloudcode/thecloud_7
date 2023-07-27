import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import firebase from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const Saved = () => {
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

  const fetchUserData = (regNo) => {
    const database = firebase.database();
    const saveRef = database.ref('save').child(regNo);

    saveRef.once('value', (snapshot) => {
      const saveData = snapshot.val();
      if (saveData) {
        const keys = Object.keys(saveData);
        const userRef = database.ref('users');

        userRef.once('value', (snapshot) => {
          const usersData = snapshot.val();
          const filteredUsers = {};

          keys.forEach((key) => {
            if (usersData[key]) {
              filteredUsers[key] = usersData[key];
            }
          });

          setUserData(filteredUsers);
        });
      } else {
        setUserData(null);
      }
    });
  };

  const renderItem = ({ item }) => {
    const { name, profilepic, star } = item;
    return (
      <View style={styles.userContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: profilepic }} style={styles.profilePic} />
          <Text style={styles.userName}>{name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.starRating}>{star}</Text>
          <Icon name="star" size={20} color="#fb3768" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.saved}>Saved</Text>

      {userData ? (
        <FlatList
          data={Object.values(userData)}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Text style={styles.text}>No saved users found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 30,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    // paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'space-between',
    borderRadius: 35,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 20,
    position: 'relative',
    color: 'black',
    fontSize: 20,
  },
  saved: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    marginBottom: 20,
  },
  starRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fb3768',
    marginRight: 2,
  },
});

export default Saved;
