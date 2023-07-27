import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function fire() {
  const animationRef = useRef(null);

  useEffect(() => {
    animateIcon();
  }, []);

  const animateIcon = () => {
    animationRef.current.bounceIn(2000)
      .then(() => animationRef.current.pulse(2000))
      .then(() => animateIcon());
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        ref={animationRef}
        style={styles.iconContainer}
        animation="fadeIn"
        duration={2000}
        iterationCount="infinite"
      >
        <MaterialCommunityIcons name="fire" size={100} color="red" />

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
