import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../firebase'; // Import the firebase object from your firebase.js file

const SignUpScreen = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    if (registrationNumber.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all the fields');
    } else {
      // Save the registration number and password to Firebase
      firebase
        .database()
        .ref('users')
        .push({
          registrationNumber,
          password,
        })
        .then(() => {
          console.log('Successful sign up!', registrationNumber, password);
          // You can proceed with the registration process or navigate to another screen
        })
        .catch(error => {
          console.log('Error saving user data:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
          secureTextEntry
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
    color: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    color: 'white',
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4287f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
