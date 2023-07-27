import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const API_BASE_URL = 'https://backcloud.onrender.com'; // Replace with your backend URL

const Test = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);

  const handleSendOTP = async () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert('Success', 'OTP has been sent to your email');
        setIsOTPSent(true);
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp === '') {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, userOtp: otp }), // Use the entered OTP value for userOtp
      });
  
      if (response.ok) {
        console.log('Success');
        Alert.alert('Success', 'OTP has been verified successfully');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
    }
  };
  
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderColor: 'gray' }}
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {!isOTPSent ? (
        <Button title="Send OTP" onPress={handleSendOTP} />
      ) : (
        <>
          <TextInput
            style={{ marginBottom: 16, padding: 8, borderWidth: 1, borderColor: 'gray' }}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={text => setOTP(text)}
            keyboardType="numeric"
          />

          <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </>
      )}
    </View>
  );
};

export default Test;
