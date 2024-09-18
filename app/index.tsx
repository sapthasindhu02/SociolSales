import AWS from 'aws-sdk';
import { Audio } from 'expo-av';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import 'react-native-get-random-values';
import { SafeAreaView, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function Index() {
  return (
    <SafeAreaView>
    <AppNavigator />
  </SafeAreaView>
  );
}
