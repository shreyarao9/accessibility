from sklearn.feature_extraction.text import TfidfVectorizer

def extract_important_words(paragraph, top_n=5):
    """
    Extract important words from a given paragraph using TF-IDF.

    Args:
        paragraph (str): The input paragraph.
        top_n (int): Number of top important words to return.

    Returns:
        List[str]: List of important words.
    """
    # Initialize the TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(stop_words='english')

    # Fit and transform the paragraph to calculate TF-IDF scores
    tfidf_matrix = vectorizer.fit_transform([paragraph])

    # Get the words and their corresponding scores
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray().flatten()

    # Sort the words by their TF-IDF scores in descending order
    important_words = sorted(zip(feature_names, tfidf_scores), key=lambda x: x[1], reverse=True)

    # Return the top N important words
    return [word for word, score in important_words[:top_n]]

# Example usage
# if __name__ == "__main__":
#     paragraph = """
#     Machine learning is a method of data analysis that automates analytical model building.
#     It is a branch of artificial intelligence based on the idea that systems can learn from data,
#     identify patterns, and make decisions with minimal human intervention.
#     """

#     important_words = extract_important_words(paragraph, top_n=5)
#     print("Important words:", important_words)
