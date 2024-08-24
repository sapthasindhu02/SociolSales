import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TouchableOpacity, View } from "react-native";
import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberSchemaType, usePhoneNumberSchema } from '@/app/utils/login/schemas';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { resendOTPCode, sendVerification } from '@/app/utils/login/otpVerification';
import { useRef } from 'react';
import { LoginModelProps } from '../utils/types';
import Snackbar from 'react-native-snackbar';
import { ToastMessage } from '../utils/UI';

export const LoginModel = React.memo<LoginModelProps>(({navigation,setVerificationId}) => {
    const schemaToUse = usePhoneNumberSchema();
    const { control, handleSubmit, formState, watch, setValue } = useForm<phoneNumberSchemaType>({
        resolver: zodResolver(schemaToUse),
        defaultValues: {
            phoneNumber: '',
            countryCode:'US',
        }
        });
    const {errors} = formState;
    const countryCode = watch('countryCode');
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);
    
    const onSubmit = useCallback(async (data:phoneNumberSchemaType) => {
      const {phoneNumber} = data;
      try{
      const otpSent = await sendVerification(phoneNumber,recaptchaVerifier.current);
      if (otpSent) {
        await setVerificationId(otpSent);
        navigation.navigate('OTP',{phoneNumber});
        ToastMessage('OPT Sent!','orange');
      } else {
        await resendOTPCode(phoneNumber);
        ToastMessage('OPT Resent!','orange');
      }
      }
      catch(error){
        ToastMessage('Internal Server Error. Please try again later','Red');
      }
      
    },[navigation]);

    return (
    <View>
        <Text>Login</Text>
        <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCountryNameButton
        onSelect={(country) => setValue('countryCode', country.cca2)}
      />
      {errors.countryCode && <Text style={{ color: 'red' }}>{errors.countryCode.message}</Text>}
        <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <PhoneInput
                    layout="first"
                    onChangeFormattedText={onChange}
                    withDarkTheme
                    withShadow placeholder='Enter phone number' onBlur={onBlur} value={value} />)}
        />
         {errors.phoneNumber && <Text style={{ color: 'red' }}>{errors.phoneNumber.message}</Text>}
        <Button onPress={handleSubmit(onSubmit)} title="Send OTP"/>
        <Text>New User ?  
            <TouchableOpacity>
                    <Text style={{ color: 'blue' }}>Signup</Text>
            </TouchableOpacity>
        </Text>
        <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
      />
    </View>);
});