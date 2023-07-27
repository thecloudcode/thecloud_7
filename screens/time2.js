import React, { useEffect } from 'react';
import firebase from '../firebase';

const Starratingcal = () => {
  useEffect(() => {
    calculateStarRating();
  }, []);

  const calculateStarRating = () => {
    const dates = 0;
    const requests = 0;
    const likes = 12000;

    const r = dates + requests + likes;
    const rating = parseFloat((1 + Math.pow(Math.log(r + 1) / Math.log(100), 2.4)).toFixed(1));

    // Limit the rating to a minimum of 7
    const finalRating = Math.min(7, rating);

    // Update the star rating in the Firebase Realtime Database
    const userId = '12219981';
    const starRef = firebase.database().ref(`users/${userId}/star`);
    starRef.set(String(finalRating))
      .then(() => console.log('Star rating updated successfully.'))
      .catch((error) => console.error('Error updating star rating:', error));
  };

  return null; // Or you can return your app's UI components here
};

export default Starratingcal;
