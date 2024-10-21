import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def generate_prompt_as_json(prompt):

    genai.configure(api_key=os.getenv('API_KEY'))

    # Create the model
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel('gemini-1.5-flash')

    """ 
    chat_session = model.start_chat(
        history=[
        ]
    ) """

    response = model.generate_content("Generate Only a mermaid.js prompt without explanation for creating diagrams based on the following text:\n\""+prompt+"\"")

    output = response.text.replace('`','')
    output = output.replace('mermaid','')
    output_arr = output.split('\n')
    return {"content": output_arr}
