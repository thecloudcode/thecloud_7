import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity , Text, ToastAndroid} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, Day} from 'react-native-gifted-chat';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
// import Toast from 'react-native-toast-message';

import firebase from '../../firebase';

const ChatHeader = ({ navigation, profileName }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const route = useRoute();

  const { currentUserRegistrationNumber, otherUserRegistrationNumber,profile } = route.params;
  console.log(profile.profilepic);

  function showToast(mssg) {
    ToastAndroid.show(mssg, ToastAndroid.SHORT);
  }

  const deleteChat = (regg1, regg2) => {
    const userKey1 = `${regg1}${regg2}`;
    const userKey2 = `${regg2}${regg1}`;
  
    // Delete userKey1 from the chat section
    firebase.database().ref(`chat/${userKey1}`).remove();
  
    // Delete userKey2 from the chat section
    firebase.database().ref(`chat/${userKey2}`).remove();
    showToast('Chat Deleted from both sides!');
  };
  

  return (
    <View style={styles.hcontainer}>
      <View style={styles.hprofileContainer}>
        <TouchableOpacity style={styles.hbackButton} onPress={handleBackPress}>
          <Icon name="angle-left" size={44} color="white" />
        </TouchableOpacity>
        <Image
                      source={{ uri: profile.profilepic }}
                      style={styles.hprofilePic}
                    />
        <Text style={styles.hprofileName}>{profile.name}</Text>
      </View>

      <TouchableOpacity style={styles.hoptionsButton} onPress={()=>deleteChat(currentUserRegistrationNumber, otherUserRegistrationNumber)}>
        <Text style={{color:'grey', fontWeight:'bold'}}>Delete</Text>
      </TouchableOpacity>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}


      {/* Dropdown menu for options */}
      {/* Add your dropdown menu component for reporting here */}
    </View>
  );
};

const ChatScreen2 = ({navigation}) => {
  const route = useRoute();
  const { currentUserRegistrationNumber, otherUserRegistrationNumber,profile } = route.params;
  const [messages, setMessages] = useState([]);
  let userKey = `${currentUserRegistrationNumber}${otherUserRegistrationNumber}`;

  useEffect(() => {
    let chatRef = firebase.database().ref(`chat/${userKey}`);
    
    chatRef.on('value', (snapshot) => {
      let chatData = snapshot.val();
      if (chatData === null) {
        userKey = `${otherUserRegistrationNumber}${currentUserRegistrationNumber}`;
        chatRef = firebase.database().ref(`chat/${userKey}`);
        chatRef.on('value', (snapshot) => {
          chatData = snapshot.val();
          console.log(chatData)
          if (chatData) {
            const messageList = Object.values(chatData);
            const formattedMessages = messageList.map((message) => ({
              _id: Object.keys(chatData).find(key => chatData[key] === message),
              text: message.m,
              createdAt: new Date(message.t),
              user: {
                _id: message.s === currentUserRegistrationNumber ? 1 : 2,
              },
            }));
            setMessages(formattedMessages.reverse());
          }
        });
      } else {
        const messageList = Object.values(chatData);
        const formattedMessages = messageList.map((message) => ({
          _id: Object.keys(chatData).find(key => chatData[key] === message),
          text: message.m,
          createdAt: new Date(message.t),
          user: {
            _id: message.s === currentUserRegistrationNumber ? 1 : 2,
          },
        }));
        setMessages(formattedMessages.reverse());
      }
    });

    return () => chatRef.off('value');
  }, [currentUserRegistrationNumber, otherUserRegistrationNumber]);

  const saveTimestamp = (regg1, regg2) => {
    const userKey = `${regg1}${regg2}`;
    const alternateUserKey = `${regg2}${regg1}`;
  
    // Reference to the chat section in the Firebase Realtime Database
    const chatRef = firebase.database().ref('chat');
  
    // Check if the userKey exists
    chatRef.child(userKey).once('value', snapshot => {
      if (snapshot.exists()) {
        // UserKey exists, save the timestamp in regg1 key
        chatRef.child(`${userKey}/${regg1}`).set(Date.now());
      } else {
        // UserKey doesn't exist, check if alternateUserKey exists
        chatRef.child(alternateUserKey).once('value', alternateSnapshot => {
          if (alternateSnapshot.exists()) {
            // AlternateUserKey exists, save the timestamp in regg1 key
            chatRef.child(`${alternateUserKey}/${regg1}`).set(Date.now());
          } else {
            // AlternateUserKey doesn't exist, create userKey and save the timestamp in regg1 key
            chatRef.child(`${userKey}/${regg1}`).set(Date.now());
          }
        });
      }
    });
  };


  const handleSend = (newMessages = []) => {
    const timestamp = new Date().toISOString();
  
    newMessages.forEach((message) => {
      const userKey1 = `${currentUserRegistrationNumber}${otherUserRegistrationNumber}`;
      const userKey2 = `${otherUserRegistrationNumber}${currentUserRegistrationNumber}`;
      let chatRef = firebase.database().ref(`chat/${userKey1}`);
  
      chatRef.once('value', (snapshot) => {
        const chatData = snapshot.val();
        let userKey = userKey1;
        if (!chatData) {
          userKey = userKey2;
        }
  
        const messageKey = firebase.database().ref(`chat/${userKey}`).push().key;
        const messageData = {
          m: message.text,
          s: currentUserRegistrationNumber,
          t: timestamp,
        };
        firebase.database().ref(`chat/${userKey}/${messageKey}`).set(messageData);
        firebase.database().ref(`chat/${userKey}/lastmessage`).set(message.text);
        firebase.database().ref(`chat/${userKey}/last`).set(Date.now());
      });

    });
  };
  
  useEffect(() => {
    let chatRef = firebase.database().ref(`chat/${userKey}`);
  
    chatRef.on('value', (snapshot) => {
      const chatData = snapshot.val();
      if (chatData) {
        const messageList = Object.values(chatData);
        const formattedMessages = messageList.map((message) => ({
          _id: Object.keys(chatData).find(key => chatData[key] === message),
          text: message.m,
          createdAt: new Date(message.t),
          user: {
            _id: message.s === currentUserRegistrationNumber ? 1 : 2,
          },
        }));
        setMessages(formattedMessages.reverse());
      } else {
        setMessages([]);
      }
    });
  
    return () => chatRef.off('value');
  }, [currentUserRegistrationNumber, otherUserRegistrationNumber]);

  // Custom bubble style
  const renderBubble = (props) => {
    const { currentMessage } = props;
  
    // Function to check if the timestamp is valid
    const isValidTimestamp = (timestamp) => {
      return timestamp && !isNaN(Date.parse(timestamp));
    };
  
    // Check if the currentMessage has a valid timestamp
    if (!isValidTimestamp(currentMessage?.createdAt)) {
      // Return null to skip rendering this bubble
      return null;
    }
  
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#fb3768',
          },
          left: {
            backgroundColor: '#0d0d0d',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -40,
          },
        }}
        textStyle={{
          left: {
            color: 'white',
            fontWeight: 'bold',
          },
          right: {
            color: 'white',
            fontWeight: 'bold',
          }
        }}
      >
        {/* {currentMessage.user._id === 2 && (
          <Image
            source={require('../../pics/girl2.jpeg')}
            style={styles.profileImage}
          />
        )} */}
      </Bubble>
    );
  };

  const renderDay = (props) => {
    const { currentMessage } = props;
  
    // Function to check if the timestamp is valid
    const isValidTimestamp = (timestamp) => {
      return timestamp && !isNaN(Date.parse(timestamp));
    };
  
    // Check if the currentMessage has a valid timestamp
    if (!isValidTimestamp(currentMessage?.createdAt)) {
      return null;
    }
  
    return (
      <Day
        {...props}
        textStyle={{
          color: '#99ccff',
          fontWeight: 'bold',
        }}
      />
    );
  };
  
  
  

  // Custom input toolbar style
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#0d0d0d',
          borderRadius: 27,
          padding: 5,
          margin: 7,
          marginBottom: 0,
          borderTopWidth: 0,
        }}
        primaryStyle={{ color: 'white' }}
        placeholderTextColor="grey"
        textInputStyle={{ color: 'white' }}
      />
    );
  };

  // Custom send button style
  const renderSend = (props) => {
    const { onPress } = props;
  
    return (
      <Send
        {...props}
        textStyle={{ color: '#fb3768' }}
        onPress={() => {saveTimestamp(currentUserRegistrationNumber, otherUserRegistrationNumber)}}
      />
    );
  };

  

  return (
    <View style={styles.container}>
      <ChatHeader navigation={navigation} profileName={otherUserRegistrationNumber} />
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
        _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderDay={renderDay}
        inverted={true} // Set to true if you want the latest message to appear at the bottom
        onPressSend={saveTimestamp} // Pass the saveTimestamp function as the onPress prop
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileImage: {
    width: 10,
    height: 10,
    borderRadius: 15,
    marginHorizontal: 8,
    zIndex: 7,
  },
  hcontainer: {
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: 'black',
    marginTop: 10,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between', // Added
  },
  hbackButton: {
    marginRight: 16,
  },
  hprofileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hprofilePic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
    // position: 'absolute',
    // bottom: 774,
    // left: 44,
  },
  hprofileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  hoptionsButton: {
    marginLeft: 16,
    // alignItems: 'right',
  },
});

export default ChatScreen2;
