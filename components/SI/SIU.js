  import React, { useState, useEffect } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
  import * as SecureStore from 'expo-secure-store';
  import * as Notifications from 'expo-notifications';
  import firebase from '../../firebase';
  import Constants from 'expo-constants';
  // import Toast from 'react-native-toast-message';


  // import { useNavigation } from '@react-navigation/native';'
  

  const Siuu = ({navigation}) => {
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [emergency, setEmergency] = useState('');
    const [version,setVersion] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const appVersion = Constants.manifest.version;
    
    // const navigation = useNavigation();

    useEffect(() => {
      getLoginCredentials();
    }, []);

    const handleSignIn = async (registrationNumber, password) => {
      const userRef = firebase.database().ref(`users/${registrationNumber}`);
      console.log(registrationNumber);
      console.log(appVersion);

      userRef.once('value', async (snapshot) => {
        const userData = snapshot.val();
    
        if (userData && userData.password === password) {
          // Store user data in Secure Store
          // if (registrationNumber !== "77777777") {
            await storeLoginCredentials(registrationNumber, password, userData);
            addTokenToFirebase();
          // }
          await navigation.navigate('HomeScreen', { registrationNumber });
        } else {
          console.log('Incorrect');
        }
      });
    };
    
    const storeLoginCredentials = async (regg, pass, userData) => {
      try {
        await SecureStore.setItemAsync('username', regg);
        await SecureStore.setItemAsync('password', pass);
        await SecureStore.setItemAsync('myGender', userData.gender);
        await SecureStore.setItemAsync('premium', userData.premium);
        console.log(userData.gender);
        console.log('Login credentials and user data stored successfully.');
      } catch (error) {
        console.log('Error storing login credentials and user data:', error);
      }
    };
    
    const getLoginCredentials = async () => {
      try {
        const username = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        const e = (await firebase.database().ref('emergency').once('value')).val();
        const v = (await firebase.database().ref('version').once('value')).val();
        setEmergency(e);
        setVersion(v);
        console.log(e,v);
        // const userData = await SecureStore.getItemAsync('userData');
        setRegistrationNumber(username || '');
        setPassword(password || '');
    
        // if (userData) {
        //   setUserData(JSON.parse(userData));
        // }
      } catch (error) {
        console.log('Error retrieving login credentials and user data:', error);
      }
    };
    

    const handleSignUp = () => {
      navigation.push('Test3');
    };

    const registerForPushNotificationsAsync = async () => {
      try {
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          status = await Notifications.requestPermissionsAsync();
        }
    
        if (status !== 'granted') {
          console.log('Push notification permissions not granted.');
          return null;
        }
    
        const { data: token } = await Notifications.getExpoPushTokenAsync();
        return token;
      } catch (error) {
        console.log('Error getting push notification token:', error);
        return null;
      }
    };
    
  
    const addTokenToFirebase = async () => {
      try {
        let token = await registerForPushNotificationsAsync();
  
        if (token) {
          console.log('Expo Push Token:', token);
  
          // const registrationNumber = '12219984'; // Replace with the registration number you want to use as the key
          const firebaseUrl = `https://thecloud-7-default-rtdb.firebaseio.com/tokens.json`;
          const response = await fetch(firebaseUrl, {
            method: 'PATCH', // Use PATCH to update a specific key in the Firebase object
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [registrationNumber]: token }), // Use object notation to set the token under the specified key
          });
  
          if (response.ok) {
            console.log('Token added to Firebase:', token);
          } else {
            console.log('Failed to add token to Firebase:', response);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    function showToast(mssg) {
      ToastAndroid.show(mssg, ToastAndroid.SHORT);
    }
  
    useEffect(() => {
      const fetchCurrentUser = async () => {
        const user = await registerForPushNotificationsAsync();
        setCurrentUser(user);
      };
      fetchCurrentUser();
    }, []);

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {/* <Image source={require('../../login.png')} style={styles.backgroundImage} /> */}
        <Image source={require('../../logo.png')} style={styles.logo} />
        <Text style={styles.signin}>Sign In</Text>
        <Text style={styles.signintocont}>Sign In to continue</Text>
        <Text style={styles.label}>Registration Number</Text>
        <TextInput
          style={styles.input}
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />


        {(emergency === "0") && (version==appVersion) && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleSignIn(registrationNumber, password)}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: 10 }}>or</Text>
            <TouchableOpacity style={styles.button2} onPress={() => handleSignIn('77777777', 'belikebadal')}>
              <Text style={styles.buttonText2}>Enter as Guest</Text>
            </TouchableOpacity>
          </View>
        )}

        {(emergency == "1") && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => showToast('The App is under Maintenance')}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: 10 }}>or</Text>
            <TouchableOpacity style={styles.button2} onPress={() => showToast('The App is under Maintenance')}>
              <Text style={styles.buttonText2}>Enter as Guest</Text>
            </TouchableOpacity>
          </View>
        )}

        {(version != appVersion) && (
          <View>
            <TouchableOpacity style={styles.button} onPress={() => showToast('Please update the App')}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: 10 }}>or</Text>
            <TouchableOpacity style={styles.button2} onPress={() => showToast('Please update the App')}>
              <Text style={styles.buttonText2}>Enter as Guest</Text>
            </TouchableOpacity>
          </View>
        )}



        <TouchableOpacity style={styles.signupLink}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupLink}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.signupText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}

      </KeyboardAvoidingView>
    );
  };

  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    label: {
      fontSize: 10,
      marginBottom: 8,
      color: 'white',
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
    },
    logo: {
      marginTop: 20,
      position: 'absolute',
      top: 20,
      left: 30,
      width: 140,
      height: 30,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      borderRadius: 10,
      color: 'white',
    },
    signin: {
      marginTop: 100,
      fontSize: 40,
      color: 'white',
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    signintocont: {
      fontSize: 10,
      color: '#fb3768',
      alignSelf: 'center',
      marginBottom: 20,
    },
    button: {
      marginTop: 30,
      backgroundColor: '#fb3768',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 10,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button2: {
      marginTop: 10,
      backgroundColor: 'white',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 10,
      // height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonText2: {
      color: '#fb3768',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signupLink: {
      marginTop: 10,
      alignItems: 'center',
    },
    signupText: {
      color: '#e6e6e6',
      fontSize: 13,
      textDecorationLine: 'underline',
    },
  });

  export default Siuu;
