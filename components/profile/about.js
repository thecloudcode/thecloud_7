import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PremiumContainer = () => {
  const handleBuyPremium = () => {
    // Handle the buy premium action
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Premium</Text>
      <Text style={styles.featuresText}>Unlock exclusive features:</Text>
      <Text style={styles.featuresText}>- Get immediate one star rating increase</Text>
      <Text style={styles.featuresText}>- 7x Increase in Engagement on Profile</Text>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyPremium}>
        <AntDesign name="star" size={24} color="#fff" style={styles.crownIcon} />
        <Text style={styles.buyButtonText}>Buy Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    width: '70%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  featuresText: {
    fontSize: 10,
    // marginBottom: 5,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fb3768',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  crownIcon: {
    marginRight: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PremiumContainer;
