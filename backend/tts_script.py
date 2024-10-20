import pyttsx3
import tempfile
from googletrans import Translator
from io import BytesIO

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
    def generate_speech_to_file(self, text: str, voice_id: int = 0, speed: int = 150, file_name: str = 'output.wav'):
        try:
            self.engine.setProperty('voice', self.voices[voice_id].id)
            self.engine.setProperty('rate', speed)
            self.engine.save_to_file(text, file_name)  # Save to the provided file name
            self.engine.runAndWait()
        except Exception as e:
            raise Exception(f"Error generating speech: {str(e)}")

    # Generate speech as a BytesIO object (alternative method if needed)
    def generate_speech(self, text: str, voice_id: int = 0, speed: int = 150) -> BytesIO:
        try:
            self.engine.setProperty('voice', self.voices[voice_id].id)
            self.engine.setProperty('rate', speed)

            # Use a temporary file to save the audio
            with tempfile.NamedTemporaryFile(delete=True, suffix='.wav') as temp_audio:
                self.engine.save_to_file(text, temp_audio.name)
                self.engine.runAndWait()

                # Read the generated audio file into BytesIO
                with open(temp_audio.name, 'rb') as f:
                    audio_io = BytesIO(f.read())

            audio_io.seek(0)
            return audio_io
        except Exception as e:
            raise Exception(f"Error generating speech: {str(e)}")
