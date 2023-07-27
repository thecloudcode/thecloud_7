import React from "react";
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
// import Header from "../components/home/Header";
// import Main from "../components/home/Main";
// import Footer from "../components/home/Footer";
import SignUpScreen from "../components/lol";

const Lolscreen=()=>{
    return(
        <SafeAreaView style={styles.container}>
            <SignUpScreen />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex: 1,
    },
})
export default Lolscreen;