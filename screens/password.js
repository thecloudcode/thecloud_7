import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firebase from '../firebase';
import { useRoute, useNavigation } from '@react-navigation/native';

const Password = () => {
  const route = useRoute();
  const navigation = useNavigation();


  const { RegNo } = route.params;
  console.log(RegNo);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (password === confirmPassword) {
      firebase.database().ref(`users/${RegNo}`).update({ password })
        .then(() => {
          console.log('Password updated successfully.');
          navigation.navigate('SignIn');
        })
        .catch((error) => {
          console.log('Error updating password:', error);
        });
    } else {
      console.log('Password and Confirm Password do not match.');
    }
  };

  return (
    <View style={styles.container}>
    <View style={{marginTop: 300, width: '90%'}}>
    <Image
          style={styles.logo}
          source={require('../logo.png')}
        />
      <Text style={styles.label}>Enter Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

          <TouchableOpacity style={styles.button}onPress={handleSave}>
          <Text style={{color:'white',fontWeight: 'bold'}}>SAVE</Text>
          </TouchableOpacity>
      {/* <Button title="Save" onPress={handleSave} /> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    
  },
  input:{
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    padding:7,
    color: 'white',
    marginBottom : 7,
    // width: '100%',
  },
  label:{
    color: 'white',
    fontSize: 11,
    paddingLeft: 4,
  },
  logo: {
    top: 17,
    width: '40%', 
    height: 37,
    alignSelf: 'center',
    marginTop: 20,
    marginTop: -70,
    marginBottom: 70,
  },
  button:{
    padding:12,
    backgroundColor: '#fb3768',
    marginBottom : 7,
    borderRadius: 10,
    alignItems: 'center',
  },
})

export default Password;
