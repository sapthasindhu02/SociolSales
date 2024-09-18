import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Login: undefined;
    OTP: { phoneNumber: string };
    HomeScreen: undefined;
    PhoneScreen: undefined;
    SareesArrangement: undefined;
};

type ScreenProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};

export interface OTPModelProps extends ScreenProps<'OTP'> {
    verificationId: string;
}
export interface LoginModelProps extends ScreenProps<'Login'> {
    setVerificationId: any;
}
export interface HomeScreenProps extends ScreenProps<'HomeScreen'> { }
export interface SareesArrangementProps extends ScreenProps<'SareesArrangement'> { }
export interface ProfileScreenProps extends ScreenProps<'PhoneScreen'> { }