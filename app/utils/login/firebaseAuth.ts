import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { phoneNumberSchemaType } from "./schemas";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

let captchaVerifier:FirebaseRecaptchaVerifierModal | null;
export const sendVerification = async (phoneNumber:string,recaptchaVerifier: FirebaseRecaptchaVerifierModal | null): Promise<string | undefined> => 
  {
    try {
      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA verifier is not initialized.");
      }
      captchaVerifier = recaptchaVerifier;
      const phoneProvider = new PhoneAuthProvider(getAuth());
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      return verificationId;
    } catch (error) {
      console.error(error);
    }
  };

export const verifyOTP = async (sentOtp:string,userInput:string):Promise<boolean> => {
  if (!sentOtp) {
    console.error("Verification ID is not set.");
    return false;
  }
  try {
  const credential = PhoneAuthProvider.credential(sentOtp, userInput);
    const userCredential = await signInWithCredential(getAuth(), credential);
    console.log('User signed in successfully:', userCredential.user);
    return true;
  } catch (error) {
    console.error("Error confirming code:", error);
    return false;
  }
};

export const resendOTPCode = async (phoneNumber:string) => {
  try {
    const newVerificationId = await sendVerification(phoneNumber, captchaVerifier);
    console.log("New verification code sent:", newVerificationId);
    // Update the UI or state to prompt the user to enter the new OTP
  } catch (error) {
    console.error("Error resending verification code:", error);
    throw error;
  }
};