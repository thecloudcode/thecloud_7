
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Button, FlatList, StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import firebase from '../../firebase';
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute, useNavigation } from '@react-navigation/native';

const ChatHeader = ({ navigation, profileName }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReport = () => {
    // Handle report functionality here
  };

  return (
    <View style={styles.hcontainer}>
      <View style={styles.hprofileContainer}>
        <TouchableOpacity style={styles.hbackButton} onPress={handleBackPress}>
          <Icon name="angle-left" size={24} color="white" />
        </TouchableOpacity>
        {/* <Image source={require('../../pics/girl.jpeg')} style={styles.hprofilePic} /> */}
        <Text style={styles.hprofileName}>{profileName}</Text>
      </View>

      <TouchableOpacity style={styles.hoptionsButton} onPress={handleReport}>
        <Icon name="ellipsis-v" size={24} color="white" />
      </TouchableOpacity>

      {/* Dropdown menu for options */}
      {/* Add your dropdown menu component for reporting here */}
    </View>
  );
};

const ChatScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const { currentUserRegistrationNumber, otherUserRegistrationNumber } = route.params;
  const [otherUserName, setOtherUserName] = useState('');
  const [otherUserPic, setOtherUserPic] = useState('');
  const chatRef = useRef(null);
  const oldestMessageIdRef = useRef(null);

  useEffect(() => {
    const userKey = `${currentUserRegistrationNumber}${otherUserRegistrationNumber}`;
  chatRef.current = firebase.database().ref(`chat/${userKey}`);

  // Check if chatRef.current is null
  if (chatRef.current === null) {
    const userKey2 = `${otherUserRegistrationNumber}${currentUserRegistrationNumber}`;
    chatRef.current = firebase.database().ref(`chat/${userKey2}`);
  }

    chatRef.current.on('value', snapshot => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();
        const chatMessages = Object.keys(chatData).map(key => ({
          _id: key,
          text: chatData[key].m,
          createdAt: chatData[key].t,
          sender: chatData[key].s,
        }));
        setMessages(chatMessages);
        if (chatMessages.length > 0) {
          oldestMessageIdRef.current = chatMessages[0]._id;
        }
      }
    });

    const otherUserRef = firebase.database().ref(`users/${otherUserRegistrationNumber}`);
    otherUserRef.on('value', snapshot => {
      if (snapshot.exists()) {
        const otherUserData = snapshot.val();
        setOtherUserName(otherUserData.name);
        setOtherUserPic(otherUserData.profilepic);
      }
    });

    return () => {
      chatRef.current.off('value');
      otherUserRef.off('value');
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        s: currentUserRegistrationNumber,
        m: inputText.trim(),
        t: new Date().toISOString(),
      };
      chatRef.current.push(newMessage);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => {
    const isSentByCurrentUser = item.sender === currentUserRegistrationNumber;

    return (
      <View
        style={[
          styles.messageContainer,
          isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.senttext}>{item.text}</Text>
        <Text style={styles.timestamp}>{formatMessageTimestamp(item.createdAt)}</Text>
      </View>
    );
  };

  const formatMessageTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const fetchPreviousMessages = () => {
    if (oldestMessageIdRef.current) {
      chatRef.current
        .orderByKey()
        .endAt(oldestMessageIdRef.current)
        .limitToLast(11)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            const chatData = snapshot.val();
            const chatMessages = Object.keys(chatData)
              .reverse()
              .map(key => ({
                _id: key,
                text: chatData[key].m,
                createdAt: chatData[key].t,
                sender: chatData[key].s,
              }));
            chatMessages.pop(); // Remove the duplicated message
            setMessages(prevMessages => [...chatMessages, ...prevMessages]);
            if (chatMessages.length > 0) {
              oldestMessageIdRef.current = chatMessages[0]._id;
            }
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.otherUserName}>{otherUserName || 'Loading...'}</Text>
      <Image source={{ uri: otherUserPic }} style={styles.hprofilePic} />
      <FlatList
        style={styles.messagesContainer}
        data={messages.reverse()} // Reverse the order of messages
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
        inverted={true}
        onEndReached={fetchPreviousMessages}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Type a message"
          placeholderTextColor="gray"
        />
        <TouchableOpacity>
          <Icon name="paperclip" size={24} color="white" style={styles.attach} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.send}>
          <Text style={styles.send} onPress={handleSend}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Chat = ({ navigation }) => {
  // const route = useRoute();
  // const { otherUserRegistrationNumber } = route.params;

  return (
    <View style={styles.containerscreens}>
      <ChatHeader navigation={navigation} profileName={otherUserRegistrationNumber} />
      <ChatScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 4,
    padding: 8,
    borderRadius: 20,
    maxWidth: '80%',
  },
  sentMessage: {
    paddingRight: 17,
    paddingLeft: 17,
    color: 'white',
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fb3768',
  },
  receivedMessage: {
    color: 'white',
    backgroundColor: '#0d0d0d',
    alignSelf: 'flex-start',
    // backgroundColor: '#FFFFFF',
  },
  timestamp: {
    fontSize: 10,
    color: 'black',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#1a1a1a',
  },
  senttext: {
    color: 'white',
  },
  send: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  placeholderText: {
    color: 'gray',
  },
  attach: {
    marginLeft: 7,
    marginRight: 17,
  },
  containerscreens: {
    flex: 1,
    backgroundColor: 'white',
  },
  otherUserName: {
    position: 'absolute',
    bottom: 777,
    left: 80,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    // marginBottom: 16,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    position: 'absolute',
    bottom: 774,
    left: 44,
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

export default Chat;
