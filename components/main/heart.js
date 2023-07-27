import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default function Heart() {
  const [showHeart, setShowHeart] = useState(false);

  const handlePress = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="heart-outline" size={50} color="red" />
      </TouchableOpacity>

      {showHeart && (
        <Animatable.View
          animation="zoomIn"
          iterationCount={1}
          style={styles.heartContainer}
        >
          <Animatable.Text
            style={styles.heartIcon}
            animation="fadeIn"
            iterationCount="infinite"
            iterationDelay={500}
          >
            <Ionicons name="heart" size={100} color="red" />
          </Animatable.Text>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heartContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  heartIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
});
