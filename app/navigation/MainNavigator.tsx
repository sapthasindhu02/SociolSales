import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { SareesArrangement } from '../screens/SareesArrangement';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen">
      {(props:any) => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SareesArrangement">
      {(props:any) => <SareesArrangement {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainNavigator;
