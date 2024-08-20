import { useMemo } from 'react';
import { z } from 'zod';
import { validatePhoneNumber } from './validations';

const phoneNumberSchema = z.object({
    countryCode: z.string().min(2, "Country code is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits long"),
  }).superRefine((data,context) => {
    const countryCode = data.countryCode;
    const phoneNumber = data.phoneNumber;
    try{
    const isValid = validatePhoneNumber(phoneNumber, countryCode);
    if (!isValid) {
      // Add an issue if the phone number is not valid
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
        path: ["phoneNumber"], // Indicate the specific field with the issue
      });
    }
  } catch (error) {
    // Handle any exceptions that occur during validation
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "An error occurred while validating the phone number",
      path: ["phoneNumber"], // Indicate the specific field with the issue
    });
  }
  });
export const usePhoneNumberSchema = () => {
  return useMemo(() => phoneNumberSchema, []);
};
export type phoneNumberSchemaType = z.infer<typeof phoneNumberSchema>;

