import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRatingBar = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasDecimal = rating % 1 !== 0;

  const renderStars = (count, color, size) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<Ionicons key={i} name="star" size={size} color={color} />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          {renderStars(filledStars, 'white', 24)}
          {hasDecimal && (
            <Ionicons name="star-half" size={24} color="white" />
          )}
        </Text>
        <Text style={styles.ratingNumber}>{rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fb3768',
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default StarRatingBar;
