
import { Audio } from 'expo-av';
import { requestAudioPermissions } from '../../../utils/awsUtils';
import { setupWebSocket } from './webSocket';
import { setupAudioRecording, stopAudioRecording } from './audioRecording';

export const startTranscription = async () => {
  try {
    await requestAudioPermissions();

    const client = await setupWebSocket();
    const recording = await setupAudioRecording();

    recording.setOnRecordingStatusUpdate(async (status: any) => {
      if (status.isRecording) {
        const audioData = await recording.getURI() || '';
        const audioBuffer = await fetch(audioData).then(res => res.arrayBuffer());
        // Send the audio data as binary to the WebSocket
        client.send(new Uint8Array(audioBuffer));
      }
    });

    return { client, recording };
  } catch (error) {
    console.error('Error starting transcription:', error);
    return {};
  }
};

export const stopTranscription = async (client: WebSocket, recording: Audio.Recording) => {
  try {
    await stopAudioRecording(recording);
    if (client.readyState === client.OPEN) {
      client.close();
    }
  } catch (error) {
    console.error('Error stopping transcription:', error);
  }
};
