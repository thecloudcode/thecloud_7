import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const SearchApp = () => {
  const [searchText, setSearchText] = useState('');
  const [foundProfiles, setFoundProfiles] = useState([]);
  const [dataFromFirebase, setDataFromFirebase] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const databaseURL = 'https://thecloud-7-default-rtdb.firebaseio.com/';
        const snapshot = await firebase.database().ref('users').once('value');
        const data = snapshot.val();
        setDataFromFirebase(Object.values(data));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const searchProfile = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFoundProfiles([]);
      return;
    }
    const filteredProfiles = dataFromFirebase.filter(
      (p) =>
        p.name.toLowerCase().startsWith(text.toLowerCase()) ||
        p.registrationNumber.toLowerCase().startsWith(text.toLowerCase())
    ).slice(0, 7);
    setFoundProfiles(filteredProfiles);
  };

  const renderProfileItem = ({ item }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={() => navigation.navigate('OtherProfile', { profile: item })}
    >
      
      <Image source={{ uri: item.profilepic }} style={styles.profilePic} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.registrationNumber}>{item.registrationNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fb3768','black','black','black','black','black','black','black','black','black','black','black','black']}
        style={styles.gradient}
      >
      <View style={{width:'90%'}}><Text style={styles.searchText}>Search</Text></View>
      <TextInput
        style={styles.searchBox}
        placeholder="Enter name or registration number"
        onChangeText={searchProfile}
        value={searchText}
      />
      {foundProfiles.length > 0 ? (
        <FlatList
          data={foundProfiles}
          renderItem={renderProfileItem}
          keyExtractor={(item) => item.registrationNumber}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.noprofile}>No profiles found</Text>
      )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 17,
    // marginRight: 17,
    marginTop: 0,
    backgroundColor: '#0d0d0d',
    // paddingTop: 20,
    color: 'white',
  },
  searchText: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderWidth: 3,
    color: 'white',
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  flatList: {
    marginTop: 10,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 4,
    backgroundColor: '#0d0d0d',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    borderRadius: 17,
    // paddingHorizontal: 75,
    width: 380,

    // justifyContent: 'flex-start',
    // justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  profilePic: {
    height: 57,
    width: 57,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registrationNumber: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  noprofile: {
    color: 'grey',
    textAlign: 'center',
    marginTop: '30%',
    fontSize: 14,
    // paddingTop: -40,
    // marginTop: 77,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchApp;
