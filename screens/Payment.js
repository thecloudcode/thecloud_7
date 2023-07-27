// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import UPIPayment, { UPIApps } from 'react-native-upi-payment';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Pay() {
//   const handlePayment = async () => {
//     const amount = '17';
//     const upiAddress = 'badalstar1806@okaxis'; // Replace with your UPI ID

//     try {
//       const response = await UPIPayment.initializePayment({
//         vpa: upiAddress,
//         amount,
//         transactionRef: 'some-random-transaction-id',
//         transactionNote: 'UPI Payment',
//       });

//       if (response.status === 'success') {
//         console.log('Success');
//       } else {
//         console.log('No success');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handlePayment} style={styles.button}>
//         <Text style={styles.buttonText}>Pay Rs 7</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
