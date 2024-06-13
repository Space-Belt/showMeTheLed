import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import HomeScreen from '../screens/HomeScreen';

const MainStack = createStackNavigator<RootStackParamList>();
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};
export default MainStackNavigator;
