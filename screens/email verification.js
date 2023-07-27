import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Button, Alert, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import firebase from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [done, setDone] = useState(false);
  const isFocused = useIsFocused();

  const handleVerifyEmail = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      await user.sendEmailVerification();
      console.log('Email sent successfully');
      Alert.alert('Verification Email Sent', 'Please check your email inbox to verify your email address.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        const methods = await firebase.auth().fetchSignInMethodsForEmail(email);
        if (methods && methods.length > 0) {
          Alert.alert('Error', 'This email address is already registered. Please log in instead.');
          return;
        }
      }
      Alert.alert('Error', 'Failed to send verification email.');
    }
  };

  const handleContinue = async () => {
    const user = firebase.auth().currentUser;
    if (user && user.emailVerified) {
      navigation.push('SignUp');
    } else {
      Alert.alert('Email Not Verified', 'Please verify your email before continuing.');
    }
  };

  const checkEmailVerification = useCallback(() => {
    const user = firebase.auth().currentUser;
    if (user && user.emailVerified) {
      setIsEmailVerified(true);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    checkEmailVerification();
  }, [checkEmailVerification]);

  useEffect(() => {
    if (isFocused) {
      checkEmailVerification();
    }
  }, [isFocused, checkEmailVerification]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={37} color="white" />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require('../logo.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your college Email ID"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        onBlur={checkEmailVerification}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isEmailVerified ? '#2ecc71' : '#fb3768' }]}
        onPress={handleVerifyEmail}
        disabled={!email || !password || isEmailVerified}
      >
        <Text style={styles.buttonText}>
          {isEmailVerified ? 'Email Verified' : 'Verify'}
        </Text>
      </TouchableOpacity>
      {done && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 70,
    height: 27,
    width: '40%',
  },
  input: {
    width: '80%',
    height: 50,
    color: 'white',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#fb3768',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  backButton: {
    position: 'absolute',
    top: 37,
    left: 37,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
});
