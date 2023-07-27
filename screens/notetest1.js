import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect} from 'react';

export default function App() {

    const requestUserPermission = async ()=>{
        const authStatus =await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if(enabled){
            console.log('Authorization Status', authStatus);
        }
    }

    useEffect(()=> {
        if(requestUserPermission()){
            messaging().getToken().then(toke=> {
                console.log(token);
            });
        }
        else{
            console.log("Failed token",authstatus);
        }

        messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
            if(remoteMessage){
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

        messaging().onNotificationOpenedApp(async(remoteMessage) => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
            
        });

        messaging().setBackgroundMessageHandler(async remoteMessage =>{
            console.log("Message handled in background!",remoteMessage);
        });
        
        const unsubscribe = messaging().onMessage(async remoteMessage =>{
            Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
        });

        return unsubscribe;

    },[])
    return (
        <View style={stlyes.container}>
            <Text>Op</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'black',
        alignItem:'center',
        justifyContent: 'center'
    },


});