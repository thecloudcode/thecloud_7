import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Contact = ({navigation}) => {
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={37} color="white" />
        </TouchableOpacity>
      <View style={styles.container2}>
       
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../logo.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity >
        <Image source={{ uri: 'https://pbs.twimg.com/profile_images/1676268717574090752/mUX8DnZH_400x400.jpg' }} style={styles.mprofileImage} />
      </TouchableOpacity>
    
      <View style={styles.mlinksanddesignation}>
      <TouchableOpacity>
      <Text style={styles.mtextinsidemenu}>Badal Prasad Singh</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity>
      <Text style={{color:'grey'}}>Founder & CEO</Text>
      </TouchableOpacity>

      <View style={styles.horizontalBar} />
    
      

    <View>
    <TouchableOpacity onPress={()=>Linking.openURL('https://gmail.com/')}style={{flexDirection: 'row',margin: 10}}>
        <Image source={{ uri: 'https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png' }} 
        style={{
          marginTop: 3,
          marginLeft: 7,
          height: 17,
          marginRight: 10,

          width: 22,
        }} />
        <Text style={{color:'white'}}>thecloudcodes@gmail.com</Text>              
    </TouchableOpacity>
    </View>

    <View>
        <Text style={{fontWeight: 'bold', color: '#595959', paddingTop: 37, paddingBottom: 7}}>Follow me</Text>              
    </View>

    <View>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/badalprasadsingh/')}  style={{flexDirection: 'row',margin: 10}}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png' }} style={styles.mlinks} />
        <Text style={styles.socialmediatext}>/badalprasadsingh</Text>              
    </TouchableOpacity>
    </View>

    <View>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ibadartz/')} style={{flexDirection: 'row',margin: 10}}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }} style={styles.mlinks} />
        <Text style={styles.socialmediatext}>@ibadartz</Text>              
    </TouchableOpacity>
    </View>

    <View>
    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/thecloudtweet')} style={{flexDirection: 'row',margin: 10}}>
        <Image source={{ uri: 'https://img.freepik.com/free-icon/twitter_318-788935.jpg' }} style={styles.mlinks} />
        <Text style={styles.socialmediatext}>@thecloudtweet</Text>              
    </TouchableOpacity>
    </View>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 30,
    paddingRight: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 30,

  },
  horizontalBar: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingLeft: 30,
    // height: 20,
    marginVertical: 190,
    borderRadius: 30,
    paddingRight: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    // padding: 30,

  },
  logo: {
    top: 17,
    width: '40%', 
    height: 37,
    alignSelf: 'center',
    marginTop: 20,
  },
  heading:{
    color:'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 17,
  },
  text:{
    color:'white',
    fontSize: 10,
  },
  textcontainer:{
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 37,
    left: 27,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  mprofileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  mlinksanddesignation:{
    // marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mtextinsidemenu: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  mlinks: {
    marginTop: 3,
    marginLeft: 7,
    height: 17,
    marginRight: 10,

    width: 17,
  },
  socialmedialinks:{
    position:'relative',
    top: 70,
    // color: 'white',
  },
  socialmediatext:{
    color: 'white',
    // fontWeight: 'bold',
    // fontWeight: 'bold'
  }
});

export default Contact;
