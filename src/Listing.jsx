import {StyleSheet, Text, View, SafeAreaView, Pressable, ActivityIndicator, RefreshControl, Alert, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../firebaseConfig';
import axios from 'axios';

const Listing = ({navigation}) => {

  const [posts, setposts] = useState([]) //Store Api data
  const [page, setpage] = useState(1) //Pagination control
  const [loading, setloading] = useState(false) //Infinite scroll
  const [refreshing, setrefreshing] = useState(false) //Pull to refresh

  //Fetch data immediately when component mounts
  useEffect(()=>{
    fetchPosts(true)
  }, [])

  //Fetch data when the page changes
  useEffect(()=>{
    fetchPosts()
  }, [page])

  //Fetch post function 
  const fetchPosts =async (isRefreshing = false) => {

    if(loading && !isRefreshing) return; // Prevent duplicate request

    setloading(true)
    try{
      //Fetch post
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${isRefreshing ? 1 : page}`)
      setposts(isRefreshing ? response.data : [...posts, ...response.data]) // set post
      //console.log(response)
    }catch(error){
      Alert.alert("Server Error", error.message)
    }
    setloading(false)
    setrefreshing(false)
  }

  //Refresh feature
  const handleRefresh = async () => {
    setrefreshing(true)
    setpage(1)
    await fetchPosts(true)
  }

  //Infinite scroll feature
  const handelEndReached = () => {
    if(!loading) {
      setpage(prevPage => prevPage + 1)
    }
  }

  //log out feature
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await auth.signOut();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.BtnBox}>
      <Pressable onPress={handleLogout} style={styles.logOutBtn}>
        <Text style={styles.logOutText}>Log Out</Text>
      </Pressable>
      </View>

      <FlatList
      style={styles.listBox}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <Pressable onPress={() => navigation.navigate("Details", {postId: item.id})} style={styles.listItem}>

          <View style={styles.listDetails}>
          <Image source={{uri:`https://picsum.photos/200?random=${item.id}`}} style={styles.listImage}/>
          <Text style={styles.listTitle}>{item.title.toUpperCase()}</Text>
          </View>

          <Text numberOfLines={2} style={styles.listBody}>{item.body.replace(/\n/g, '. ')}</Text>
          
        </Pressable>
      )}
      onEndReached={handelEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="blue" /> : null}
      refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
      
    </SafeAreaView>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container:{
    flex:1,
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
  listBox:{
    paddingHorizontal:15,
    paddingVertical:15
  },
  listItem:{
    backgroundColor:"white",
    marginBottom:15,
    padding:10,
    borderWidth:1,
    borderRadius:10
  },
  listDetails:{
    flexDirection:"row",
    gap:10,
  },
  listImage:{
    width:100,
    height:100,
    borderWidth:2,
    borderColor:"red"
  },
  listTitle:{
    fontWeight:700,
    fontSize:15,
    textAlign:"auto",
    width:230,
  },
  listBody:{
    width:"100%",
    textAlign:"left",
    fontWeight:500,
    marginTop:10,
    color:"#2b2b2a"
  }
});
