import { useState, useCallback } from 'react';
import { resendOTPCode, verifyOTP } from '../utils/login/firebaseAuth';

export const useOTPVerification = (phoneNumber: string, verificationId: string) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const verifyCode = useCallback(async (verificationCode: string) => {
    const isValidCode = await verifyOTP(verificationId, verificationCode);
    setIsValid(isValidCode);
    return isValidCode;
  }, [verificationId]);

  const retry = useCallback(async () => {
    try {
      await resendOTPCode(phoneNumber);
      setIsValid(false);
    } catch (error) {
      throw error;
    }
  }, [phoneNumber]);

  return { isValid, verifyCode, retry };
};
