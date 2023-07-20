import React from 'react';import { StyleSheet, SafeAreaView } from 'react-native';
// import Lolscreen from './screens/lol';
// import HomeScreen from './screens/HomeScreen';
// import SignedInStack from './navigation';
// import Back from './screens/back';
// import Picker from './screens/pick';
// import SignUp from './screens/Signin';
// import OtherProfile from './screens/otherprofile';
// import Checkbutton from './screens/check2';
import Chat from './screens/chat';
import UserProfileScreen from './screens/check3';
// import ChatScreen from './components/home/chatscreen';
import Siuu from './components/SI/SIU';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import Buttonlol from './screens/button';
import Leaderboard from './components/leaderboard/leaderboard';
import Profile from './screens/Profile';
import ChatScreen2 from './components/home/chatprac';
import Menu from './screens/menu';
import Save from './screens/save';
// import SignUp2 from './screens/Signin2';
import SignUp2 from './screens/Signin2';
import Screen1 from './screens/time1';
// import Starratingcal from './screens/time2';
import Starratingcal from './screens/time2';
// import Heart from './components/main/heart';
import Timestamp from './screens/timestamp';
import Next from './screens/next';
import Verify_final from './screens/everifyfinal';
import Registration from './screens/emaile';
import Test from './screens/test';
import Test2 from './screens/test2';
import Test3 from './screens/test3';
import GradientScreen from './screens/gradient';
import MyComponent from './screens/newmessage';
import Password from './screens/password';
// import Pay from './screens/Payment';
import Pushnotes from './screens/pushnotes';
import SignedInStack from './navigation';
import App7 from './screens/addtokentofb';
import App77 from './screens/checkk';
export default function App() {
  // return <OtherProfile />;
  
  return( 
    <SafeAreaView style={styles.container}>
    <SignedInStack />
  </SafeAreaView>);
  // <Pushnotes mssg='Welcome your CEO!'/>);
  // <Registration/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the container takes the full available space
    backgroundColor: 'black', // Set your desired background color here
  },
});
