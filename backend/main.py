from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from tts import TTS
from quiz import get_quiz_as_json
from summarization import summarize_text_as_json

app = FastAPI()
tts_instance = TTS()

@app.post("/tts/")
async def speak(text: str, dest_lang: str = "en", translate: bool = False, voice_id: int = 0, speed: int = 150):
    if not text:
        raise HTTPException(status_code=400, detail="Text must not be empty.")
    
    # Translate text if needed
    if translate:
        text = tts_instance.translate_text(text, dest_lang)
    
    # Check if the destination language is supported
    if dest_lang not in TTS.SUPPORTED_LANGUAGES:
        raise HTTPException(status_code=400, detail="Unsupported language.")

    # Generate speech from text in memory
    audio_io = tts_instance.generate_speech(text, voice_id, speed)

    return StreamingResponse(audio_io, media_type='audio/wav')

@app.get("/tts/voices/")
async def get_voices():
    voices = tts_instance.list_voices()
    return {"voices": voices}

@app.post("/stt")
async def to_text():
    # implement
    output_text = ''
    return output_text

@app.post("/summarize/")
async def summarize(text: str, n: int = 3):
    if not text:
        raise HTTPException(status_code=400, detail="Text must not be empty.")
    
    # Generate the summary as JSON
    summary_json = summarize_text_as_json(text, n)

    # Return the JSON response
    return JSONResponse(content=summary_json)

@app.post("/quizmaker/")
async def quiz(text: str, num_questions: int = 3):
    quiz_json = get_quiz_as_json(text, num_questions)
    return JSONResponse(content=quiz_json)