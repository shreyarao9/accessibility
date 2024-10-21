import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import 'https://unpkg.com/tailwindcss@0.3.0/dist/tailwind.min.css';

const TextToTranslate = () => {
    const [text, setText] = useState('');
    const [voiceId, setVoiceId] = useState(0);
    const [speed, setSpeed] = useState(150);
    const [audioUrl, setAudioUrl] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Using language codes

    // Function to capture screenshot and extract text
    const captureAndExtractText = async () => {
        const element = document.getElementById('screenshot-area');
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        const blob = await fetch(imgData).then(res => res.blob());

        const formData = new FormData();
        formData.append('file', blob, 'screenshot.png');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ocr`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setText(response.data.extracted_text);
        } catch (error) {
            console.error('Error sending image to backend:', error);
        }
    };

    const handleVoiceChange = (event) => {
        setVoiceId(event.target.value);
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/tts/`, {
                text,
                voice_id: voiceId,
                speed,
                lang: selectedLanguage, // Ensure correct parameter name
            }, { responseType: 'blob' });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setAudioUrl(url);
        } catch (error) {
            console.error('Error generating speech:', error);
            alert('Error generating speech, please try again.'); // User-friendly error message
        }
    };

    useEffect(() => {
        captureAndExtractText();
    }, []);

    return (
        <div id="wrapper" className="flex h-screen bg-grey-lightest sm:flex-col md:flex-row font-light w-full">
            <div id="sidebar" className="bg-orange-darker md:w-64 overflow-y-scroll sm:w-screen">
                <header className="flex justify-between items-center border-b border-orange-darkest pt-8 pb-8 pl-6 pr-6">
                    <div id="logo">
                        <a href="#" className="no-underline text-white md:text-2xl sm:text-4xl font-bold">
                            Text-to-Translate
                        </a>
                    </div>
                </header>
                <div id="text-to-speech" className="text-white p-4">
                    <h2 className="text-lg font-bold">Text to Speech</h2>
                    <textarea
                        className="border p-2 mt-4"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text here"
                        rows="4"
                    />
                    <label htmlFor="voice-select" className="block mt-4">Select Voice:</label>
                    <select id="voice-select" value={voiceId} onChange={handleVoiceChange} className="block w-full mt-1 mb-4">
                        <option value={0}>Microsoft David</option>
                        <option value={1}>Microsoft Zara</option>
                    </select>
                    <label htmlFor="speed-control" className="block mt-4">Speed Control:</label>
                    <input
                        type="number"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="border p-2 block w-full mt-1 mb-4"
                    />
                    <label htmlFor="language-select" className="block mt-4">Translate To:</label>
                    <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange} className="block w-full mt-1 mb-4">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="kn">Kannada</option>
                    </select>
                    <button className="generate-button block w-full mt-4 bg-orange-500 text-white py-2 rounded" onClick={handleSubmit}>
                        Generate
                    </button>
                    {audioUrl && (
                        <audio controls className="mt-4">
                            <source src={audioUrl} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            </div>
            <div className="flex">
                <ul className="flex list-reset text-black">
                    <li className="px-4">
                        <span className="text-sm">
                            <i className="fa fa-comments" aria-hidden="true"></i>
                            Chat
                        </span>
                    </li>
                    <li className="border-l px-4">
                        <span className="text-sm">
                            Log Out
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TextToTranslate;
