import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import firebase from '../../firebase';

const DataScreen = () => {
  const [data, setData] = useState([]);
  const [randomProfile, setRandomProfile] = useState(null);

  const fetchData = async () => {
    try {
      const databaseURL = 'https://thecloud-7-default-rtdb.firebaseio.com/';
      const snapshot = await firebase.database().refFromURL(`${databaseURL}/users`).once('value');
      const dataFromFirebase = snapshot.val();
      const dataArray = Object.values(dataFromFirebase);
      setData(dataArray || []);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomProfile(data[randomIndex]);
    }
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {randomProfile ? (
        <View style={styles.userContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: randomProfile.profilepic }} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{randomProfile.name}</Text>
            <Text style={styles.registration}>{randomProfile.registrationNumber}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 27,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  registration: {
    color: 'white',
    fontSize: 14,
  },
  text: {
    color: 'white',
  },
});

export default DataScreen;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import firebase from '../../firebase';

// const DataScreen = () => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const databaseURL = 'https://thecloud-7-default-rtdb.firebaseio.com/';
//       const snapshot = await firebase.database().refFromURL(`${databaseURL}/users`).once('value');
//       const dataFromFirebase = snapshot.val();
//       const dataArray = Object.values(dataFromFirebase);
//       setData(dataArray || []);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {data.length > 0 ? (
//         data.map((item, index) => (
//           <View key={index} style={styles.userContainer}>
//             <View style={styles.imageContainer}>
//               <Image style={styles.image} source={{ uri: item.profilepic }} />
//             </View>
//             <View style={styles.detailsContainer}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.registration}>{item.registrationNumber}</Text>
//             </View>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.text}>No data available</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   imageContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 27,
//     overflow: 'hidden',
//     marginRight: 10,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   detailsContainer: {
//     flex: 1,
//   },
//   name: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   registration: {
//     color: 'white',
//     fontSize: 14,
//   },
//   text: {
//     color: 'white',
//   },
// });

// export default DataScreen;