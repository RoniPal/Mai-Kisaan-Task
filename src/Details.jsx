import {StyleSheet, Text, View,SafeAreaView,Pressable, Alert, ActivityIndicator, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../firebaseConfig';

const Details = ({route, navigation}) => {

  const {postId} = route.params  //collect post data from listing page 
  const [post, setposts] = useState(null) //set post
  const [loading, setloading] = useState(true) //set loading

  //Immediate function call
  useEffect(() => {
    fetchDetails()
  }, [])

  //Post data fetch function
  const fetchDetails = async () => {
    try{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      setposts(response.data)
      console.log(response.data.body)
    }catch(error){
      Alert.alert("Error", error.message)
    }
    setloading(false)
  }

  //Log out function
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await auth.signOut();
    navigation.navigate('Login');
  };

  //Loading feature untill data fetch
  if (loading) return <ActivityIndicator size="large" color="blue" style={styles.loader} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.BtnBox}>
        <Pressable onPress={handleLogout} style={styles.logOutBtn}>
          <Text style={styles.logOutText}>Log Out</Text>
        </Pressable>
      </View>

      <View style={styles.detailsBox}>
      <Image source={{ uri: `https://picsum.photos/200?random=${post.id}` }} style={styles.image} />
      <Text style={styles.title}>{post.title.toUpperCase()}</Text>
      <Text style={styles.description}>{post.body.replace(/\n/g, '. ')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:20,
    gap:10,
    backgroundColor:"#c7c7c7"
  },
  BtnBox:{
    width:"100%",
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginBottom:10
  },
  logOutBtn:{
    height:30,
    width:100,
    backgroundColor:"#e0372b",
    justifyContent:"center",
    alignItems:"center"
  },
  logOutText:{
    color:"white",
    fontWeight:800,
    fontSize:17
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsBox:{
    paddingHorizontal:15,
    paddingVertical:15,
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:2
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth:2
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center"
  },
  description: {
    fontSize: 16,
    fontWeight:500,
    color:"black",
    textAlign:"justify"
  },
});
