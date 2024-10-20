// src/App.js
import React from 'react';
import TextToSpeech from './components/TextToSpeech';

const App = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Accessibility Tool</h1>
                <TextToSpeech />
                {/* Add other components here */}
            </div>
        </div>
    );
};

export default App;
