import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from string import punctuation

# Download NLTK data files (if not already done)
nltk.download('punkt')
nltk.download('stopwords')

def summarize_text(text, n=3):
    """
    Summarize the given text by extracting the top n important sentences.

    Args:
        text (str): The text to summarize.
        n (int): The number of sentences to extract (default is 3).

    Returns:
        str: The summarized text.
    """
    # Tokenize the text into sentences
    sentences = sent_tokenize(text)

    # Tokenize the text into words and filter out stopwords and punctuation
    stop_words = set(stopwords.words("english") + list(punctuation))
    word_frequencies = {}

    for word in word_tokenize(text.lower()):
        if word not in stop_words:
            if word in word_frequencies:
                word_frequencies[word] += 1
            else:
                word_frequencies[word] = 1

    # Calculate the maximum word frequency
    max_frequency = max(word_frequencies.values())

    # Normalize the word frequencies by dividing by the maximum frequency
    for word in word_frequencies.keys():
        word_frequencies[word] /= max_frequency

    # Score each sentence based on the normalized word frequencies
    sentence_scores = {}
    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in word_frequencies:
                if sentence not in sentence_scores:
                    sentence_scores[sentence] = word_frequencies[word]
                else:
                    sentence_scores[sentence] += word_frequencies[word]

    # Sort the sentences by their scores and select the top n sentences
    summarized_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:n]

    # Join the selected sentences to form the summary
    summary = ' '.join(summarized_sentences)
    return summary

# Dynamic text input from the user
text = input("Enter the text to summarize:\n")

# Dynamic number of sentences for the summary
try:
    n = int(input("Enter the number of sentences for the summary (default is 3):\n"))
except ValueError:
    n = 3  # Default value if invalid input

# Generate and display the summary
summary = summarize_text(text, n)
print("\nSummary:")
print(summary)
