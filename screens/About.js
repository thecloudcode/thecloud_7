import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={37} color="white" />
        </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../logo.png')}
        />
      </TouchableOpacity>
    <View style={styles.textcontainer}>
      <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 10}}>
      <Image source={{ uri: 'https://pbs.twimg.com/profile_images/1676268717574090752/mUX8DnZH_400x400.jpg' }} style={styles.mprofileImage} />
      <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 10}}>Badal Prasad Singh</Text>
      </View>
        <Text style={styles.text}>thecloud is a college Dating App, created by a first year undergrad, during summer vaccations in heck of being bored.</Text>
    </View>
    <View style={styles.textcontainer}>
        <Text style={styles.heading}>VERIFIED ACCOUNTS</Text>
        <Text style={styles.text}>User safety and authenticity has been thoroughly verified by utilization various verification methods including email authentication and identity verification services, to confirm the legitimacy of our users.</Text>
    </View>
    <View style={styles.textcontainer}>
        <Text style={styles.heading}>STAR RATING</Text>
        <Text style={styles.text}>The staring rating is calculated applying a specific algorithm taking into count the number of Requests, Likes and Dates you have.</Text>
    </View>
    
    <View style={styles.textcontainer}>
        <Text style={styles.heading}>TRUST AND SECURITY</Text>
        <Text style={styles.text}>Your privacy is valued and prioritized, With verified accounts, you can be confident that you are interacting with genuine individuals who are invested in building meaningful connections.</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mprofileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  logo: {
    top: 17,
    width: '40%', 
    height: 37,
    alignSelf: 'center',
    marginTop: 20,
  },
  heading:{
    color:'white',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 7,
  },
  text:{
    color:'white',
    fontSize: 10,
  },
  textcontainer:{
    paddingHorizontal: 30,
    paddingVertical: 20,
    top: 30,
  },
  backButton: {
    position: 'absolute',
    top: 37,
    left: 27,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default About;
