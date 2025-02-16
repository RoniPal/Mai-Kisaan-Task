import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Login';
import Register from './src/Register';
import Listing from './src/Listing';
import Details from './src/Details';

const Stack = createStackNavigator()

const App = () => {

  const [isLoginAlready, setisLoginAlready] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("user")
      setisLoginAlready(user ? true : false)
    }
    checkLogin()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= {isLoginAlready ? 'Listing' : 'Login'} screenOptions={{headerShown:false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Listing' component={Listing} />
        <Stack.Screen name='Details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})