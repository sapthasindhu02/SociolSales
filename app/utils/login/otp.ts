import { getAuth, PhoneAuthProvider } from "firebase/auth";
import { phoneNumberSchemaType } from "./schemas";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export const sendVerification = async (phoneNumber:string,recaptchaVerifier: FirebaseRecaptchaVerifierModal | null): Promise<string | undefined> => 
  {
    try {
      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA verifier is not initialized.");
      }
      const phoneProvider = new PhoneAuthProvider(getAuth());
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      return verificationId;
    } catch (error) {
      console.error(error);
    }
  };