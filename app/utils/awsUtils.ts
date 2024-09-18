import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';
import CryptoJS from 'crypto-js';
import {askAsync,AUDIO_RECORDING} from 'expo-permissions';

export const formatDate = (date: Date): string => date.toISOString().replace(/[:\-]|\.\d{3}/g, '');
export const getDatestamp = (date: string): string => date.slice(0, 8);

export const createHash = async (data: string): Promise<string> => {
    return await digestStringAsync(CryptoDigestAlgorithm.SHA256, data);
};

// Function to create HMAC
export const createHmac = (key: string, data: string): string => {
    const hmac = CryptoJS.HmacSHA256(data, key);
    return hmac.toString(CryptoJS.enc.Hex);
};

export const requestAudioPermissions = async (): Promise<void> => {
    const { status } = await askAsync(AUDIO_RECORDING);
    if (status !== 'granted') {
      throw new Error('Audio recording permission is required');
    }
  };
  