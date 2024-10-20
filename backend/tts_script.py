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

    def translate_text(self, text: str, dest_lang: str) -> str:
        translated = self.translator.translate(text, dest=dest_lang)
        return translated.text

    def list_voices(self):
        return {i: voice.name for i, voice in enumerate(self.voices)}

    def generate_speech(self, text: str, voice_id: int = 0, speed: int = 150) -> BytesIO:
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
