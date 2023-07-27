import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../../firebase';
import * as SecureStore from 'expo-secure-store';
// import { useNavigation} from '@react-navigation/native';


const SignUpForm = ({navigation}) => {
  const [college, setCollege] = useState('');
  const [section, setSection] = useState('');
  const [course,setCourse] = useState('');
  const [birthday, setBirthday] = useState('');
  const [about, setAbout] = useState('');
//   const navigation = useNavigation();
  const [registrationNumber, setRegistrationNumber]= useState('');
  

  useEffect(() => {
    fetchUsername();
  }, []);


  const fetchUsername = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
    //   const m= await SecureStore.getItemAsync('username');
    //   setMyGender(m);
    //   console.log("lol",myGender);
      setRegistrationNumber(storedUsername);
      console.log('Stored username:', storedUsername);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const onSignUp2 = () => {
      const userRef = firebase.database().ref('users').child(registrationNumber);

      userRef.once('value', snapshot => {
        if (snapshot.exists()) {
          userRef
            .update({
              college,
              section,
              course,
              birthday,
              about,
            })
            .then(() => {
              console.log('Successful update!');
            })
            .catch(error => {
              console.log('Error updating user data:', error);
            });
        } else {
          userRef
            .set({
                college,
                section,
                course,
                birthday,
                about,
            })
            .then(() => {
              console.log('Successful sign up!');
            })
            .catch(error => {
              console.log('Error saving user data:', error);
            });
        }
      });
    }

  return (
    <View style={styles.container}>
      <Image source={require('../../logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>College</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your College Name"
          onChangeText={text => setCollege(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Section</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={text => setSection(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Course</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          onChangeText={text => setCourse(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your section"
          onChangeText={text => setBirthday(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About</Text>
        <TextInput
          style={styles.input
        }
          onChangeText={text => setAbout(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSignUp2}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderOptionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    marginTop: 20,
    position: 'absolute',
    top: 20,
    left: 30,
    width: 140,
    height: 30,
  },
  inputContainer: {
    top: 70,
    width: '80%',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 10,
    marginBottom: 5,
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    // marginBottom: 3,
  },
  genderInput: {
    width: '47%',
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  genderButton: {
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  genderButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    top: 150,
    backgroundColor: '#fb3768',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    height: 50,
    width: '80%',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedGenderInput: {
    backgroundColor: 'pink',
  },
  selectedGenderText: {
    color: 'white',
  },
  genderinput:{
    // padding: 20,
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 10,
  }
});

export default SignUpForm;
