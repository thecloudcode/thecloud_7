import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [RegNo, setRegNo] = useState('');
  const [userData, setUserData] = useState(null);
  const [userRank, setUserRank] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  const navigation=useNavigation();

  useEffect(() => {
    fetchUsername();
    const usersRef = firebase.database().ref('users');

    usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const leaderboard = Object.values(data);

      leaderboard.sort((a, b) => {
        if (a.star !== b.star) {
          return b.star - a.star;
        }

        if (a.dates !== b.dates) {
          return a.dates - b.dates;
        }

        if (a.requests !== b.requests) {
          return a.requests - b.requests;
        }

        if (a.likes !== b.likes) {
          return a.likes - b.likes;
        }

        return a.name.localeCompare(b.name);
      });

      setLeaderboardData(leaderboard);
    });

    return () => {
      usersRef.off();
    };
  }, []);

  useEffect(() => {
    if (userData) {
      calculateStarRating();
    }
  }, [userData]);


  const fetchUsername = async () => {
    try {
      const storedUsername = await SecureStore.getItemAsync('username');
      console.log('Stored username:', storedUsername);
      setRegNo(storedUsername);
      fetchUserData(storedUsername);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const fetchUserData = (RegNo) => {
    const userRef = firebase.database().ref('users').child(RegNo);

    userRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
      setIsLoading(false);
      updateRank(leaderboardData);

    });
  };

  const calculateStarRating = () => {
    const dates = parseInt(userData.dates);
    const requests = parseInt(userData.requests);
    const likes = parseInt(userData.likes);

    const r = dates + requests + likes;
    
    const rating = parseFloat((1 + Math.pow(Math.log(r + 1) / Math.log(100), 2.4)).toFixed(1));
    console.log(r, rating);

    // Limit the rating to a minimum of 7
    const finalRating = Math.min(7, rating);

    // Update the star rating in the Firebase Realtime Database
    const starRef = firebase.database().ref(`users/${RegNo}/star`);
    starRef
      .set(String(finalRating))
      .then(() => console.log('Star rating updated successfully.'))
      .catch((error) => console.error('Error updating star rating:', error));
  };

  useEffect(() => {
    if (leaderboardData.length > 0) {
      updateRank(leaderboardData);
    }
  }, [leaderboardData]);
  
  const updateRank = (leaderboard) => {
    const userIndex = leaderboard.findIndex((item) => item.registrationNumber === RegNo);
    setUserRank(userIndex >= 0 ? userIndex + 1 : 0);
  };

  const renderItem = ({ item, index }) => (
    <View key={item.registrationNumber} style={styles.itemContainer}>
      <Text style={styles.rank}>{index + 1}</Text>
      <TouchableOpacity style={styles.touchme}onPress={()=>navigation.navigate('OtherProfile',{profile:item})}>
      <Image source={{ uri: item.profilepic }} style={styles.profilePic} />
      <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.starRating}>{item.star}</Text>
      <Icon name="star" size={20} color="#fb3768" />
    </View>
  );

  const searchProfile = () => {
    const searchedUser = leaderboardData.find((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.registrationNumber.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (searchedUser) {
      const userIndex = leaderboardData.findIndex((item) => item === searchedUser);
      setSearchedUser({ ...searchedUser, rank: userIndex + 1 });
    } else {
      setSearchedUser(null);
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
        colors={['#fb3768','purple','black', 'black','black','black','black','black']}
        style={styles.gradient}
      >
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={37} color="white" />
        </TouchableOpacity>
        <Text style={styles.leaderboard}>Leaderboard</Text>
      </View>
      <TouchableOpacity onPress={searchProfile}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Enter name or registration number"
          onChangeText={setSearchText}
          value={searchText}
          onSubmitEditing={searchProfile}
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={searchProfile} style={styles.searchIconContainer}>
        <Icon name="search" size={30} color="white" />
      </TouchableOpacity>
      </View>

      {searchedUser && (
        <View style={styles.itemContainer}>
          <Text style={styles.rank}>{searchedUser.rank}</Text>
          <Image source={{ uri: searchedUser.profilepic }} style={styles.profilePic} />
          <Text style={styles.name}>{searchedUser.name}</Text>
          <Text style={styles.starRating}>{searchedUser.star}</Text>
          <Icon name="star" size={20} color="#fb3768" />
        </View>
      )}

      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.registrationNumber}
        renderItem={renderItem}
      />
      <LinearGradient
        colors={['#fb3768','purple']}
        style={styles.bgradient}
      >
      <View style={styles.bottom}>
        <View style={styles.itemContainer}>
          <Text style={styles.rank}>{userRank}</Text>
          <Image source={{ uri: userData.profilepic }} style={styles.profilePic} />
          <Text style={styles.bname}>{userData.name}</Text>
          <Text style={styles.bstarRating}>{userData.star}</Text>
          <Icon name="star" size={20} color="white" />
        </View>
      </View>
      </LinearGradient>
    </View>
    
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingHorizontal: 36,
  paddingVertical: 24,
  // backgroundColor: 'black',
},
gradient: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  // borderColor: 'white',
  // borderWidth: 1,
},
touchme:{
  flexDirection: 'row',
  alignItems: 'center',
  width: '70%',
},
leaderboard: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 21,
},
backButton: {
  marginRight: 16,
},
rank: {
  width: 40,
  marginRight: 16,
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
},
profilePic: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 16,
},
name: {
  color: 'white',
  flex: 1,
  marginRight: 16,
  fontSize: 16,
},
bname: {
  color: 'white',
  flex: 1,
  marginRight: 16,
  fontSize: 16,
  fontWeight: 'bold'
},
starRating: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fb3768',
  marginRight: 2,
},
bstarRating: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  marginRight: 2,
},
header: {
  flexDirection: 'row',
  color: 'white',
  fontSize: 17,
  height: 47,
  alignItems: 'center',
  marginTop: 10,
},
bottom: {
  // backgroundColor: '#0d0d0d',
  // paddingTop: 16,
  paddingHorizontal: 16,
  // marginTop: 16,
  alignItems: 'center',
  borderRadius: 17,
  // verticalAlign: 'middle',
  marginLeft: -17,
  marginRight: -17,

},
bgradient: {
  paddingTop: 16,
  paddingHorizontal: 16,
  // flex: 1,
  borderRadius: 17,
  marginLeft: -13,
  marginRight: -17,
  justifyContent: 'center',
  // alignItems: 'center',
},
bottomText: {
  color: 'white',
},
searchText: {
  color: 'white',
  fontSize: 20,
  marginBottom: 10,
  fontWeight: 'bold',
},
searchBox: {
  width: '90%',
  height: 40,
  borderWidth: 3,
  color: 'white',
  borderColor: 'white',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 20,
},
searchedUserContainer: {
  backgroundColor: 'white',
  padding: 10,
  marginVertical: 10,
  borderRadius: 8,
  flexDirection: 'row',
},
searchedUserText: {
  fontWeight: 'bold',
  fontSize: 16,
},
searchcontainer:{
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
}
});

export default LeaderboardScreen;
