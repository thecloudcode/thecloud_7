import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Header from "../components/home/Header";
import Main from "../components/home/Main";
import Footer from "../components/home/Footer";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>
      <Main />
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  headerContainer: {
    // position: 'absolute',
    zIndex: 50, // Set the desired z-index value to keep it above other elements
  },
});

export default HomeScreen;
