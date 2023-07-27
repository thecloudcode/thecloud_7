import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const Save = () => {
  const [saved, setSaved] = useState(false);
  const regNo = '12214352';
  const regg = '12221451';

  useEffect(() => {
    const saveRef = firebase.database().ref('/save');
    saveRef.child(regNo).once('value').then((snapshot) => {
      const data = snapshot.val();
      if (data && data.hasOwnProperty(regg)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }).catch((error) => {
      console.log('Failed to fetch data:', error);
    });
  }, []);

  const toggleSave = () => {
    const saveRef = firebase.database().ref('/save');
    saveRef.child(regNo).once('value').then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.hasOwnProperty(regg)) {
          // Regg exists, remove it
          saveRef
            .child(`${regNo}/${regg}`)
            .remove()
            .then(() => {
              setSaved(false);
              showToast('UnSaved!');
              console.log('Regg removed');
            })
            .catch((error) => {
              console.log('Failed to remove Regg:', error);
            });
        } else {
          // Regg doesn't exist, add it
          saveRef
            .child(`${regNo}/${regg}`)
            .set('1')
            .then(() => {
              setSaved(true);
              showToast('Saved!');
              console.log('Regg added');
            })
            .catch((error) => {
              console.log('Failed to add Regg:', error);
            });
        }
      } else {
        console.log('Save section not found');
      }
    }).catch((error) => {
      console.log('Failed to fetch data:', error);
    });
  };

  const showToast = (message) => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: message,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
      textStyle: { fontSize: 16 },
      style: { backgroundColor: 'black', borderRadius: 10 },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSave}>
        <Icon name={saved ? 'bookmark' : 'bookmark-o'} size={70} color={'#fb3768'} />
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    top: 700,
    width: 600,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

export default Save;
