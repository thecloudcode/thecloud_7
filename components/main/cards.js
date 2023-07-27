//   import React, { useEffect, useState } from "react";
//   import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid,Alert } from "react-native";
//   import SwipeCards from "react-native-swipe-cards";
//   import Icon from "react-native-vector-icons/FontAwesome";
  
//   import firebase from "../../firebase";
//   import * as SecureStore from 'expo-secure-store';
//   import * as Animatable from 'react-native-animatable';
//   import { Ionicons } from '@expo/vector-icons';
//   import Toast from 'react-native-toast-message';
//   import { LinearGradient } from 'expo-linear-gradient';

//   import { useNavigation } from '@react-navigation/native';



//   const Card = ({ profileData, onLike}) => {
//     const [RegNo, setRegNo] = useState('');
//     const [myGender, setMyGender] = useState('');
//     const [saved, setSaved] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [statusText, setStatusText] = useState('Date');
//     const navigation=useNavigation();
//     console.log('lolol',profileData.registrationNumber);
//     useEffect(() => {
//       fetchUsername();
//       checkStatus(profileData.registrationNumber);
      
//       const saveRef = firebase.database().ref('/save');
//       if(RegNo){
//       saveRef.child(RegNo).once('value').then((snapshot) => {
//       const data = snapshot.val();
//       if (data && data.hasOwnProperty(profileData.registrationNumber)) {
//         setSaved(true);
//       }
//        else {
//         setSaved(false);
//       }
//       }).catch((error) => {
//       console.log('Failed to fetch data:', error);
//       });}
      
//     }, [profileData.registrationNumber]);

//     const fetchUsername = async () => {
//       try {
//         const storedUsername = await SecureStore.getItemAsync('username');
//         const m= await SecureStore.getItemAsync('myGender');
//         setMyGender(m);
//         console.log("lol",myGender);
//         setRegNo(storedUsername);
//         console.log('Stored username:', RegNo);
//       } catch (error) {
//         console.log('Error fetching username:', error);
//       }
//     };

//     const increaseLikes = async () => {
//       try {
//         await firebase
//           .database()
//           .ref(`/users/${profileData.registrationNumber}/likes`)
//           .transaction((likes) => String(parseInt(likes) + 1));
//       } catch (error) {
//         console.error('Error increasing likes:', error);
//       }
//     };

//     const increaseRequests = async (regg) => {
//       try {
//         await firebase
//           .database()
//           .ref(`/users/${regg}/requests`)
//           .transaction((requests) => String(parseInt(requests) + 1));
//         const userKey = `${RegNo}${regg}`;
//         await firebase
//           .database()
//           .ref(`/chat/${userKey}`)
//           .set({ status: RegNo, lastmessage: "" })
//         // updateStatus(regg);
//         // checkStatus(profileData.registrationNumber);
//       } catch (error) {
//         console.error('Error increasing requests:', error);
//       }
//     };

//     const decreaseRequests = async (regg) => {
//       try {
//         await firebase
//           .database()
//           .ref(`/users/${regg}/requests`)
//           .transaction((requests) => String(parseInt(requests) - 1));
//         // const userKey = `${RegNo}${regg}`;
//         // await firebase
//         //   .database()
//         //   .ref(`/chat/${userKey}`)
//         //   .set({ status: RegNo });
//         // updateStatus(regg);
//         // checkStatus(profileData.registrationNumber);
//       } catch (error) {
//         console.error('Error decreasing requests:', error);
//       }
//     };

    

//     const checkStatus = async (RegNo2) => {
//       try {
//         const userKey = `${RegNo}${RegNo2}`;
//         const snapshot = await firebase
//           .database()
//           .ref(`/chat/${userKey}/status`)
//           .once('value');
//         let status = snapshot.val();
    
//         if (status === null) {
//           const reversedUserKey = `${RegNo2}${RegNo}`;
//           const reversedSnapshot = await firebase
//             .database()
//             .ref(`/chat/${reversedUserKey}/status`)
//             .once('value');
//           status = reversedSnapshot.val();
//         }
    
//         console.log("Status:", status, RegNo, RegNo2);
//         if (String(status) === RegNo) {
//           setStatusText('Pending');
//         } else if (String(status) === RegNo2) {
//           setStatusText('Accept');
//         }
//           else if (String(status) === "7"){
//           setStatusText('Chat');
//         } else {
//           setStatusText('Date');
//         }
//       } catch (error) {
//         console.error('Error checking status:', error);
//       }
//     };
    
    

//     const updateStatus = async (RegNo2,item) => {
//       if (RegNo == "77777777") {
//         showToast("You can't Date someone being a Guest");
//       } else {
//       try {
//         const userKey = `${RegNo}${RegNo2}`;
//         const userKey2 = `${RegNo2}${RegNo}`;
//         const snapshot = await firebase
//           .database()
//           .ref(`/chat/${userKey}/status`)
//           .once('value');
//         let status = snapshot.val();
    
//         if (status === null) {
//           const reversedUserKey = `${RegNo2}${RegNo}`;
//           const reversedSnapshot = await firebase
//             .database()
//             .ref(`/chat/${reversedUserKey}/status`)
//             .once('value');
//           status = reversedSnapshot.val();
//         }
//         if (statusText === 'Pending') {
//           decreaseRequests(RegNo2); // Uncommented this line to decrease requests
//           setStatusText('Date');
//           // Write the code to delete the userKey in Database
//           await firebase.database().ref(`/chat/${userKey}`).remove();
//           deleteDataFromNotification(RegNo2);
//           showToast('Request Cancelled!');
//           // Alert.alert('Request canceled');
//         } else if (statusText === 'Accept') {
//           setStatusText('Chat');
//           // Write the code to change the status in the Database chat section to '7'
//           await firebase.database().ref(`/chat/${userKey2}`).update({ status: '7',lastmessage:"New Date"});

//           addDataToNotification(RegNo2,String(RegNo));
//         } else if (statusText === 'Date') {
//           increaseRequests(RegNo2);
//           addDataToNotification(RegNo2,String(RegNo));
//           showToast('Date Request Sent!');
//           setStatusText('Pending');
//           // setStatusText('Date');
//         } else if (statusText == 'Chat'){
//           // setStatusText('Chat');
//           navigation.navigate('ChatScreen2', {
//             currentUserRegistrationNumber: RegNo,
//             otherUserRegistrationNumber: RegNo2,
//             profile:item,
//           });
//         }
//       } catch (error) {
//         console.error('Error checking status:', error);
//       }
//     }
//     };

//     const addDataToNotification = async (regg, notify) => {
//       try {
//         const notificationRef = firebase.database().ref(`/notifications/${regg}`);
//         const snapshot = await notificationRef.once('value');
//         let data = snapshot.val();

//         if (!data) {
//           // Section doesn't exist, create new section with the data
//           data = [notify];
//         } else {
//           // Section exists, prepend the new data
//           data.unshift(notify);
//         }

//         await notificationRef.set(data);
//         console.log('Data added successfully');
//       } catch (error) {
//         console.error('Error adding data:', error);
//       }
//     };
    
//     const deleteDataFromNotification = async (regg) => {
//       try {
//       const notificationRef = firebase.database().ref(`/notifications/${regg}`);
//       const snapshot = await notificationRef.once('value');
//       let data = snapshot.val();

//       if (Array.isArray(data)) {
//         data.pop(); // Remove the last item from the array
//         await notificationRef.set(data);
//         console.log('Data deleted successfully');
//       } else {
//         console.log('No data exists to delete');
//       }
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//     };

//     const toggleSave = (regg) => {
//       const saveRef = firebase.database().ref('/save');
//       saveRef.child(RegNo).once('value').then((snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           if (data.hasOwnProperty(regg)) {
//             // Regg exists, remove it
//             saveRef
//               .child(`${RegNo}/${regg}`)
//               .remove()
//               .then(() => {
//                 setSaved(false);
//                 showToast('UnSaved!');
//                 console.log('Regg removed');
//               })
//               .catch((error) => {
//                 console.log('Failed to remove Regg:', error);
//               });
//           } else {
//             // Regg doesn't exist, add it
//             saveRef
//               .child(`${RegNo}/${regg}`)
//               .set('1')
//               .then(() => {
//                 setSaved(true);
//                 showToast('Saved!');
//                 console.log('Regg added');
//               })
//               .catch((error) => {
//                 console.log('Failed to add Regg:', error);
//               });
//           }
//         } else {
//           // Save section not found, create RegNo key and add regg:1 inside it
//           saveRef
//             .child(RegNo)
//             .child(regg)
//             .set('1')
//             .then(() => {
//               setSaved(true);
//               showToast('Saved!');
//               console.log('RegNo created and regg added');
//             })
//             .catch((error) => {
//               console.log('Failed to create RegNo and add regg:', error);
//             });
//         }
//       }).catch((error) => {
//         console.log('Failed to fetch data:', error);
//       });
//     };
    
  
//     function showToast(mssg) {
//       ToastAndroid.show(mssg, ToastAndroid.SHORT);
//     }


//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: profileData.profilepic }} style={styles.image} />
//         {/* <Text style={styles.text}>RegNo</Text> */}
        
//         <LinearGradient
//         colors={['rgba(255,255,255,0)','black']}
//         style={styles.overlay}
//         >
//         {/* <View style={styles.overlay}> */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//         <Text style={styles.profileName}>{profileData.name}</Text>
//         {profileData.premium === "1" && (
//         <Image
//         source={{
//         uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
//         }}
//         style={{ height: 40, width: 40, marginTop: 10, marginLeft: 5 }}
//         />
//         )}
//         </View>
//           <Text style={styles.registrationNumber}>
//             {profileData.registrationNumber}
//           </Text>
//         {/* </View> */}
//         </LinearGradient>
//         {/* <TouchableOpacity style={styles.crossButton}>
//           <Icon name="times" size={24} color="#fff" />
//         </TouchableOpacity> */}
//         <TouchableOpacity style={styles.dateButton} onPress={() => updateStatus(profileData.registrationNumber,profileData)}>
//           <Text style={styles.buttonText}>{statusText}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => toggleSave(profileData.registrationNumber)} style={styles.dateButton2}>
//         <Icon name={saved ? 'bookmark' : 'bookmark-o'} size={30} color={'#fb3768'} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.dateButton3} onPress={()=>navigation.navigate('OtherProfile',{profile:profileData})}>
//         <Icon name={"user"} size={30} color={'#fb3768'} />
//         </TouchableOpacity>
//         {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        
//         {/* <TouchableOpacity style={styles.loveButton} onPress={increaseLikes}>
//           <Icon name="heart" size={24} color="#fff" />
//         </TouchableOpacity> */}
//       </View>
//     );
//   };




// const NoMoreCards = () => (
//   <View style={styles.noMoreCards}>
//     <Text style={{color:'rgba(255,255,255,0.3)', fontSize: 700,bottom:100}}>No more</Text>
//   </View>
// );

// const SwipeableCards = () => {
//   const [data, setData] = useState([]);
//   const [randomProfiles, setRandomProfiles] = useState([]);
//   const [showHeart, setShowHeart] = useState(false);
//   const navigation=useNavigation();
//   let c=1;
//   const keyExtractor = (cardData) => cardData.registrationNumber;


//   const handlePress = () => {
//     setShowHeart(true);
//     setTimeout(() => setShowHeart(false), 2000);
//   };

//   const fetchData = async () => {
//     try {
//       const databaseURL = "https://thecloud-7-default-rtdb.firebaseio.com/";
//       const snapshot = await firebase
//         .database()
//         .refFromURL(`${databaseURL}/users`)
//         .once("value");
//       const dataFromFirebase = snapshot.val();
//       const m = await SecureStore.getItemAsync('myGender');
//       console.log("my very best", m);
//       const dataArray = Object.values(dataFromFirebase).filter(item => item.gender !== m);
//       setData(dataArray || []);
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data.length > 0) {
//       const shuffledData = shuffleArray(data);
//       const randomProfiles = shuffledData.slice(0, 5);
//       setRandomProfiles(randomProfiles);
//     }
//   }, [data]);

//   const shuffleArray = (array) => {
//     const shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [
//         shuffledArray[j],
//         shuffledArray[i],
//       ];
//     }
//     return shuffledArray;
//   };

//   const handleYup = (card) => {
//     // console.log("Yup", card);
//     increaseLikes(card.registrationNumber);
//     handlePress();
//     // Handle when the card is swiped right (liked)
//   };

//   const handleNope = (card) => {
//     // console.log("Nope", card);
//     // Handle when the card is swiped left (not liked)
//   };

//   const increaseLikes = async (userKey) => {
//     try {
//       await firebase
//         .database()
//         .ref(`/users/${userKey}/likes`)
//         .transaction((likes) => String(parseInt(likes) + 1));
//     } catch (error) {
//       console.error('Error increasing likes:', error);
//     }
//   };
//   try{
//   return (<View>
//     {/* <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 300,left: 170}} onPress={navigation.navigate('HomeScreen')}>
//       <Text style={{color: 'rgba(255,255,255,0.1)', fontSize: 17, zIndex:0}}>Refresh</Text>
//       <Icon name="refresh" size={17} color={'rgba(255,255,255,0.1)'} />
//     </TouchableOpacity> */}
    
//     <SwipeCards
//   // keyExtractor={(cardData) => cardData.registrationNumber} 

//   cards={randomProfiles}
//   renderCard={(cardData, index) => (
//     <Card key={cardData.registrationNumber} profileData={cardData} onLike={() => handleYup(cardData)} />
//   )}
//   // key={randomProfiles.map((cardData) => cardData.registrationNumber).join(',')}
//   renderNoMoreCards={() => <NoMoreCards />}
//   handleYup={handleYup}
//   handleNope={handleNope}
//   stack={true}
//   stackDepth={2}
//   useNativeDriver={true}
//   animatedEventOptions={{}}
// />
//     {showHeart && (
//         <Animatable.View
//           animation="zoomIn"
//           iterationCount={1}
//           style={styles.heartContainer}
//         >
//           <Animatable.Text
//             style={styles.heartIcon}
//             animation="fadeIn"
//             iterationCount="infinite"
//             iterationDelay={500}
//           >
//             <Ionicons name="heart" size={170} color="white" />
//           </Animatable.Text>
//         </Animatable.View>
//       )}
//     </View>
//   );
//     }catch(error){
//       console.error('bohot koshish kiya thik nhi hua: ', error);
//       return null;
//     }
// };

// const styles = StyleSheet.create({
//   card: {
//     marginTop: 17,
//     // marginBottom: 60,
//     flex: 1,
//     // position: 'relative',
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "grey",
//     borderRadius: 30,
//     // borderWidth: 1,
//     // borderColor: "#262626",
//     height: 620,
//     zIndex: 1,
//     // top:
//   },
//   crossButton: {
//     position: "absolute",
//     top: 10,
//     left: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dateButton: {
//     position: "absolute",
//     bottom: -30,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fb3768",
//     paddingVertical: 20,
//     // paddingHorizontal: 40,
//     width: 130,
//     borderRadius: 40,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   dateButton2: {
//     position: "absolute",
//     bottom: -30,
//     left: 30,
//     width: 70,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderRadius: 40,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     // zIndex: 999,
//   },
//   dateButton3: {
//     position: "absolute",
//     bottom: -30,
//     left: 248,
//     width: 70,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderRadius: 40,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   loveButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 348,
//     height: 617,
//     borderRadius: 30,
//   },
//   overlay: {
//     position: "absolute",
//     top: 470,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//     borderRadius: 30,
//     // paddingTop: 20,
//     borderTopLeftRadius: 0,
//     borderTopRightRadius: 0,
//     // backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   profileName: {
//     paddingLeft: 17,
//     paddingTop: 10,
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 5,
//   },
//   registrationNumber: {
//     paddingLeft: 17,
//     fontSize: 16,
//     color: "white",
//   },
//   name: {
//     paddingLeft: 27,
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   noMoreCards: {
//     flex: 1,
//     width: 70,
//     justifyContent: "center",
//     alignItems: "center",
//     color: 'white',
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "blue",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   text:{
//     color:'white',
//     fontSize: 17,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   heartContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 200,
//     height: 200,
//     left: 110,
//     top: 220,
//     backgroundColor: 'transparent',
//     // zIndex: 10,
//   },
//   heartIcon: {
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 200,
//     height: 200,
//     backgroundColor: 'transparent',
//     // zIndex: 12,
//   },
// });

// export default SwipeableCards;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoveMyMomScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>I love my mom</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#fff', // Set background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LoveMyMomScreen;
