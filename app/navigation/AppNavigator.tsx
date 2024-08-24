import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Use Switch Navigator for conditional routing
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
 const isAuthenticated: boolean = false; // to be added logic later
  return (
    <NavigationContainer>
        {isAuthenticated ? <MainNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
  );
};

export default AppNavigator;
