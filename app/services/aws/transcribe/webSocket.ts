import awsConfig from '../../../config/config';
import { canonicalHeaders, endpoint, service } from './constants';
import { createHash, createHmac, formatDate, getDatestamp } from '../../../utils/awsUtils';

const getSignedUrl = async () => {

  const { region, apiKey, secretAccessKey } = awsConfig;

  const now = new Date();
  const date = formatDate(now);
  const datestamp = getDatestamp(date);
  const amzDate = `${datestamp}T${date.slice(9, 15)}Z`;
  const credentialScope = `${datestamp}/${region}/${service}/aws4_request`;

  const canonicalQuerystring = `X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${apiKey}%2F${credentialScope}&X-Amz-Date=${amzDate}&X-Amz-Expires=300&X-Amz-SignedHeaders=host`;
  const payloadHash = await createHash('');
  const canonicalRequest = `GET\n/stream-transcription-websocket\n${canonicalQuerystring}\n${canonicalHeaders}\nhost\n${payloadHash}`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${await createHash(canonicalRequest)}`;

  const signingKey = createHmac(`AWS4${secretAccessKey}`, `${datestamp}${region}${service}aws4_request`);
  const signature = createHmac(signingKey, stringToSign);

  const signedUrl = `${endpoint}?${canonicalQuerystring}&X-Amz-Signature=${signature}`;

  return signedUrl;
};

export const setupWebSocket = async (): Promise<WebSocket> => {
  const signedUrl = await getSignedUrl();
  const client = new WebSocket(signedUrl);

  client.onopen = () => console.log('WebSocket connection established');
  client.onclose = () => console.log('WebSocket connection closed');
  client.onerror = (error: any) => {
    console.error('WebSocket Error:', error);
    // Optionally, add reconnection logic here
  };
  return client;
};

export const getTranscription = async (client: WebSocket) => {
  let transcriptText;
  client.onmessage = (event) => {
    const transcriptionResult = JSON.parse(event.data);
    transcriptText = transcriptionResult.Transcript.Results.map((result: any) => result.Alternatives[0].Transcript).join(' ');
    console.log('Transcription result:', transcriptionResult);
  };
  return transcriptText;
}
