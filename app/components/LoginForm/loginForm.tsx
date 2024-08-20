import { Controller, useForm } from 'react-hook-form';
import { Button, Text } from "react-native";
import PhoneInput from 'react-native-phone-input'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { phoneNumberSchemaType, usePhoneNumberSchema } from './utils/Schemas';
export const LoginModel = () => {
    const [countryCode, setCountryCode] = useState('US'); // remove this and make it a dropdown
    const schemaToUse = usePhoneNumberSchema();
    const { control, handleSubmit } = useForm<phoneNumberSchemaType>({
        resolver: zodResolver(schemaToUse),
        defaultValues: {
            phoneNumber: '',
            countryCode,
        }
        });
    return (
    <div>
        <Text>Login</Text>
        <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <PhoneInput defaultValue={value}
                    defaultCode={countryCode}
                    layout="first"
                    onChangeFormattedText={onChange}
                    withDarkTheme
                    withShadow placeholder='Enter phone number' onBlur={onBlur} value={value} />)}
        />
        <Button title="Send OTP"/>
        <Text>New User ? <a>Signup</a></Text>
    </div>);
};