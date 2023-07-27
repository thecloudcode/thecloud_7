import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Header2 from "../components/home/Header2";
// import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import SwipeableCards from "../components/main/cards";
import Icon from "react-native-vector-icons/FontAwesome";


const MainCards = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header2 navigation={navigation} />
      </View>
      <View style={styles.content}>
        <SwipeableCards />
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    // position: 'absolute',
    zIndex: 50, // Set the desired z-index value to keep it above other elements
  },
  cardsheader: {
    height: 50,
    width:'100%',
    paddingHorizontal: 27,
  }
});

export default MainCards;
