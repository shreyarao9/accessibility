// src/components/TextToTranslate.jsx

import React, { useState } from 'react';
import 'https://unpkg.com/tailwindcss@0.3.0/dist/tailwind.min.css'; // Tailwind CSS can be imported in index.html

const TextToTranslate = () => {
    const [selectedVoice, setSelectedVoice] = useState('Microsoft David');
    const [speed, setSpeed] = useState('1x');

    const handleVoiceChange = (event) => {
        setSelectedVoice(event.target.value);
    };

    const handleSpeedChange = () => {
        const newSpeed = speed === '1x' ? '1.5x' : speed === '1.5x' ? '0.5x' : '1x';
        setSpeed(newSpeed);
    };

    return (
        <div id="wrapper" className="flex h-screen bg-grey-lightest sm:flex-col md:flex-row font-light w-full">
            <div id="sidebar" className="bg-orange-darker md:w-64 overflow-y-scroll sm:w-screen">
                <header className="flex justify-between items-center border-b border-orange-darkest pt-8 pb-8 pl-6 pr-6">
                    <div id="logo">
                        <a href="#" className="no-underline text-white md:text-2xl sm:text-4xl font-bold">
                            <img src="#" width="120" alt="Logo" />
                            Text-to-translate
                        </a>
                    </div>
                    <div id="collapse" className="text-white border border-white p-2 h-8 rounded">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                </header>
                <div id="text-to-speech" className="text-white p-4">
                    <h2 className="text-lg font-bold">Text to Speech</h2>

                    <label htmlFor="voice-select" className="block mt-4">Select Voice:</label>
                    <select id="voice-select" value={selectedVoice} onChange={handleVoiceChange} className="block w-full mt-1 mb-4">
                        <option value="Microsoft David">Microsoft David</option>
                        <option value="Microsoft Zara">Microsoft Zara</option>
                    </select>

                    <label htmlFor="speed-control" className="block mt-4">Speed Control:</label>
                    <button id="speed-control" className="block w-full mt-1 mb-4" onClick={handleSpeedChange}>
                        {speed}
                    </button>

                    <label htmlFor="language-select" className="block mt-4">Translate To:</label>
                    <select id="language-select" className="block w-full mt-1 mb-4">
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="kannada">Kannada</option>
                    </select>

                    <button className="generate-button block w-full mt-4 bg-orange-500 text-white py-2 rounded">
                        Generate
                    </button>
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
