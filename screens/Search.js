import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import SearchApp from "../components/search/searchmain";

const SearchMainApp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>
      <SearchApp/>
      <Footer navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    // backgroundColor: "#ffffff", // Update the background color to white
    flex: 1,
  },
  headerContainer: {
    // position: 'absolute',
    zIndex: 50, // Set the desired z-index value to keep it above other elements
  },
});

export default SearchMainApp;
