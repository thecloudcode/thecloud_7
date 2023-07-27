import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, ToastAndroid } from 'react-native';
// import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
// import Toast from 'react-native-toast-message';
// import ProfilePic from "../components/profile/ProfilePic";
import * as SecureStore from 'expo-secure-store';
import firebase from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";
// import { useNavigation } from '@react-navigation/native';



import { AntDesign } from '@expo/vector-icons';

// import Numbers from "../components/profile/numbers";
import StarRatingBar from "../components/profile/star";


const Profile = ({navigation}) => {
  const [RegNo, setRegNo] = useState('');
  const [userData, setUserData] = useState(null);
  // const p =SecureStore.getItemAsync('premium');

  // const navigation=useNavigation();


  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (userData) {
      calculateStarRating();
    }
  }, [userData]);

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

  // if (!userData) {
  //   // Render a loading state or placeholder if userData is null
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   calculateStarRating();
  // }, []);

  const calculateStarRating = () => {
    const dates = parseInt(userData.dates);
    const requests = parseInt(userData.requests);
    const likes = parseInt(userData.likes);

    const r = dates + requests + likes;
    
    const rating = parseFloat((1 + Math.pow(Math.log(r + 1) / Math.log(100), 2.4)).toFixed(1));
    console.log(r, rating);

    // Limit the rating to a minimum of 7
    const finalRating = Math.min(7, rating);

    // Update the star rating in the Firebase Realtime Database
    const starRef = firebase.database().ref(`users/${RegNo}/star`);
    starRef
      .set(String(finalRating))
      .then(() => console.log('Star rating updated successfully.'))
      .catch((error) => console.error('Error updating star rating:', error));
  };

  function showToast(mssg) {
    ToastAndroid.show(mssg, ToastAndroid.SHORT);
  }
  
    const editbuttonpress = () =>{
      if(RegNo == "77777777"){
        showToast("You cannot edit Guest Profile");
      }else{
        navigation.navigate('Edit');
      }
    }

  if (!userData) {
    // Render a loading state or placeholder if userData is null
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.container2}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: userData.profilepic }} style={styles.profileImage} />
            </View>
            <View style={styles.overlay2}>
              <View style={styles.numbercontainer}>
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{userData.dates}</Text>
                <Text style={styles.numberlabel}>Dates</Text>
              </View>
                <View style={styles.numberseparator} />
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{userData.requests}</Text>
                <Text style={styles.numberlabel}>Requests</Text>
              </View>
                <View style={styles.numberseparator} />
                <View style={styles.numbersection}>
                <Text style={styles.numbercount}>{userData.likes}</Text>
                <Text style={styles.numberlabel}>Likes</Text>
              </View>
            </View>
            </View>
            <View style={{width: '100%', alignItems:'center', zIndex: 10}}>
            <View style={styles.overlay}>
              {/* <Star /> */}
              <View style={styles.starcontainer}>
      <StarRatingBar rating={parseInt(userData.star)+parseInt(userData.premium)} />
    </View>
    </View>
            </View>
            <LinearGradient
              colors={['rgba(0,0,0,0)','rgba(0,0,0,0.5)','black']}
              style={styles.gradient}
            >
            </LinearGradient>

            <View style={styles.bigcontainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.profileName}>{userData.name}</Text>
              {userData.premium === "1" && (
              <Image
              source={{
              uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
              }}
              style={{ height: 40, width: 40, marginTop: 10, marginLeft: 5 }}
              />
              )}
              </View>

              <View style={styles.extra}>
                {/* <View> */}
                  {userData.college && 
                  <Text style={styles.extracontents}>{userData.college}</Text>
                  } 
                  {userData.section &&
                  <Text style={styles.extracontents}>{userData.section}</Text>
                  }
                  {userData.course &&
                  <Text style={styles.extracontents}>{userData.course}</Text>
                  }
                  {userData.birthday &&
                  <Text style={styles.extracontents}>{userData.birthday}</Text>
                  }

                  
                  
                
              </View>
              <View style={{height: 120, paddingBottom:33}}>
              <Text style={styles.about}>About</Text>
              <Text style={styles.aboutText}>{userData.about}</Text>

              </View>
              <TouchableOpacity onPress={() => editbuttonpress()} style={{justifyContent: 'flex-end',alignItems: 'flex-end',zIndex: 999, bottom: 50}} >
              <Icon name="pencil" size={30} color="white" style={{backgroundColor:'#fb3768',width:65, padding:17, paddingHorizontal: 20, borderRadius: 35}}/>
              </TouchableOpacity>

              {userData.premium=="0" && (<TouchableOpacity>
              <LinearGradient
               colors={['#fb3768', '#6600cc']}
              style={{width: '100%',height: 80, backgroundColor: 'white', bottom: 30, borderRadius: 80, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}
               >
                <View style={{alignItems: 'center', justifyContent:'center', width: '70%'}}>
                  <Text style={{color:'white', fontWeight: 'bold', fontSize: 17}}>Buy Premium</Text>
                  <Text style={{color:'white', fontSize: 9}}>1 Star Increase, 7X Engagement, Get Verified</Text>
                </View>
                <Image
              source={{
              uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
              }}
              style={{ height: 60, width: 60}}
              />
               </LinearGradient>
              </TouchableOpacity>)}
            </View>
          </View>
        </View>
        {/* <Footer navigation={navigation} /> */}
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

      </View>

    </ScrollView>
  );
};

const FinalProfile=({navigation}) => {
  return (
    <SafeAreaView style={styles.finalcontainer}>
      {/* <Header/> */}
      <Profile navigation={navigation}/>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  finalcontainer: {
    backgroundColor: 'black',
    // backgroundColor: "#ffffff", // Update the background color to white
    flex: 1,
  },
  
  container: {
    backgroundColor: 'black',
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
    // alignItems:'center',
    marginTop: -100,
    height: 270,
    width: '100%',
    borderRadius: 30,
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
    backdropFilter: 'blur(10px)',
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
    zIndex: 10,
  },
  profileImage: {
    width: '110%',
    height: '110%',
    resizeMode: 'contain',
    borderRadius: 1,
    marginTop: 97,
  },
  starcontainer: {

    // backgroundColor: 'black',
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
    marginBottom: 5,
    marginTop: 20,
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
  },

  separator: {
    height: '100%',
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  bigcontainer:{
    // backgroundColor: '#1a1a1a',
    // paddingTop: 100,
    paddingHorizontal: 20,
    bottom:230,
    // marginLeft: 7,
  },
  gradient:{
    // backgroundColor: '#1a1a1a',
    height: 200,
    bottom:180,
    // marginLeft: 7,
  },
  bottomContainer: {
    flexDirection: 'row',
    position:'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000',
  },
  date: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    marginLeft: 16,
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
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 20,
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
  extra: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
});

export default FinalProfile;
