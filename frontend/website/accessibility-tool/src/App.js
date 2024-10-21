import React, { useState } from 'react';
import SidePane from './components/Sidepane';
import backgroundImage from './images/img1.jpg'; // The small image
import smallimg from './images/img2.jpg'; // The background image
import './App.css';

const App = () => {
    // State to manage selected voice
    const [selectedVoice, setSelectedVoice] = useState('Microsoft David');
    const [fontSize, setFontSize] = useState('16px');
    const [fontColor, setFontColor] = useState('#000000'); // Default color
    const [bgColor, setBgColor] = useState('#FFFFFF'); // Default background color
    const [speed, setSpeed] = useState(1); // Default speed
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    

    const handleVoiceChange = (e) => {
        setSelectedVoice(e.target.value);
    };

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    const handleFontColorChange = (e) => {
        setFontColor(e.target.value);
    };

    const handleBgColorChange = (e) => {
        setBgColor(e.target.value);
    };

    const handleSpeedChange = () => {
        setSpeed((prevSpeed) => {
            if (prevSpeed === 1) return 1.25;
            if (prevSpeed === 1.25) return 1.5;
            if (prevSpeed === 1.5) return 0.5;
            return 1; // Reset to 1x
        });
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleGenerate = () => {
        alert(`Generating with ${selectedVoice}, Speed: ${speed}x, Language: ${selectedLanguage}`);
        // Add your logic for generating here
    };

    return (
        <div className="app-container">
            <SidePane />
            <div 
                className="main-content"
                style={{ backgroundImage: `url(${smallimg})` }}
            >
                <div className="overlay" style={{ fontSize: fontSize, color: fontColor, backgroundColor: bgColor }}>
                    <h1 className="text-3xl font-bold mb-4">Text to Speech</h1>

                    {/* Voice Selection Dropdown */}
                    <label htmlFor="voice-select">Select Voice: </label>
                    <select id="voice-select" value={selectedVoice} onChange={handleVoiceChange}>
                        <option value="Microsoft David">Microsoft David</option>
                        <option value="Microsoft Zara">Microsoft Zara</option>
                    </select>

                    {/* Speed Button */}
                    <button onClick={handleSpeedChange} className="ml-4">
                        Speed: {speed}x
                    </button>

                    {/* Language Selection Dropdown */}
                    <label htmlFor="language-select" className="ml-4">Translate To: </label>
                    <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Kannada">Kannada</option>
                    </select>

                    {/* Generate Button */}
                    <button onClick={handleGenerate} className="ml-4">
                        Generate
                    </button>

                    <p className="mb-4">
                        This application aims to enhance the learning experience for differently-abled students by providing customized content delivery methods.
                        Explore the various features we offer, including text-to-speech, visual aids, and more.
                    </p>

                    <div className="content-section">
                        <h2 className="text-xl font-semibold mt-6">Key Features</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li>Adjustable fonts and spacing for better readability.</li>
                            <li>Text-to-speech functionality for auditory learning.</li>
                            <li>Speech-to-text for easy note-taking.</li>
                            <li>Diagram converter and dictionary API for enhanced understanding.</li>
                        </ul>
                    </div>

                    <div className="small-image-container">
                        <img 
                            src={backgroundImage} 
                            alt="Feature" 
                        />
                    </div>

                    {/* Custom font usage */}
                    <h1 style={{ fontFamily: 'MyCustomFont' }}>This text is using the custom Open Dyslexic font!</h1>

                    {/* Quiz Button */}
                    <button className="quiz-button" onClick={() => alert('Quiz Clicked!')}>
                        Start Quiz
                    </button>

                    {/* Font Size, Color, and Background Color Options for Dyslexia */}
                    <div className="dyslexia-options">
                        <h3>Dyslexia Options:</h3>
                        <label htmlFor="font-size">Font Size: </label>
                        <input 
                            type="number" 
                            id="font-size" 
                            value={parseInt(fontSize)} 
                            onChange={handleFontSizeChange} 
                        />
                        <label htmlFor="font-color">Font Color: </label>
                        <input 
                            type="color" 
                            id="font-color" 
                            value={fontColor} 
                            onChange={handleFontColorChange} 
                        />
                        <label htmlFor="bg-color">Background Color: </label>
                        <input 
                            type="color" 
                            id="bg-color" 
                            value={bgColor} 
                            onChange={handleBgColorChange} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
