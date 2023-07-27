import React from 'react';
import { Button } from 'react-native';
import firebase from '../../firebase';

const RandomUserButton = () => {
  const increaseRequests = async () => {
    try {
      // Get a snapshot of the users in the database
      const usersSnapshot = await firebase.database().ref('/users').once('value');
      const users = usersSnapshot.val();
      const userKeys = Object.keys(users);
    //   console.log(userKeys);
      const randomUserKey = userKeys[Math.floor(Math.random() * userKeys.length)];
      await firebase.database().ref(`/users/${randomUserKey}/requests`).transaction((requests) => String(parseInt(requests) + 1));

      // Retrieve and display the profile data of the first user key
      const firstUserKey = userKeys[0];
      const firstUserSnapshot = await firebase.database().ref(`/users/${firstUserKey}`).once('value');
      const firstUser = firstUserSnapshot.val();
      console.log('First User Profile Data:', firstUser.name);

    //   console.log('Requests increased successfully!');
    } catch (error) {
      console.error('Error increasing requests:', error);
    }
  };

  return (
    <Button title="Increase Requests" onPress={increaseRequests} />
  );
};

export default RandomUserButton;
