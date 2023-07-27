import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid,ScrollView } from 'react-native';
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import ProfilePic from "../components/profile/ProfilePic";
import { useRoute } from '@react-navigation/native';
import { useNavigation} from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import firebase from '../firebase';
// import Toast from 'react-native-toast-message';


// import { AntDesign } from '@expo/vector-icons';

import Numbers from "../components/profile/numbers";
import StarRatingBar from "../components/profile/star";

const Star = (num) => {
  return (
    <View style={styles.starcontainer}>
      <StarRatingBar rating={{num}} />
    </View>
  );
};

const OtherProfile = () => {
  const route = useRoute();
  const { profile } = route.params;
  const navigation = useNavigation();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [userData, setUserData] = useState(null);

  const [statusText, setStatusText] = useState('Date');
  const [saved, setSaved] = useState(false);
  const [myGender, setMyGender] = useState('');



  const fetchUsername = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
      setRegistrationNumber(storedUsername);
      console.log(profile.gender);
      const m= await SecureStore.getItemAsync('myGender');
      setMyGender(m);

      console.log('Stored username in otherprofile:', storedUsername);
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
        console.log(userData,profile);
        // console.log(profile.gender, userData.gender);

      }
    });
  };

  useEffect(() => {
    if (registrationNumber) {
      fetchUserData(registrationNumber);
    }
  }, [registrationNumber]);


  useEffect(() => {
    fetchUsername();
    checkStatus(profile.registrationNumber);
      
    const saveRef = firebase.database().ref('/save');
    if(registrationNumber){
    saveRef.child(registrationNumber).once('value').then((snapshot) => {
    const data = snapshot.val();
    if (data && data.hasOwnProperty(profile.registrationNumber)) {
      setSaved(true);
    }
      else {
      setSaved(false);
    }
    }).catch((error) => {
    console.log('Failed to fetch data:', error);
    });}
  }, [profile.registrationNumber]);




  // Cards
  const increaseRequests = async (regg) => {
    try {
      await firebase
        .database()
        .ref(`/users/${regg}/requests`)
        .transaction((requests) => String(parseInt(requests) + 1));
      const userKey = `${registrationNumber}${regg}`;
      await firebase
        .database()
        .ref(`/chat/${userKey}`)
        .set({ status: registrationNumber, lastmessage: "" })
      // updateStatus(regg);
      // checkStatus(profileData.registrationNumber);
    } catch (error) {
      console.error('Error increasing requests:', error);
    }
  };

  const decreaseRequests = async (regg) => {
    try {
      await firebase
        .database()
        .ref(`/users/${regg}/requests`)
        .transaction((requests) => String(parseInt(requests) - 1));
      // const userKey = `${registrationNumber}${regg}`;
      // await firebase
      //   .database()
      //   .ref(`/chat/${userKey}`)
      //   .set({ status: registrationNumber });
      // updateStatus(regg);
      // checkStatus(profileData.registrationNumber);
    } catch (error) {
      console.error('Error decreasing requests:', error);
    }
  };

  const checkStatus = async (registrationNumber2) => {
    try {
      const userKey = `${registrationNumber}${registrationNumber2}`;
      const snapshot = await firebase
        .database()
        .ref(`/chat/${userKey}/status`)
        .once('value');
      let status = snapshot.val();
  
      if (status === null) {
        const reversedUserKey = `${registrationNumber2}${registrationNumber}`;
        const reversedSnapshot = await firebase
          .database()
          .ref(`/chat/${reversedUserKey}/status`)
          .once('value');
        status = reversedSnapshot.val();
      }
  
      console.log("Status:", status, registrationNumber, registrationNumber2);
      if (String(status) === registrationNumber) {
        setStatusText('Pending');
      } else if (String(status) === registrationNumber2) {
        setStatusText('Accept');
      }
        else if (String(status) === "7"){
        setStatusText('Chat');
      } else {
        setStatusText('Date');
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };
  
  

  const updateStatus = async (registrationNumber2,item) => {
    if (registrationNumber == "77777777") {
      showToast("You can't Date someone being a Guest");
    } else {
    try {
      const userKey = `${registrationNumber}${registrationNumber2}`;
      const userKey2 = `${registrationNumber2}${registrationNumber}`;
      const snapshot = await firebase
        .database()
        .ref(`/chat/${userKey}/status`)
        .once('value');
      let status = snapshot.val();
  
      if (status === null) {
        const reversedUserKey = `${registrationNumber2}${registrationNumber}`;
        const reversedSnapshot = await firebase
          .database()
          .ref(`/chat/${reversedUserKey}/status`)
          .once('value');
        status = reversedSnapshot.val();
      }
      if (statusText === 'Pending') {
        decreaseRequests(registrationNumber2); // Uncommented this line to decrease requests
        setStatusText('Date');
        // Write the code to delete the userKey in Database
        await firebase.database().ref(`/chat/${userKey}`).remove();
        deleteDataFromNotification(registrationNumber2);
        showToast('Request Cancelled!');
        // Alert.alert('Request canceled');
      } else if (statusText === 'Accept') {
        setStatusText('Chat');
        // Write the code to change the status in the Database chat section to '7'
        await firebase.database().ref(`/chat/${userKey2}`).update({ status: '7',lastmessage:"New Date"});

        addDataToNotification(registrationNumber2,String(registrationNumber));
      } else if (statusText === 'Date') {
        increaseRequests(registrationNumber2);
        addDataToNotification(registrationNumber2,String(registrationNumber));
        showToast('Date Request Sent!');
        setStatusText('Pending');
        // setStatusText('Date');
      } else if (statusText == 'Chat'){
        console.log('gootaa');
        // setStatusText('Chat');
        navigation.navigate('ChatScreen2', {
          currentUserRegistrationNumber: registrationNumber,
          otherUserRegistrationNumber: profile.registrationNumber,
          profile:profile,
        });
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
  }
  };

  const addDataToNotification = async (regg, notify) => {
    try {
      const notificationRef = firebase.database().ref(`/notifications/${regg}`);
      const snapshot = await notificationRef.once('value');
      let data = snapshot.val();

      if (!data) {
        // Section doesn't exist, create new section with the data
        data = [notify];
      } else {
        // Section exists, prepend the new data
        data.unshift(notify);
      }

      await notificationRef.set(data);
      console.log('Data added successfully');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  
  const deleteDataFromNotification = async (regg) => {
    try {
    const notificationRef = firebase.database().ref(`/notifications/${regg}`);
    const snapshot = await notificationRef.once('value');
    let data = snapshot.val();

    if (Array.isArray(data)) {
      data.pop(); // Remove the last item from the array
      await notificationRef.set(data);
      console.log('Data deleted successfully');
    } else {
      console.log('No data exists to delete');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
  };

  function showToast(mssg) {
    ToastAndroid.show(mssg, ToastAndroid.SHORT);
  }

  const toggleSave = (regg) => {
    const saveRef = firebase.database().ref('/save');
    saveRef.child(registrationNumber).once('value').then((snapshot) => {
      console.log('Data snapshot:', snapshot.val());
      const data = snapshot.val();
      if (data) {
        if (data.hasOwnProperty(regg)) {
          // Regg exists, remove it
          saveRef
            .child(`${registrationNumber}/${regg}`)
            .remove()
            .then(() => {
              setSaved(false);
              showToast('UnSaved!');
              console.log('Regg removed');
            })
            .catch((error) => {
              console.log('Failed to remove Regg:', error);
            });
        } else {
          // Regg doesn't exist, add it
          saveRef
            .child(`${userData.registrationNumber}/${regg}`)
            .set('1')
            .then(() => {
              setSaved(true);
              showToast('Saved!');
              console.log('Regg added');
            })
            .catch((error) => {
              console.log('Failed to add Regg:', error);
            });
        }
      } else {
        // Save section not found, create registrationNumber key and add regg:1 inside it
        saveRef
          .child(userData.registrationNumber)
          .child(regg)
          .set('1')
          .then(() => {
            setSaved(true);
            showToast('Saved!');
            console.log('registrationNumber created and regg added');
          })
          .catch((error) => {
            console.log('Failed to create registrationNumber and add regg:', error);
          });
      }
    }).catch((error) => {
      console.log('Failed to fetch data:', error);
    });
  };

  const renderButtons = () => {
    if (userData === null) {
      // Render a loading state or placeholder
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.bottomContainer}>
        {profile.gender === userData.gender ? (
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('ChatScreen2', {
            currentUserRegistrationNumber: registrationNumber,
            otherUserRegistrationNumber: profile.registrationNumber,
            profile:profile,
          })}>
            <LinearGradient
              colors={['#fb3768', '#6600cc']}
              style={styles.gradient}
            >
              <Text style={styles.date}>Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => updateStatus(profile.registrationNumber,profile)}>
            <LinearGradient
              colors={['#fb3768', '#6600cc']}
              style={styles.gradient}
            >
              <Text style={styles.date}>{statusText}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => toggleSave(profile.registrationNumber)}>
          <LinearGradient
            colors={['white', '#b3b3ff']}
            style={styles.bookmarkgradient}
          >
            <TouchableOpacity>
            <Icon name={saved ? 'bookmark' : 'bookmark-o'} size={30} color={'#fb3768'} />
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
        
      </View>
    );
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={37} color="black" />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.container2}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: profile.profilepic }} style={styles.profileImage} />

            </View>
            
            <View style={styles.overlay2}>
              <View style={styles.numbercontainer}>
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{profile.dates}</Text>
                <Text style={styles.numberlabel}>Dates</Text>
              </View>
                <View style={styles.numberseparator} />
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{profile.requests}</Text>
                <Text style={styles.numberlabel}>Requests</Text>
              </View>
                <View style={styles.numberseparator} />
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{profile.likes}</Text>
                <Text style={styles.numberlabel}>Likes</Text>
              </View>
            </View>
            </View>
            <View style={{alignItems:'center'}}>
            <View style={styles.overlay}>
            <View style={styles.starcontainer}>
              <StarRatingBar rating={parseFloat(profile.star)+parseInt(profile.premium)} />
            </View>
            </View>
            </View>
            <LinearGradient
            colors={['#262626','black']}
            // start={{ x: -1, y: 0 }} 
            // end={{ x: 1, y: 0 }} 
            style={styles.bigContainer}
            >
              <View style={{marginBottom: 10 }}>
                <View style={{flexDirection:'row'}}>
              <Text style={styles.profileName}>{profile.name}</Text>
              {profile.premium === "1" && (

              <Image
              source={{
              uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
              }}
              style={{ height: 40, width: 40, marginTop: 15, marginLeft: 5 }}
              />
              )}

              </View>
              <Text style={styles.profileRegg}>{profile.registrationNumber}</Text>
              
              </View>

              <View style={styles.extra}>
                {/* <View> */}
                {profile.college && 
                  <Text style={styles.extracontents}>{profile.college}</Text>
                  } 
                  {profile.section &&
                  <Text style={styles.extracontents}>{profile.section}</Text>
                  }
                  {profile.course &&
                  <Text style={styles.extracontents}>{profile.course}</Text>
                  }
                  {profile.birthday &&
                  <Text style={styles.extracontents}>{profile.birthday}</Text>
                  }
                  
                  
                
              </View>
              <View style={{height: 120, paddingBottom:33}}>
              <Text style={styles.about}>About</Text>
              <Text style={styles.aboutText}>{profile.about}</Text>
              </View>
              
            {renderButtons()}
            </LinearGradient>
            
          </View>
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

        </View>
        <Footer navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  container2: {
    marginTop: -90,
    height: 270,
    width: 370,
    borderRadius: 30,
    // alignContent: 'center',
    // alignItems:'center',
  },
  overlay: {
    position: 'relative',
    left: 0,
    right: 0,
    padding: 10,
    // paddingHorizontal: 10,
    bottom: 37,
    width: '70%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust the opacity as needed
    backdropFilter: 'blur(10px)', // Adjust the blur amount as needed
  },
  overlay2: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 37,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  profileImage: {
    width: '110%',
    height: '114%',
    resizeMode: 'contain',
    borderRadius: 1,
    marginTop: 87,
  },
  starcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5,
    marginTop: 20,
  },
  profileRegg: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    // marginTop: 20,
  },
  registrationNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: 'grey',
  },
  about: {
    fontSize: 16,
    color: 'white',
    // backgroundColor:'pink',
  },
  extra: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  bigContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    marginTop: -27,
    marginLeft: -20,
    marginRight: -20,
    paddingHorizontal: 20,
    height: '150%'
    // paddingVertical: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position:'relative',
    alignItems: 'center',
    alignContent: 'center',

    // widht: '100%',
    justifyContent: 'center',
    // padding: 16,
    // backgroundColor: 'white',
    // bottom: 100,
  },
  date: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    // marginLeft: 16,
    backgroundColor: '#fb3768',
    // paddingHorizontal: 40,
    // paddingVertical: 17,
    borderRadius: 30,
    marginHorizontal: 5,
    height:60,
  },
  numbercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  numbersection: {
    alignItems: 'center',
  },
  numbercount: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android only
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  numberlabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  numberseparator: {
    height: '100%',
    width: 1,
    marginHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 37,
    left: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  extracontents:{
    color:'white',
    paddingHorizontal:20,
    paddingVertical:5,
    backgroundColor:'#fb3768',
    borderRadius: 17,
    marginVertical: 3,
    marginHorizontal: 1,
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    // paddingVertical: 10,
    
  },
  bookmarkgradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 10,
    
  },
  
});

export default OtherProfile;
