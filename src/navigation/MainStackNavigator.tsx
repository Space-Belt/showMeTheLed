import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';

const MainStack = createStackNavigator<RootStackParamList>();
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Setting" component={SettingScreen} />
    </MainStack.Navigator>
  );
};
export default MainStackNavigator;
