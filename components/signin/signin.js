import React, { useState } from 'react';
import { View, Image, Text, TextInput,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../../firebase';

const SignUpForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [profilepic, setprofilepic] = useState('');
  const [section, setsection] = useState('');
  const [gender, setgender] = useState('');

  const [selectedGender, setSelectedGender] = useState('');

  const onSignUp2 = () => {
    if (registrationNumber.trim() === '' || password.trim() === '' || name.trim() === '') {
      Alert.alert('Error', 'Please fill in all the fields');
    } else if (confirmPassword !== password) {
      Alert.alert('Error', 'Wrong Confirmation Password');
    } else {
      const userRef = firebase.database().ref('users').child(registrationNumber);

      userRef.once('value', snapshot => {
        if (snapshot.exists()) {
          userRef
            .update({
              name,
              password,
              section,
              gender,
            })
            .then(() => {
              console.log('Successful update!', name, registrationNumber, password);
            })
            .catch(error => {
              console.log('Error updating user data:', error);
            });
        } else {
          userRef
            .set({
              name,
              registrationNumber,
              password,
              // profilepic,
              section,
              gender,
            })
            .then(() => {
              console.log('Successful sign up!', name, registrationNumber, password);
            })
            .catch(error => {
              console.log('Error saving user data:', error);
            });
        }
      });
    }
  };

  const selectGender = selectedGender => {
    setgender(selectedGender);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Registration Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your registration number"
          onChangeText={text => setRegistrationNumber(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Re-enter your password"
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Section</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your section"
          onChangeText={text => setsection(text)}
        />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Gender</Text>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          style={[
            styles.genderinput,
            gender === 'M' ? { backgroundColor: '#fb3768' } : { backgroundColor: 'white' },
          ]}
          onPress={() => selectGender('M')}
        >
          <Text style={styles.genderOptionText}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderinput,
            gender === 'F' ? { backgroundColor: '#fb3768' } : { backgroundColor: 'white' },
          ]}
          onPress={() => selectGender('F')}
        >
          <Text style={styles.genderOptionText}>F</Text>
        </TouchableOpacity>
      </View>
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
