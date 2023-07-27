import React from 'react';
import { View, StyleSheet } from 'react-native';

const StarRatingBar = ({ rating = 1 }) => {
  const filledWidth = (rating / 7) * 100 || 14.28;

  return (
    <View style={styles.container}>
      <View style={[styles.emptyBar, styles.bar]} />
      <View style={[styles.filledBar, styles.bar, { width: `${filledWidth}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
  emptyBar: {
    flex: 1,
    backgroundColor: 'white',
  },
  filledBar: {
    backgroundColor: 'pink',
  },
});

export default StarRatingBar;
