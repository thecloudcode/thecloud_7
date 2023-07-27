import React from 'react';
import { View, StyleSheet } from 'react-native';
// import firebase from 'firebase/app';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
// import 'firebase/firestore';
// import firebaseConfig from './firebaseConfig';
import ChatScreen from '../components/home/chatscreen';
import ChatHeader from '../components/chat/ChatHeader';
import ChatScreen2 from '../components/home/chatprac';
// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const Chat = ({navigation}) => {
  return (
    <View style={styles.containerscreens}>
      {/* <ChatHeader /> */}
      <ChatScreen2/>
      {/* <ChatScreen navigation={navigation}/> */}
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerscreens: {
    flex: 1,
    backgroundColor: 'black', // Replace with your desired background color
  },
});

export default Chat;
