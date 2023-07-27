import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import firebase from '../../firebase';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [storedUsername, setStoredUsername] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [textColor, setTextColor] = useState('black');


  const fetchUsername = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
      setRegistrationNumber(storedUsername);
      console.log('Stored username:', storedUsername);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const fetchUserData = (registrationNumber) => {
    const userRef = firebase.database().ref(`users/${registrationNumber}`);

    userRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserData(userData);
      }
    });
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (registrationNumber) {
      fetchUserData(registrationNumber);
      const chatRef = firebase.database().ref('chat');

      const fetchOtherUsers = () => {
        chatRef.on('value', (snapshot) => {
          if (snapshot.exists()) {
            const chatData = snapshot.val();
            const chatKeys = Object.keys(chatData);
      
            const keysWithRegistrationNumber = chatKeys.filter((key) => {
              const status = chatData[key]?.status; // Get the value of "status" from the child object
              const lm = chatData[key]?.lastmessage;
              return key.includes(registrationNumber) && status == "7";
            });
      
            const otherUserRegNos = keysWithRegistrationNumber.map((key) =>
              key.replace(registrationNumber, '')
            );
      
            const promises = otherUserRegNos.map((regNo) => {
              return firebase.database().ref(`users/${regNo}`).once('value');
            });
      
            Promise.all(promises)
              .then((snapshots) => {
                const otherUsersData = snapshots.map((snapshot) => {
                  const userData = snapshot.val();
                  const key1 = `${registrationNumber}${userData.registrationNumber}`;
                  const key2 = `${userData.registrationNumber}${registrationNumber}`;
                  const lm = chatData[key1]?.lastmessage || chatData[key2]?.lastmessage;
                  return { ...userData, lm };
                });
      
                // Sort the otherUsersData based on the last value
                otherUsersData.sort((a, b) => {
                  const aKey = `${registrationNumber}${a.registrationNumber}`;
                  const bKey = `${registrationNumber}${b.registrationNumber}`;
                  const aLast = chatData[aKey] ? Object.values(chatData[aKey])[0] : 0;
                  const bLast = chatData[bKey] ? Object.values(chatData[bKey])[0] : 0;
      
                  return bLast - aLast;
                });
      
                setOtherUsers(otherUsersData);
              })
              .catch((error) => {
                console.log("Error fetching other users:", error);
              });
          }
        });
      };
      
      
      

      fetchOtherUsers();

      return () => {
        chatRef.off('value');
      };
    }
  }, [registrationNumber]);


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
  

  return (
    <View style={styles.container}>
      {/* <Text>User Data:</Text> */}
      {userData && (
        <View style={styles.userDataContainer}>
      {/* <Text styles={{color:'white',fontWeight: 'bold', fontSize:90 }}>Hello {userData.name},</Text> */}
          
      <Text style={styles.currentusertext}>Hi {userData.name.split(' ')[0]},</Text>
          {otherUsers.length > 0 && (
            <FlatList
              data={otherUsers}
              renderItem={({ item }) => (
                
                  <View style={styles.otherUserContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('OtherProfile', { profile: item })}>
                    <Image
                      source={{ uri: item.profilepic }}
                      style={styles.profilePic}
                    />
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity
                      onPress={() => {
                        // Call saveTimestamp function before navigating to ChatScreen2
                        saveTimestamp(registrationNumber, item.registrationNumber);

                        // Navigate to ChatScreen2 with the registration numbers as parameters
                        navigation.navigate('ChatScreen2', {
                          currentUserRegistrationNumber: registrationNumber,
                          otherUserRegistrationNumber: item.registrationNumber,
                          profile:item,
                        });
                      }}
                      key={item.registrationNumber}
                    >
                      <Text style={styles.nametext}>{item.name}</Text>
                      <View style={{flexDirection:'row', height: 20,width:200}}>
                        
                      {item.lm === "New Date" ? (
                      <Text style={{ color: 'white', fontWeight: 'bold'}}>{item.lm}</Text>
                      ) : (
                      <Text style={styles.text}>{item.lm}...</Text>
                      )}

                      </View>
                    </TouchableOpacity>
                    </View>
                  </View>
              )}
              keyExtractor={(item) => item.registrationNumber}
            />
          )}

        </View>
      )}
      <View style={{alignItems: 'center', width: '100%'}}>
      <Text style={{color: '#595959'}}>- Chats -</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    color: 'white',
  },
  userDataContainer: {
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight:5,
    // marginBottom: 10,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  nametext: {
    color: 'white',
    fontWeight: 'bold',
  },
  currentusertext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 27,
    margin: 3,
    paddingLeft: 17,

  },
  otherUserContainer: {
    margin: 3,
    padding: 10,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: "#0d0d0d",
    // backgroundColor:'aqua',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 17,
    // zindex: 50,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 37,
    marginRight: 10,
  },
});

export default HomeScreen;
