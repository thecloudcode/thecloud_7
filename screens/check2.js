import React from 'react';
import { View } from 'react-native';
import RandomUserButton from '../components/signin/check';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Header/>
    <RandomUserButton />
    <Footer/>
  </View>
);

export default App;
