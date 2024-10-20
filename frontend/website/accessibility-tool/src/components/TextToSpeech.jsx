// src/components/TextToSpeech.js
import React, { useState } from 'react';
import axios from 'axios';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [voiceId, setVoiceId] = useState(0);
    const [speed, setSpeed] = useState(150);
    const [audioUrl, setAudioUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/tts/', {
                text,
                voice_id: voiceId,
                speed,
            }, { responseType: 'blob' });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setAudioUrl(url);
        } catch (error) {
            console.error('Error generating speech:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Text to Speech</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <textarea
                    className="border p-2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text here"
                    rows="4"
                />
                <div>
                    <label className="block">Voice ID:</label>
                    <input
                        type="number"
                        value={voiceId}
                        onChange={(e) => setVoiceId(e.target.value)}
                        className="border p-2"
                    />
                </div>
                <div>
                    <label className="block">Speed:</label>
                    <input
                        type="number"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Convert to Speech
                </button>
            </form>
            {audioUrl && (
                <audio controls className="mt-4">
                    <source src={audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default TextToSpeech;
