import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../firebase';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState(new Animated.Value(0));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = (RegNo) => {
      const database = firebase.database();
      const userRef = database.ref('users').child(RegNo);

      userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
    };

    fetchUserData(12219981);
  }, []);

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 350; // Adjust the width as needed
    Animated.timing(menuWidth, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const menuTranslateX = menuWidth.interpolate({
    inputRange: [0, 950],
    outputRange: [-150, 250], // Adjust the values as needed
  });

  return (
    <View style={styles.mcontainer}>
      <TouchableOpacity style={styles.mmenuIconContainer} onPress={toggleMenu}>
        <Ionicons name="menu" size={37} color="white" />
      </TouchableOpacity>
      <Animated.View style={[styles.mmenu, { width: menuWidth }]}>
        <View style={styles.mmenutextcontainer}>
          <View style={styles.moptionsinsidemenu}>
            <Text style={styles.mtextinsidemenu}>About</Text>
            <Text style={styles.mtextinsidemenu}>Settings</Text>
            <Text style={styles.mtextinsidemenu}>Contact Me</Text>
            <Text style={styles.mtextinsidemenu}>Sign Out</Text>
            <View style={styles.mhorizontalBar} />
            <View style={styles.mpremiumcontainer}>
                <Text style={{color:'white'}}>1 star Rating Increase</Text>
                <Text style={{color:'white'}}>7X more Engagement</Text>
            <TouchableOpacity style={styles.mpremiumbuttonContainer}>
                <Ionicons name="star" size={24} color="white" style={styles.starIcon} />
                <Text style={styles.mpremiumbuttonText}>Buy Premium</Text>
            </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={[
              styles.mme,
              {
                transform: [{ translateX: menuTranslateX }],
              },
            ]}
          >
            <Image source={{ uri: userData && userData.profilepic }} style={styles.mprofileImage} />
            <View>
            <View style={styles.mlinksanddesignation}>
            <Text style={styles.mtextinsidemenu}>{userData && userData.name}</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/badalprasadsingh/')}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png' }} style={styles.mlinks} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ibadartz/')}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }} style={styles.mlinks} />
            </TouchableOpacity>
            </View>
            <Text style={{color:'grey'}}>Founder & CEO</Text>
            </View>
            
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mcontainer: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
  },
  mmenuIconContainer: {
    position: 'absolute',
    top: 36,
    left: 16,
    zIndex: 1,
  },
  mmenu: {
    position: 'absolute',
    top: 0,
    left: -37,
    backgroundColor: '#0d0d0d',
    padding: 16,
  },
  mmenutextcontainer: {
    marginLeft: 42,
    marginTop: 100,
    height: 710,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mtextinsidemenu: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  mcreatedby: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  moptionsinsidemenu: {
    height: 350,
    justifyContent: 'space-between',
  },
  mme: {
    height: 70,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mprofileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  mlinks: {
    marginTop: 3,
    marginLeft: 7,
    height: 17,
    width: 17,
  },
  mlinksanddesignation:{
    // marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mpremiumcontainer: {
    // flex: 1,
    height: 150,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  mpremiumbuttonContainer: {
    // backgroundColor: 'black',
    width: '100%',
    top: 24,
    // marginTop: 20,
    // padding: 20,
    // alignItems: 'center',
    // alignContent: 'center',
    borderRadius: 20,
    padding: 16,
    paddingLeft: 55,
    // paddingRight: 30,
    flexDirection: 'row',
    backgroundColor: '#fb3768',
    alignItems: 'center',
    
  },
  mstarIcon: {
    marginRight: 8,
  },
  mpremiumbuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mhorizontalBar: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
  },
});

export default Menu;
