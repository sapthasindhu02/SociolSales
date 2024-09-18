
const service = 'transcribe';
const host = `transcribestreaming.${process.env.REGION}.amazonaws.com:8443`;
const endpoint = `wss://${host}/stream-transcription-websocket`;
const canonicalHeaders = `host:${host}\n`;

export {service,host,endpoint,canonicalHeaders}