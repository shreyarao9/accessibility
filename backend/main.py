from fastapi import FastAPI, HTTPException # type: ignore
from fastapi.responses import FileResponse, JSONResponse # type: ignore
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from .tts_script import TTS
from .quiz import get_quiz_as_json
from .summarization import summarize_text_as_json

app = FastAPI()
tts_instance = TTS()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

output_file_path = "output.wav"

class TTSRequest(BaseModel):
    text: str
    voice_id: int = 0
    speed: int = 150
    lang: str = "en"
    translate: bool = False

@app.post("/tts/")
async def speak(request: TTSRequest):
    if request.lang != "en":
        try:
            request.text = tts_instance.translate_text(request.text, request.lang)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    # Generate speech and save it to a permanent file
    try:
        tts_instance.generate_speech_to_file(request.text, request.voice_id, request.speed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Check if the output file exists
    if not os.path.exists(tts_instance.output_file):
        raise HTTPException(status_code=500, detail="Error generating audio file.")

    return FileResponse(tts_instance.output_file, media_type='audio/wav')

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