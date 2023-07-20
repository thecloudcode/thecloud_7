import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import MainCards from './screens/MainCards'
import SearchMainApp from './screens/Search'
import Notify from './screens/notifications'
// import Profile from './screens/Profile'
import Profile from './screens/Profile'
import OtherProfile from './screens/otherprofile'
import Header from './components/home/Header'
import Footer from './components/home/Footer'
import Siuu from './components/SI/SIU'
import SignUp from './screens/Signin'
import SignUp2 from './screens/Signin2'
import ChatScreen from './components/home/chatscreen'
import ChatScreen2 from './components/home/chatprac'
import Chat from './screens/chat'
import LeaderboardScreen from './components/leaderboard/leaderboard'
import SignUpForm from './components/signin/signin'
import Saved from './screens/Saved'
import Screen1 from './screens/time1'
import About from './screens/About'
import Contact from './screens/Contact Me'
import EmailVerificationScreen from './screens/email verification'
import SuccessScreen from './screens/email success'
import Test3 from './screens/test3'
import Password from './screens/password'

const Stack = createStackNavigator()


const ScreenOptions = {
    headerShown: false
}
const SignedInStack = ({ navigation }) => (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
    <NavigationContainer style={{ flex: 1, backgroundColor: 'black' }}>
        {/* <Header/> */}
        <Stack.Navigator initialRouteName='SignIn' screenOptions={ScreenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen}/>
            <Stack.Screen name='SearchMainApp' component={SearchMainApp}/>
            <Stack.Screen name='MainCards' component={MainCards}/>
            <Stack.Screen name='Notify' component={Notify}/>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='OtherProfile' component={OtherProfile}/>
            <Stack.Screen name='Screen1' component={Screen1}/>
            <Stack.Screen name='SignIn' component={Siuu}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='Edit' component={SignUp2}/>
            <Stack.Screen name='ChatScreen2' component={ChatScreen2}/>
            <Stack.Screen name='Chat' component={Chat}></Stack.Screen>
            <Stack.Screen name='Leaderboard' component={LeaderboardScreen}/>
            <Stack.Screen name='SignUpForm' component={SignUpForm}/>
            <Stack.Screen name='Saved' component={Saved}/>
            <Stack.Screen name='About' component={About}/>
            <Stack.Screen name='Contact' component={Contact}/>
            <Stack.Screen name='EmailVerification' component={EmailVerificationScreen}/>
            <Stack.Screen name='SuccessScreen' component={SuccessScreen}/>
            <Stack.Screen name='Test3' component={Test3}/>
            <Stack.Screen name='Password' component={Password}/>
            
        </Stack.Navigator>
        {/* <Footer navigation={navigation}/> */}
    </NavigationContainer>
    </View>
)


export default SignedInStack