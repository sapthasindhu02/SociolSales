import React, { useCallback, useState } from "react";
import { HomeScreenProps } from "../utils/types";
import { Button, View, Text } from "react-native";
import { startTranscription, stopTranscription } from "../services/aws/transcribe/transcription";
import { getTranscription } from "../services/aws/transcribe/webSocket";
import { handleTransriptionData } from "../services/postgres/utils";

export const HomeScreen = React.memo<HomeScreenProps>(({ navigation, route }) => {
    const [transcription, setTranscription] = useState<string>('');  // State to store the transcription
  const [audio, setRecording] = useState<any>(null);            // State to store the audio recording object
  const [webSocketClient, setClient] = useState<any>(null); 

  
    const handleStartTranscription = async (event: any) => {
        const { client, recording } = await startTranscription();
    setClient(client);
    setRecording(recording);
    const transcriptText = getTranscription(webSocketClient);
    setTranscription(prevTranscription => `${prevTranscription} ${transcriptText}`);
    handleTransriptionData(transcription);
    //openCamera();
    }

    const handleStopTranscription = async () => {
        if (webSocketClient && audio) {
          await stopTranscription(webSocketClient, audio);
          setClient(null);
          setRecording(null);
        }
      };
      const handleShowSarees = useCallback(async () => {
          navigation.navigate('SareesArrangement');
      },[navigation]);

    return (<View>
        <Text>
        {transcription || "Start speaking to see the transcription."}
      </Text>
      <Button title="Add Stock" onPress={handleStartTranscription} />
      <Button title="Stop Transcription" onPress={handleStopTranscription} />
      <Button title="Sarees Arrangement" onPress={handleShowSarees}/>
// below is work in progress      
      <Button title="Add Same Stock " onPress={handleStartTranscription} />
    </View>);
});