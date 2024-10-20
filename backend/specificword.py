# Step 1: Import Necessary Libraries
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer

# Ensure required NLTK resources are downloaded
nltk.download('punkt')
nltk.download('stopwords')

# Step 2: Define Content
content = """Data Processing in Data Science

Data processing is a crucial step in data science, where raw data is transformed into a usable format for analysis. 
It involves several key stages:

Data Collection: Gathering data from various sources like databases, APIs, sensors, or web scraping.
Data Cleaning: Identifying and correcting errors, inconsistencies, or missing values in the data. This can involve techniques like imputation, outlier detection, and normalization.
"""

# Step 3: Preprocess Text
# Tokenize the text
tokens = word_tokenize(content.lower())

# Remove stop words
stop_words = set(stopwords.words("english"))
filtered_tokens = [word for word in tokens if word not in stop_words]

# Stem words
stemmer = PorterStemmer()
stemmed_tokens = [stemmer.stem(word) for word in filtered_tokens]

# Step 4: Identify Keywords using TF-IDF
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform([content])

# Get the terms and their TF-IDF scores
terms = vectorizer.get_feature_names_out()
scores = tfidf_matrix.toarray()[0]

# Sort terms by TF-IDF scores
sorted_terms = sorted(zip(terms, scores), key=lambda x: x[1], reverse=True)

# Extract top keywords based on a threshold or number
top_keywords = sorted_terms[:10]  # Get the top 10 keywords

# Step 5: Print Keywords
print("Top Keywords:")
for term, score in top_keywords:
    print(f"{term}: {score:.2f}")
