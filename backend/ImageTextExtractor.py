import cv2
import pytesseract
import os

# Set up OCR tools
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Ensure this path is correct for your system

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

# Function to process the uploaded image and return extracted text
def process_image(image_file):
    # Save the uploaded file temporarily
    image_path = f"/tmp/{image_file.filename}"  # You can adjust the temp directory as needed
    with open(image_path, "wb") as buffer:
        buffer.write(image_file.file.read())

    # Extract text from the saved image
    text = extract_text_from_image(image_path)

    # Clean up: remove the temporary file
    os.remove(image_path)

    return text
