import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Numbers = ({ datesCount = 0, requestsCount = 0, likesCount = 0 }) => {
  return (
    <View style={styles.numbercontainer}>
      <View style={styles.numbersection}>
        <Text style={styles.numbercount}>{datesCount}</Text>
        <Text style={styles.numberlabel}>Dates</Text>
      </View>
      <View style={styles.numberseparator} />
      <View style={styles.numbersection}>
        <Text style={styles.numbercount}>{requestsCount}</Text>
        <Text style={styles.numberlabel}>Requests</Text>
      </View>
      <View style={styles.numberseparator} />
      <View style={styles.numbersection}>
        <Text style={styles.numbercount}>{likesCount}</Text>
        <Text style={styles.numberlabel}>Likes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numbercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  numbersection: {
    alignItems: 'center',
  },
  numbercount: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // For Android only
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  numberlabel: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  numberseparator: {
    height: '100%',
    width: 1,
    marginHorizontal: 20,
  },
});

export default Numbers;