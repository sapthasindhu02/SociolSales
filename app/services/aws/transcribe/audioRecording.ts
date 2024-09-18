import { Audio } from 'expo-av';

// Request audio recording permission
const requestAudioPermissions = async () => {
  const { status } = await Audio.requestPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access audio was denied');
  }
};

export const setupAudioRecording = async (): Promise<Audio.Recording> => {
  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
  await recording.startAsync();

  return recording;
};

export const stopAudioRecording = async (recording: Audio.Recording): Promise<void> => {
  await recording.stopAndUnloadAsync();
};
