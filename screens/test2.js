import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const Test2 = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const generateOtp = () => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
    setOtp(randomOtp.toString());
  };

  const sendOtp = () => {
    const data = {
      email,
      otp
    };
  
    fetch('https://backcloud.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setVerificationCode(result.verificationCode); // Store the verification code received from the server
      })
      .catch(error => console.log(error));
  };

  const verifyOtp = () => {
    if (verificationCode === otp) {
      console.log('Success');
    } else {
      console.log('Fail');
    }
  };

  return (
    <View style={{marginTop: 200}}>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button title="Generate OTP" onPress={generateOtp} />
      <Button title="Send OTP" onPress={sendOtp} />
      <TextInput
        placeholder="Enter Verification Code"
        value={verificationCode}
        onChangeText={text => setVerificationCode(text)}
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
};

export default Test2;
