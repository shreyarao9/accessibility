import html2canvas from 'html2canvas';
import axios from 'axios';

export const captureAndExtractText = async () => {
    // Capture the screenshot
    const element = document.getElementById('screenshot-area'); // Use the correct selector for your target area
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Convert base64 to blob
    const blob = await fetch(imgData).then(res => res.blob());

    const formData = new FormData();
    formData.append('file', blob, 'screenshot.png');

    try {
        // Send the image to the FastAPI backend
        const response = await axios.post('http://localhost:8000/ocr', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const extractedText = response.data.extracted_text;
        console.log('Extracted Text:', extractedText);
        return extractedText

        // Here you can use the extracted text as initial text for TTS
        // For example:
        // setInitialText(extractedText);

    } catch (error) {
        console.error('Error sending image to backend:', error);
    }
};

// Call this function wherever needed (e.g., after a certain event)