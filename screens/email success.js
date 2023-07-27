import React, { useState } from 'react';
import { View, TextInput, Text, Button, Modal } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import firebase from 'firebase/app';
import firebase from '../firebase';


const CollegeDropdown = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [otherCollege, setOtherCollege] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveCollege = () => {
    // Save the selected college to the Firebase Realtime Database
    const collegeRef = firebase.database().ref(selectedCollege);
    
    collegeRef.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        collegeRef.set({
          chat: {},
          notifications: {},
          save: {},
          users: {},
        });
      }
    });
  };
  

  const handleSelectCollege = (college) => {
    setSelectedCollege(college);
    if (college === 'Other') {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Text>Select College:</Text>
      <View>
        <Button title="LPU" onPress={() => handleSelectCollege('LPU')} />
        <Button title="SRM" onPress={() => handleSelectCollege('SRM')} />
        <Button title="BITS" onPress={() => handleSelectCollege('BITS')} />
        <Button title="Other" onPress={() => handleSelectCollege('Other')} />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text>Enter Other College:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
            value={otherCollege}
            onChangeText={setOtherCollege}
          />
          <Button
            title="Save"
            onPress={() => {
              setSelectedCollege(otherCollege);
              setModalVisible(false);
              handleSaveCollege();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};


export default CollegeDropdown;
