import { Controller, useForm } from 'react-hook-form';
import { Button, Text } from "react-native";
import PhoneInput from 'react-native-phone-input'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { phoneNumberSchemaType, usePhoneNumberSchema } from './utils/Schemas';
export const LoginModel = () => {
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

    const onSubmit = (data:phoneNumberSchemaType) => {
        sendOTP(data);
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
    </div>);
};