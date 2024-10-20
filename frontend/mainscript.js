const axios = require('axios');

async function textToSpeech() {
    const text = "Hello, this is a test.";
    const destLang = "en"; // Destination language (default is English)
    const translate = false; // Set to true if you want to translate the text
    const voiceId = 0; // Specify the voice ID if needed
    const speed = 150; // Speech speed

    try {
        const response = await axios.post('http://localhost:8000/tts/', {
            text: text,
            dest_lang: destLang,
            translate: translate,
            voice_id: voiceId,
            speed: speed
        }, {
            responseType: 'blob' // Important for audio response
        });

        // Create a URL for the audio blob
        const audioUrl = window.URL.createObjectURL(new Blob([response.data]));
        
        // Create an audio element to play the audio
        const audio = new Audio(audioUrl);
        audio.play();
    } catch (error) {
        console.error('Error calling TTS endpoint:', error);
    }
}

// Call the function to convert text to speech
textToSpeech();
