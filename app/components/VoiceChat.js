import { useState, useEffect, useRef } from 'react';

export default function VoiceChat({ onTranscript, isAiSpeaking, aiMessage, onAiSpeechEnd }) {
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const playElevenLabsVoice = async (text) => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const cleanMessage = text.replace(/[\*\#\_\`]/g, '');
        const url = `/api/tts?text=${encodeURIComponent(cleanMessage)}`;
        
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          if (onAiSpeechEnd) onAiSpeechEnd();
        };

        // The browser will automatically stream this! Zero delay!
        await audio.play();
      } catch (err) {
        console.error("ElevenLabs playback error:", err);
        if (onAiSpeechEnd) onAiSpeechEnd();
      }
    };

    if (isAiSpeaking && aiMessage) {
      playElevenLabsVoice(aiMessage);
    } else if (!isAiSpeaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    return () => {
      active = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isAiSpeaking, aiMessage]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (onAiSpeechEnd) onAiSpeechEnd();
      
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  if (!speechSupported) return null;

  return (
    <button 
      className={`mic-btn ${isRecording ? 'recording' : ''}`}
      onClick={toggleRecording}
      title={isRecording ? "Stop Listening" : "Speak to Tutor"}
    >
      {isRecording ? "🔴" : "🎙️"}
    </button>
  );
}
