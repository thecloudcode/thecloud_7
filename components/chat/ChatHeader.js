// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';

// import Icon from "react-native-vector-icons/FontAwesome";

// const ChatHeader = ({ navigation, profileName }) => {
//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   const handleReport = () => {
//     // Handle report functionality here
//   };

//   return (
//     <View style={styles.hcontainer}>
//       <TouchableOpacity style={styles.hbackButton} onPress={handleBackPress}>
//       <Icon name="angle-left" size={24} color="white" />
//       </TouchableOpacity>

//       <View style={styles.hprofileContainer}>
//         <Image source={require('../../pics/girl.jpeg')} style={styles.hprofilePic} />
//         <Text style={styles.hprofileName}>Sweetheart</Text>
//       </View>

//       <TouchableOpacity style={styles.hoptionsButton} onPress={handleReport}>
//       <Icon name="ellipsis-v" size={24} color="white" />
//       </TouchableOpacity>

//       {/* Dropdown menu for options */}
//       {/* Add your dropdown menu component for reporting here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   hcontainer: {
//     color: 'white',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'ios' ? 40 : 16,
//     backgroundColor: 'black',
//     marginTop: 10,
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-between', // Added
//   },
//   hbackButton: {
//     marginRight: 16,
//   },
//   hprofileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   hprofilePic: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 8,
//   },
//   hprofileName: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   hoptionsButton: {
//     marginLeft: 16,
//     // alignItems: 'right',
//   },
// });

// export default ChatHeader;
