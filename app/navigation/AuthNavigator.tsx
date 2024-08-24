import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginModel } from '../screens/LoginScreen';
import { OTPModel } from '../screens/OTPScreen';


const Stack = createStackNavigator();

const AuthNavigator = () => {
    const [verificationId, setVerificationId] = useState<string | undefined>();

  return (
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props:any) => <LoginModel {...props} setVerificationId = {setVerificationId} />}
        </Stack.Screen>
        <Stack.Screen name="OTP">
          {(props:any) => <OTPModel {...props} verificationId={verificationId!} />}
        </Stack.Screen>
      </Stack.Navigator>
  );
};

export default AuthNavigator;
