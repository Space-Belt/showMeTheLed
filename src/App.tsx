/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';

export type RootStackParamList = {
  Home: undefined;
  MainStack: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{}}>
        <RootStack.Screen name="MainStack" component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
