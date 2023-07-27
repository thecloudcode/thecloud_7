import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { Ionicons } from '@expo/vector-icons';

function cool(){
    const [initializing, setInitializing]=useState(true);
    const [user,setUser] = useState();

    function onAuthStateChanged(user){
        setUser(user);
        if(initializing) setInitializing(false);

    }

    useEffect(()=>{
        const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if(initializing) return null;

    if(!user){
        console.log('No Success!');
    }else{
        console.log('Success!');
    }
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      
      if (user.emailVerified) {
        navigation.push('Home');
      } else {
        Alert.alert('Email Not Verified', 'Please verify your email before logging in.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log in. Please check your email and password.');
    }
  };

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
        placeholder="Enter your email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={!email || !password}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
