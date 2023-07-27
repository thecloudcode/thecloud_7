import React from "react";
import { View, Text, SafeAreaView, StyleSheet,  TouchableOpacity} from 'react-native';
import Header from "../components/signin/Header";
// import SignInScreen from "../components/signin/signin";
// import SignUpScreen2 from "../components/signin/signin";
// import SignUpForm from "../components/signin/signin2";
import SignUpForm from "../components/signin/signin2";
import { Ionicons } from '@expo/vector-icons';
// import firebase from "../firebase";

const SignUp2 = ({navigation}) => {
  return (
    
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={37} color="white" />
        </TouchableOpacity>
      <SignUpForm navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    // backgroundColor: "#ffffff", // Update the background color to white
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 77,
    left: 27,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default SignUp2;
