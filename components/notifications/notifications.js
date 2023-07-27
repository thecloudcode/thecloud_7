import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import firebase from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


const Note = () => {
  const [regNo, setRegNo] = useState('');
  const [userData, setUserData] = useState(null);
  const navigation=useNavigation();
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
    console.log('Fetching user data for regNo:', regNo);
    const database = firebase.database();
    const notificationsRef = database.ref('notifications').child(regNo);

    notificationsRef.once('value', (snapshot) => {
      const notificationsData = snapshot.val();
      console.log('Received notifications data:', notificationsData);

      if (Array.isArray(notificationsData)) {
        const userDataPromises = notificationsData.map((item) => {
          return database.ref('users').child(item).once('value');
        });

        Promise.all(userDataPromises)
          .then((snapshots) => {
            const userData = snapshots.map((snapshot) => snapshot.val());
            console.log('Received user data:', userData);
            setUserData(userData);
          })
          .catch((error) => {
            console.log('Error fetching user data:', error);
          });
      } else {
        // Handle case when notificationsData is not an array
        setUserData([]);
      }
    });
  };

  const increaseDatesAndRequests = (userKey, regNo, itemRegistrationNumber) => {

    const database = firebase.database();
    
    const userRef = database.ref('users').child(regNo);
    const itemUserRef = database.ref('users').child(itemRegistrationNumber);
    const chatRef = database.ref('chat').child(userKey);
    deleteFromNotifications(itemRegistrationNumber,regNo);
    const updatePromises = [
      userRef.child('dates').transaction((dates) => String((parseInt(dates) || 0) + 1)),
      itemUserRef.child('dates').transaction((dates) => String((parseInt(dates) || 0) + 1)),
      itemUserRef.child('requests').transaction((requests) => String((parseInt(requests) || 0) + 1)),
      chatRef.update({ status: '7' }),
      chatRef.update({lastmessage: 'New Date'}),
    ];

    Promise.all(updatePromises)
      .then(() => {
        console.log('Updates successful');
        fetchUserData(regNo); // Fetch updated user data to trigger re-render
      })
      .catch((error) => {
        console.log('Error updating data:', error);
      });
  };


  // const deleteNotification = (regNo, itemRegistrationNumber) => {
  //   const database = firebase.database();
  //   const notificationsRef = database.ref('notifications').child(regNo);

  //   notificationsRef.child(itemRegistrationNumber).remove()
  //     .then(() => {
  //       console.log('Notification deleted successfully');
  //     })
  //     .catch((error) => {
  //       console.log('Error deleting notification:', error);
  //     });
  // };

  const deleteFromNotifications = (regg, regNo) => {
    const database = firebase.database();
    const notificationsRef = database.ref('notifications').child(regNo);
  
    notificationsRef.once('value', (snapshot) => {
      const notificationsData = snapshot.val();
      if (Array.isArray(notificationsData)) {
        const updatedNotifications = notificationsData.filter((item) => item !== regg);
        notificationsRef.set(updatedNotifications)
          .then(() => {
            console.log(`${regg} deleted successfully from notifications list with user key ${regNo}`);
          })
          .catch((error) => {
            console.log('Error deleting from notifications list:', error);
          });
      }
    });
  };

  console.log('Rendering Note component');
  
  return (
    <View style={styles.container}>
    <View style={{width:'90%'}}><Text style={styles.searchText}>Requests</Text></View>
      <FlatList
        data={userData}
        keyExtractor={(user) => user.registrationNumber}
        renderItem={({ item }) => (
          <LinearGradient
          colors={['black',  '#fb3768']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.notifycontainer}>
            
            <TouchableOpacity onPress={()=>navigation.navigate('OtherProfile',{profile:item})}>
              <Image source={{ uri: item.profilepic }} style={styles.profilePic} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.name} wants to date you!</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => increaseDatesAndRequests(`${item.registrationNumber}${regNo}`, regNo, item.registrationNumber)}>
                <View style={styles.accept}>
                  <Text>Accept</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNotification(regNo, item.registrationNumber)}>
              <View style={styles.reject}>
                  <Text>Reject</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </LinearGradient>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    color: 'white',
  },
  accept:{
    backgroundColor: '#fb3768',
    paddingVertical: 7,
    paddingHorizontal: 17,
    borderRadius: 7,
  },
  reject:{
    backgroundColor: 'white',
    padding: 7,
    paddingHorizontal: 6,
    borderRadius: 7,
  }, 
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    //   marginTop: 20,
    color: 'white',
    fontSize: 13,
    flexWrap: 'wrap',
  },
  notifycontainer: {
    padding: 10,
    // backgroundColor: '#0d0d0d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    width: '37%',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 37,
    height: 37,
    borderRadius: 30,
    marginRight: 10,
  },
  gradient: {
    margin: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
  searchText: {
    color: 'white',
    fontSize: 25,
    marginLeft: 23,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default Note;
