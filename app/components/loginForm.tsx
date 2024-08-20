import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TouchableOpacity } from "react-native";
import PhoneInput from 'react-native-phone-input'
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberSchemaType, usePhoneNumberSchema } from '@/app/utils/login/schemas';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { sendVerification } from '@/app/utils/login/otp';
import { useRef, useState } from 'react';
export const LoginModel = () => {
    const [uerInputCode, setUerInputCode] = useState();
    const [verificationId, setVerificationId] = useState();
    const schemaToUse = usePhoneNumberSchema();
    const { control, handleSubmit, formState } = useForm<phoneNumberSchemaType>({
        resolver: zodResolver(schemaToUse),
        defaultValues: {
            phoneNumber: '',
            countryCode:'US',
        }
        });
    const {errors} = formState;
    const countryCode = watch('countryCode');
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);
    
    const onSubmit = async (data:phoneNumberSchemaType) => {
      const {phoneNumber} = data;
      const otpSent = await sendVerification(phoneNumber,recaptchaVerifier.current);
      if (otpSent) {
        setVerificationId(otpSent);
      } else {
        console.error("No verification ID received.");
        // Display user-friendly error message or handle as needed
      }
    }

    return (
    <div>
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
    </div>);
};