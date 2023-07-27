import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import App from "../components/start/start";

const LetStart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <App />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    flex: 1,
  },
});

export default LetStart;
