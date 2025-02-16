import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth'

const Register = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPass) {
        Alert.alert('All fields are required!');
        return;
    }
    if(password != confirmPass){
        Alert.alert("Error", "Confirm Password does not match with Password")
        return;
    }
    try{
        const getAuthInstance = getAuth()
        await createUserWithEmailAndPassword(getAuthInstance, email, password)
        Alert.alert("Sucessed","Registration Done")
        navigation.navigate("Login")
        setemail('')
        setpassword('')
        setconfirmPass('')
    }catch (error) {
        Alert.alert("Ragistration Failed", error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <View style={styles.loginContainer}>
      <Text style={styles.inputHead}>Email:</Text>
      <TextInput 
      value={email} 
      onChangeText={setemail} 
      keyboardType='email'
      style={styles.inputBox} />

      <Text style={styles.inputHead}>Password:</Text>
      <TextInput 
      value={password} 
      onChangeText={setpassword} 
      secureTextEntry
      style={styles.inputBox} />

      <Text style={styles.inputHead}>Confirm Password:</Text>
      <TextInput
        value={confirmPass}
        onChangeText={setconfirmPass}
        secureTextEntry
        style={styles.inputBox}/>
      </View>

      <View style={styles.btnBox}>
      <Pressable 
      style={[styles.btn,{backgroundColor:"#05a300"}]}
      onPress={handleRegister}>
        <Text style={[styles.btnText,{color:"white"}]}>Register</Text>
      </Pressable>

      <Pressable 
      style={[styles.btn,{backgroundColor:"#6a6b6a"}]}
      onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.btnText,{color:"white"}]}>Login</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:20,
        gap:10,
        backgroundColor:"#c7c7c7"
    },
    heading:{
        fontSize:30,
        fontWeight:800,
        textAlign:"center",
        marginBottom:20
    },
    loginContainer:{
        justifyContent:"center",
        gap:10,
        paddingHorizontal:20
    },
    inputHead:{
        fontSize:18,
        fontWeight:600
    },
    inputBox:{
        borderBottomWidth:2,
        borderBottomColor:"black",
        paddingHorizontal:20,
        fontSize:17,
        fontWeight:500,
    },
    btnBox:{
        flexDirection:"row",
        gap:50,
        height:70,
        alignItems:"center",
        justifyContent:"center"
    },
    btn:{
        backgroundColor:"red",
        width:80,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:7
    },
    btnText:{
        fontWeight:600,
        fontSize:17
    }
});
