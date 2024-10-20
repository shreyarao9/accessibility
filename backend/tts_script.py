import pyttsx3
from googletrans import Translator

class TTS:
    SUPPORTED_LANGUAGES = {
        "en": "English",
        "hi": "Hindi",
        "kn": "Kannada",
        # Add more languages as needed
    }

    def __init__(self):
        self.translator = Translator()
        self.engine = pyttsx3.init()
        self.voices = self.engine.getProperty('voices')
        self.output_file = 'output.wav'  # Permanent file name

    # Method to translate text into the desired language
    def translate_text(self, text: str, dest_lang: str) -> str:
        try:
            translated = self.translator.translate(text, dest=dest_lang)
            return translated.text
        except Exception as e:
            raise Exception(f"Translation error: {str(e)}")

    # Method to list available voices
    def list_voices(self):
        return {i: voice.name for i, voice in enumerate(self.voices)}

    # Generate speech and save it directly to a file
    def generate_speech_to_file(self, text: str, voice_id: int = 0, speed: int = 150):
        try:
            self.engine.setProperty('voice', self.voices[voice_id].id)
            self.engine.setProperty('rate', speed)
            self.engine.save_to_file(text, self.output_file)  # Save to the permanent file
            self.engine.runAndWait()
        except Exception as e:
            raise Exception(f"Error generating speech: {str(e)}")
