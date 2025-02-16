import { Alert, StyleSheet, Text,View , Pressable, TextInput, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth'

const Login = ({navigation}) => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storeUser = await AsyncStorage.getItem("user");
            if(storeUser) {
                navigation.replace("Listing")
            }
        }
        checkLoginStatus();
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('All fields are required!');
            return;
        }
        try{
            const getAuthInstance = getAuth()
            const userLoginDetails = await signInWithEmailAndPassword(getAuthInstance, email, password)
            await AsyncStorage.setItem("user", JSON.stringify(userLoginDetails.user))
            setemail()
            setpassword()
            navigation.replace("Listing")
        } catch(error){
            Alert.alert("Failed To Login", error.message)
        } 
    }

  return (
   <SafeAreaView style={styles.container}>

    <Text style={styles.heading}>Login</Text>

    <View style={styles.loginContainer}>
    <Text style={styles.inputHead}>Email :</Text>
    <TextInput 
    value={email}
    onChangeText={setemail}
    keyboardType='email'
    style={styles.inputBox}/>

    <Text style={styles.inputHead}>Password :</Text>
    <TextInput
    value={password}
    onChangeText={setpassword}
    secureTextEntry
    style={styles.inputBox}/>
    </View>

    <View style={styles.btnBox}>
    <Pressable
        style={[styles.btn,{backgroundColor:"#05a300"}]}
        onPress={handleLogin}>
        <Text style={[styles.btnText,{color:"white"}]}>Login</Text>
    </Pressable>

    <Pressable
        style={[styles.btn,{backgroundColor:"#6a6b6a"}]}
        onPress={() => navigation.navigate("Register")}>
        <Text style={[styles.btnText,{color:"white"}]}>Register</Text>
    </Pressable>
    </View>

   </SafeAreaView>
  )
}

export default Login

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
        fontWeight:500
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
})