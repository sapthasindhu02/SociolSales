import { CountryCode, parsePhoneNumber } from 'libphonenumber-js/min';

export const validatePhoneNumber = (phoneNumber:string,countryCode:string) => {
  if (!phoneNumber) return false;
  try {
    const result = parsePhoneNumber(phoneNumber,countryCode as CountryCode);
    return result.isValid();
  } catch (e) {
    throw e;
  }
};
