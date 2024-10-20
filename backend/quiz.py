import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk import pos_tag
import random

# Download NLTK data files (if not already done)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

def generate_mcq_quiz(text, num_questions=3, num_choices=4):
    """
    Generate an MCQ quiz from the given text.

    Args:
        text (str): The text to create the quiz from.
        num_questions (int): The number of quiz questions to generate (default is 3).
        num_choices (int): The number of choices for each question (default is 4).

    Returns:
        list: A list of dictionaries, each containing the question, options, and the correct answer.
    """
    # Tokenize the text into sentences
    sentences = sent_tokenize(text)

    # Tokenize each sentence into words and tag parts of speech
    quiz = []
    stop_words = set(stopwords.words('english'))

    # Extract all nouns from the text to use as possible distractors
    all_words = word_tokenize(text)
    all_nouns = [word for word, pos in pos_tag(all_words) if pos in ('NN', 'NNS', 'NNP', 'NNPS') and word.lower() not in stop_words]

    # Loop until we get the desired number of questions
    while len(quiz) < num_questions:
        # Randomly select a sentence
        sentence = random.choice(sentences)
        words = word_tokenize(sentence)
        pos_tags = pos_tag(words)

        # Filter out stopwords and select a word with a specific part of speech
        candidates = [word for word, pos in pos_tags if pos in ('NN', 'NNS', 'NNP', 'NNPS') and word.lower() not in stop_words]

        # If there are valid candidates, create an MCQ question
        if candidates:
            answer = random.choice(candidates)

            # Create the question by replacing the answer with a blank
            question = sentence.replace(answer, '______', 1)

            # Generate distractors for the multiple-choice options
            distractors = random.sample([noun for noun in all_nouns if noun != answer], num_choices - 1)
            options = distractors + [answer]
            random.shuffle(options)

            # Add the question, options, and answer to the quiz
            quiz.append({
                'question': question,
                'options': options,
                'answer': answer
            })

    return quiz

# Example usage
text = """
Natural language processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and humans through natural language. 
The ultimate objective of NLP is to read, decipher, understand, and make sense of human languages in a manner that is valuable. 
Most NLP techniques rely on machine learning to derive meaning from human languages.
Natural language processing is widely used for sentiment analysis, language translation, and text summarization.
"""

# Generate the MCQ quiz
quiz = generate_mcq_quiz(text, num_questions=3)

# Display the quiz questions
print("MCQ Quiz:")
for idx, q in enumerate(quiz, 1):
    print(f"{idx}. {q['question']}")
    for i, option in enumerate(q['options']):
        print(f"   {chr(65+i)}. {option}")
    print(f"Answer: {q['answer']}\n")
