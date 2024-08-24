import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Login: undefined;
    OTP: { phoneNumber: string };
    HomeScreen: undefined;
  };

type OTPModelNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;
type OTPModelRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type LoginModelNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginModelRouteProp = RouteProp<RootStackParamList, 'Login'>;

export interface OTPModelProps {
    navigation: OTPModelNavigationProp;
    route: OTPModelRouteProp;
    verificationId: string;
}

export interface LoginModelProps {
    navigation: LoginModelNavigationProp;
    route: LoginModelRouteProp;
    setVerificationId: any;
}