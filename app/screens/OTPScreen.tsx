import { Controller } from "react-hook-form/dist/controller";
import { useForm } from "react-hook-form/dist/useForm";
import { TextInput, Text, Button, View } from "react-native";
import { OTPSchemaType } from "../utils/login/schemas";
import React, { useCallback, useState } from "react";
import { OTPModelProps } from "../utils/types";
import { resendOTPCode, verifyOTP } from "../utils/login/firebaseAuth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToastMessage } from "../utils/UI";
import { useOTPVerification } from "../hooks/useOTPVerification";

export const OTPModel = React.memo<OTPModelProps>(({navigation,route,verificationId}) => {
    const {phoneNumber} = route.params;
    const { isValid, verifyCode, retry } = useOTPVerification(phoneNumber, verificationId);
    const { control, handleSubmit, watch } = useForm<OTPSchemaType>({
        defaultValues: {
            verificationCode: '',
        }
    });

    const verificationCode = watch("verificationCode", '');

    const handleRetry = useCallback(async () => {
        try{
            await retry();
            ToastMessage('OPT Resent!','orange');
        } catch (error) {
            ToastMessage('Internal Server Error. Try again later','Red');
        }
    },[retry]);

    const onSubmit = useCallback(async (data: OTPSchemaType) => {
        const { verificationCode } = data;
        const isVerified:boolean = await verifyCode(verificationCode);
        if(isVerified) {
            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            })
        }
    },[navigation,verifyCode]);

    const isSubmitEnabled = verificationCode?.length === 4;

    return (
        <View>
            <Text>Enter OTP</Text>
            <Controller
                name="verificationCode"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onChange={onChange}
                        placeholder='XXXX' onBlur={onBlur} maxLength={4} value={value} keyboardType="phone-pad"/>)}
            />
            <TouchableOpacity
                onPress={handleRetry}
                disabled={isValid}
            >
                <Text style={{ color: isValid ? 'gray' : 'blue' }}>
                    Retry
                </Text>
            </TouchableOpacity>
            <Button onPress={handleSubmit(onSubmit)}   title="Submit" disabled={!isSubmitEnabled} />
        </View>);//put all the styling into a different file later
});