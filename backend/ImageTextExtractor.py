import cv2
import pytesseract
import os
import nltk
from nltk.tokenize import word_tokenize
from transformers import pipeline
import networkx as nx
import matplotlib.pyplot as plt

# Set up OCR and NLP tools
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Ensure this path is correct for your system

# Optional: Uncomment the next line if you want to use NER
# nlp = pipeline("ner", model="roberta-base-finetuned-ner")

# Function to extract text from an image
def extract_text_from_image(image_path):
    try:
        # Check if the file exists
        if not os.path.isfile(image_path):
            raise FileNotFoundError(f"File does not exist at path: {image_path}")
        
        # Read the image
        img = cv2.imread(image_path)
        
        # Check if the image was loaded properly
        if img is None:
            raise ValueError(f"Image at path {image_path} could not be loaded. Please check the file format.")
        
        # Use pytesseract to extract text
        text = pytesseract.image_to_string(img)
        
        # Return the extracted text after stripping whitespace
        return text.strip()
    
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""

# Function to perform NER and extract relationships (not implemented here)
# You can define this function if needed.

# Main function
def main():
    image_path = "/home/harishankar/CODEMEET24/evan.png"  # Make sure this path is correct
    text = extract_text_from_image(image_path)
    
    if not text:  # Check if text is empty
        print("Error in file or no text found.")
    else:
        print("Extracted Text:")
        print(text)  # Print the extracted text

if __name__ == "__main__":
    main()
