import React from 'react';
import { View, Text } from 'react-native';
import firebase from '../firebase';

const YourComponent = ({ regg1, regg2 }) => {
  const decideTextColor = (regg1, regg2) => {
    const userKey = `${regg1}${regg2}`;
    const reverseUserKey = `${regg2}${regg1}`;

    // Access the chat section of the realtime database
    const chatRef = firebase.database().ref('chat');

    return chatRef.child(userKey).once('value')
      .then(snapshot => {
        // Check if userKey exists, otherwise check reverseUserKey
        if (snapshot.exists()) {
          const { [regg1]: value1, [regg2]: value2 } = snapshot.val();

          // Compare the values and decide the text color
          console.log(value1,value2);
          if (parseInt(value1) < parseInt(value2)) {
            return 'white';
          } else {
            return 'black';
          }
        } else {
          return chatRef.child(reverseUserKey).once('value')
            .then(reverseSnapshot => {
              if (reverseSnapshot.exists()) {
                const { [regg1]: value1, [regg2]: value2 } = reverseSnapshot.val();
                console.log(value1,value2);
                // Compare the values and decide the text color
                if (parseInt(value1) < parseInt(value2)) {
                  return 'white';
                } else {
                  return 'black';
                }
              } else {
                // If neither userKey nor reverseUserKey exists, default to black
                return 'black';
              }
            });
        }
      });
  };

  return (
    <View>
      <Text style={{ marginTop: 200,color: decideTextColor('12214352', '12214076') }}>Your Text Here</Text>
    </View>
  );
};

export default YourComponent;
