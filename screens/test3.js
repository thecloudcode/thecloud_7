import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
// import Toast from 'react-native-toast-message';
import firebase from '../firebase';
import { useRoute, useNavigation } from '@react-navigation/native';

const Test3 = () => {
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [regg, setRegg] = useState('');
  const [code, setCode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const navigation = useNavigation();


  const generateRandomCode = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate a four-digit random code
    setCode(randomCode.toString());
    setShowPasscode(true);
  };

  const retrieveCollegeEmails = (email,regg) => {
    const databaseRef = firebase.database().ref('collegeemails');
    const databaseRef2 = firebase.database().ref(`users/${regg}`);
    
  
    databaseRef.once('value', (snapshot) => {
      const collegeEmailsData = snapshot.val();
  
      if (collegeEmailsData) {
        // Process the collegeEmailsData here
        const collegeEmailsList = Object.values(collegeEmailsData);
        const domain = email.slice(email.indexOf('@') + 1);
  
        if (collegeEmailsList.includes(domain)) {
          console.log('Match');

          databaseRef2.once('value', (snapshot) => {
            const userData = snapshot.val();
        
            if (userData && userData.name) {
              const nameWords = userData.name.toLowerCase().split(' ');
              console.log(nameWords);
        
              const nameWordsIncludedInEmail = nameWords.filter((word) => email.includes(word));
        
              if (nameWordsIncludedInEmail.length >= 2) {
                console.log('Too good');
                generateRandomCode();
              } else {
                showToast("Email doesn't belong to this Registration No!");
                setCode('');
              }
            } else {
              showToast('Enter Valid Registration No');
              setCode('');
            }
          });

        } else {
          // console.log('No match');
          showToast('Please Enter College Email ID');
          setCode('');
        }
      } else {
        console.log('No college emails found');
        setCode('');
      }
    });

  };

  // const checkEmailValidity = (email, regg) => {
  //   const databaseRef2 = firebase.database().ref(`users/${regg}`);
  
  //   databaseRef2.once('value', (snapshot) => {
  //     const userData = snapshot.val();
  
  //     if (userData && userData.name) {
  //       const nameWords = userData.name.toLowerCase().split(' ');
  //       console.log(nameWords);
  
  //       const nameWordsIncludedInEmail = nameWords.filter((word) => email.includes(word));
  
  //       if (nameWordsIncludedInEmail.length >= 2) {
  //         console.log('Too good');
  //       } else {
  //         console.log('Not too good');
  //       }
  //     } else {
  //       console.log('User data not found');
  //     }
  //   });
  // };
  
  
  
  

  useEffect(() => {
    if (code) {
      handleSend();
    }
  }, [code]);

  function showToast(mssg) {
    ToastAndroid.show(mssg, ToastAndroid.SHORT);
  }

  const handleSend = () => {
    console.log(JSON.stringify({ email, code }));
    if (email && code) {
      fetch('https://backcloud.onrender.com/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showToast('Check Junk Email or Inbox, Email Sent!')
          } else {
            showToast('Failed to Send Email');
          }
        })
        .catch((error) => {
          console.error(error);
          showToast('Something went wrong');
        });
    } else {
      // Alert.alert('Error', 'Please enter email and passcode');
      showToast('Please Enter College Email and Password');
    }
  };

  const verifyotpandpasscode = () => {
    console.log(code, passcode);
    if (code && passcode) {
      if (code === passcode) {
        // console.log('My mum raised a genius!');
        navigation.navigate('Password',{RegNo:regg});
        
      } else {
        showToast('Wrong OTP');
      }
    }
  };

  return (
    <View style={styles.container}>
    <View style={{ marginTop: 300, width: '90%'}}>
    <Image
          style={styles.logo}
          source={require('../logo.png')}
        />
      <Text style={styles.label}>College Email ID</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <Text style={styles.label}>Registration Number</Text>
      <TextInput
            placeholder="Registration Number"
            onChangeText={(text) => setRegg(text)}
            value={regg}
            style={styles.input}
      />

      {email && (
        // <Button title="Send OTP" onPress={generateRandomCode} />
        // <Button title="Send OTP" onPress={()=>retrieveCollegeEmails(email,regg)} />
        <TouchableOpacity style={styles.button}onPress={()=>retrieveCollegeEmails(email,regg)}>
          <Text style={{color:'white',fontWeight: 'bold'}}>SEND OTP</Text>
        </TouchableOpacity>

      )}

      {showPasscode && (
        <>
        <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            placeholder="Passcode"
            onChangeText={(text) => setPasscode(text)}
            value={passcode}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}onPress={verifyotpandpasscode}>
          <Text style={{color:'white',fontWeight: 'bold'}}>VERIFY</Text>
          </TouchableOpacity>
          {/* <Button title="Verify" onPress={verifyotpandpasscode} /> */}

          

        </>
      )}
    </View>
    {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    
  },
  input:{
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10,
    padding:7,
    color: 'white',
    marginBottom : 7,
    // width: '100%',
  },
  button:{
    padding:12,
    backgroundColor: '#fb3768',
    marginBottom : 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  label:{
    color: 'white',
    fontSize: 11,
    paddingLeft: 4,
  },
  logo: {
    top: 17,
    width: '40%', 
    height: 37,
    alignSelf: 'center',
    marginTop: 20,
    marginTop: -70,
    marginBottom: 70,
  },
});

export default Test3;
