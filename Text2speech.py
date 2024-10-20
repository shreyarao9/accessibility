import pyttsx3

# Initialize the TTS engine
engine = pyttsx3.init()

# Set properties
engine.setProperty('rate', 150)    # Speed of speech
engine.setProperty('volume', 1)    # Volume level (0.0 to 1.0)

# Get available voices
voices = engine.getProperty('voices')

# Set voice to female (use voices[1] for female, voices[0] for male)
engine.setProperty('voice', voices[0].id)

# Say something
text = "Hello guys, we are currently working on text-to-speech, and it's nice to see the working of it."
engine.say(text)

# Wait until speech is finished
engine.runAndWait()

