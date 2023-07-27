import React ,{useState, useEffect} from 'react';
// import firebase from 'firebase/compat';
import firebase from '../firebase';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
// import LoginScreen from './next'; 
import Siuu from '../components/SI/SIU';
// import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    loginUser = async (email,password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }catch(error){
            alert(error.message);
        }
    }
    return(
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>Login</Text>
            <View style={{marginTop: 40}}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email)=>setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password)=>setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}    
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={()=>loginUser(email,password)}
                style={styles.button}
            >
            
            <Text style={{fontWeight:'bold',fontSize: 22}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>navigate.push('SignIn')}
                style={{marginTop:20}}
            >
            
            <Text style={{fontWeight:'bold',fontSize: 16}}>No account? Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const Verify_final= () =>{
    const [initializing, setInitializing]=useState(true);
    const [user,setUser] = useState();

    function onAuthStateChanged(user){
        setUser(user);
        if(initializing) setInitializing(false);

    }

    useEffect(()=>{
        const subscriber=firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if(initializing) return null;

    if(!user){
        return(
        <Login/>
        );
    }
    
    return(<Siuu/>);
};

export default Verify_final;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alginItems: 'center',
        marginTop: 100,
    },
    textInput:{
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    button:{
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,

    }
})