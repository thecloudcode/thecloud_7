import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['black', 'black', 'purple', '#fb3768']}
        style={styles.gradient}
      >
        {/* Your content goes here */}
      </LinearGradient>
      <View style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginTop: -100, // Half of the height to center the box vertically
    marginLeft: -100, // Half of the width to center the box horizontally
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust the opacity as needed
    backdropFilter: 'blur(4px)', // Adjust the blur amount as needed
  },
});

export default GradientScreen;
