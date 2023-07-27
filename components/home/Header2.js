import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Animated, Linking, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../../firebase';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from 'react-native-toast-message';

const Header2 = ({navigation}) =>{

    const [p,setP] = useState('');
    const [r,setR] = useState('');
    useEffect(() => {
      getLoginCredentials();
    }, []);

    const getLoginCredentials = async () => {
      const rr = await SecureStore.getItemAsync('username');
      const pp = await SecureStore.getItemAsync('premium');
      // console.log(rr,pp);
      setP(pp);
      setR(rr);
    }
    const Menu = () => {
        const [menuOpen, setMenuOpen] = useState(false);
        const [menuWidth, setMenuWidth] = useState(new Animated.Value(0));
        const [userData, setUserData] = useState(null);
        const navigation2 = useNavigation();
      
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

        const closeMenu = () => {
          if (menuOpen) {
            toggleMenu();
          }
        };
        
        // const showToast = (message) => {
        //   Toast.show({
        //     type: 'info',
        //     position: 'bottom',
        //     text1: message,
        //     visibilityTime: 2000,
        //     autoHide: true,
        //     topOffset: 60,
        //     elevation: 7,
        //     bottomOffset: 40,
        //     textStyle: { fontSize: 16 },
        //     style: { backgroundColor: 'black', borderRadius: 10,},
        //   });
        // };

        return (
          <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.mcontainer}>
            <TouchableOpacity style={styles.mmenuIconContainer} onPress={toggleMenu}>
              <Ionicons name="menu" size={37} color="white" />
            </TouchableOpacity>
            <Animated.View style={[styles.mmenu, { width: menuWidth }]}>
              <View style={styles.mmenutextcontainer}>
                <View style={styles.moptionsinsidemenu}>
                  <TouchableOpacity onPress={()=>{navigation.push('About')}}>
                  <Text style={styles.mtextinsidemenu}>About</Text>
                  </TouchableOpacity>

                  {(r=="77777777") && (<TouchableOpacity onPress={()=>{showToast('Guest cannot change Settings')}}>
                  <Text style={styles.mtextinsidemenu}>Settings</Text>
                  </TouchableOpacity>)}

                  {(r!="77777777") && (<TouchableOpacity onPress={()=>{navigation.push('SignUp')}}>
                  <Text style={styles.mtextinsidemenu}>Settings</Text>
                  </TouchableOpacity>)}

                  <TouchableOpacity onPress={()=>{navigation.push('Contact')}}>
                  <Text style={styles.mtextinsidemenu}>Contact Me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.push('SignIn')}}>
                  <Text style={styles.mtextinsidemenu}>Sign Out</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.push('Saved')}}>
                  <Text style={styles.mtextinsidemenu}>Saved</Text>
                  </TouchableOpacity>
                  <View style={styles.mhorizontalBar} />
                  {(p=="0") && <View style={styles.mpremiumcontainer}>
                      <Text style={{color:'grey'}}>1 star Rating Increase</Text>
                      <Text style={{color:'grey'}}>7X more Engagement</Text>
                      <Text style={{color:'grey'}}>Freely Date Anyone</Text>
                  <TouchableOpacity style={styles.mpremiumbuttonContainer}>
                      <Image
                      source={{
                      uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
                      }}
                      style={{ height: 40, width: 40}}/>
                      <Text style={styles.mpremiumbuttonText}>Buy Premium</Text>
                  </TouchableOpacity>
                  </View>}
                  {(p=="1") && <View style={styles.mpremiumcontainer}>
                      <Text style={{color:'grey'}}>1 star Rating Increase</Text>
                      <Text style={{color:'grey'}}>7X more Engagement</Text>
                      <Text style={{color:'grey'}}>Freely Date Anyone</Text>
                  <TouchableOpacity style={styles.mpremiumbuttonContainer}>
                      {/* <Ionicons name="star" size={24} color="white" style={styles.starIcon} /> */}
                      <Image
                      source={{
                      uri: 'https://www.pngmart.com/files/12/Instagram-Verified-Badge-PNG-Clipart.png',
                      }}
                      style={{ height: 40, width: 40}}/>
                      <Text style={styles.mpremiumbuttonText}>Congratulations</Text>
                  </TouchableOpacity>
                  </View>}
                </View>
                <Animated.View
                  style={[
                    styles.mme,
                    {
                      transform: [{ translateX: menuTranslateX }],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={()=>{navigation2.navigate('OtherProfile',{profile:userData})}}>
                  <Image source={{ uri: userData && userData.profilepic }} style={styles.mprofileImage} />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10}}>
                  <View style={styles.mlinksanddesignation}>
                  <TouchableOpacity onPress={()=>{navigation2.navigate('OtherProfile',{profile:userData})}}>
                  <Text style={styles.mtextinsidemenu}>Badal Prasad Singh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/badalprasadsingh/')}>
                  <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png' }} style={styles.mlinks} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ibadartz/')}>
                  <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }} style={styles.mlinks} />
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={()=>{navigation2.navigate('OtherProfile',{profile:userData})}}>
                  <Text style={{color:'grey'}}>Founder & CEO</Text>
                  </TouchableOpacity>
                  </View>
                  
                </Animated.View>
                <View style={{marginLeft: 70, position: 'absolute', top: 700, left : 100}}>
                {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
                </View>

              </View>
            </Animated.View>
          </View>
          </TouchableWithoutFeedback>
        );
      };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}><Menu/>
            <TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../../logo.png')}
                />
            </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={()=> {
                    navigation.push('MainCards');
                }}>
                    {/* <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>!</Text>
                    </View> */}
                    {/* <Image source={require('../../leaderboard.jpg')}
                    style={styles.icon}
                    /> */}
                    {/* <View styles={{paddingRight: 20, backgroundColor: 'white'}}> */}
                    <Icon name="refresh" size={24} color={'rgb(255,255,255)'} style={{padding: 13, backgroundColor: '#1a1a1a', borderRadius: 30}}/>
                    {/* </View> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // marginTop:,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // marginHorizontal: 17,
        backgroundColor: '#0d0d0d',
        paddingTop: 47,
        paddingHorizontal: 17,
    },

    iconsContainer: {
        flexDirection: 'row',

    },

    logo: {
        marginLeft: 15,
        // zindex: 3,
        width:140,
        height: 50,
        resizeMode: 'contain',
        // zIndex: 50,
    },

    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
        // zindex: 50,
    },

    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 27,
        bottom: 18,
        width: 18,
        height: 18,
        borderRadius: 25,
        alignItems:"center",
        // zIndex: 50,
    },

    unreadBadgeText: {
        color: 'white',
        fontWeight: 600,
    },
    mcontainer: {
        // backgroundColor: '',
        // flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
        zindex: 105,
        bottom: 60,
      },
      mmenuIconContainer: {
        position: 'absolute',
        top: 64,
        left: 6,
        zIndex: 107,
      },
      mmenu: {
        position: 'absolute',
        top: 17,
        // height: '100%',
        height: 1111,
        left: -47,
        backgroundColor: '#0d0d0d',
        padding: 16,
        zindex: 105,
        // top: 10,
      },
      mmenutextcontainer: {
        marginLeft: 42,
        marginTop: 100,
        height: 710,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      mtextinsidemenu: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
      mcreatedby: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
      },
      moptionsinsidemenu: {
        height: 390,
        justifyContent: 'space-between',
      },
      mme: {
        height: 70,
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // paddingHorizontal: 27,
        // marginLeft: -2,
      },
      mprofileImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        // marginRight: 2,
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
})
export default Header2