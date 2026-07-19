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
      aria-label="Toggle voice chat"
    >
      {isRecording ? (
        <div className="mic-waveform">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mic-icon">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      )}
    </button>
  );
}
