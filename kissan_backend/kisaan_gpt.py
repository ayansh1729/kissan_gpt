import numpy as np
import pandas as pd
import nltk
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Check if stopwords are downloaded, if not, download them
try:
    _ = stopwords.words('english')
except LookupError:
    nltk.download('stopwords')

# Check if punkt tokenizer is downloaded, if not, download it
try:
    _ = nltk.word_tokenize("dummy")
except LookupError:
    nltk.download('punkt')

# Load dataframe
df = pd.read_csv('/home/kali/Documents/Projects/Web Projects/React_practice/kissan_backend/questionsv4.csv')

# Data cleaning
df['questions'] = df['questions'].str.lower()
df.dropna(inplace=True)
df = df.drop_duplicates()
df['questions'] = df['questions'].apply(lambda text: text.translate(str.maketrans('', '', string.punctuation)))

# Define stopwords
stop_words = set(stopwords.words('english'))
stop_words.add('asking')

# Function to remove stopwords
def remove_stopwords(text):
    tokens = word_tokenize(text)
    filtered_tokens = [word for word in tokens if word.lower() not in stop_words]
    return ' '.join(filtered_tokens)

# Remove stopwords from 'questions' column
df['questions'] = df['questions'].apply(remove_stopwords)

# Preprocess the answers
df['answers'] = df['answers'].str.replace(r'\bsuggested(\s+him to\s+|\s+to\s+)', 'You should ')

# Vectorize the questions
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['questions'])

# Function to preprocess text
def preprocess(text):
    text = text.lower().strip()
    text = remove_stopwords(text)
    return text

# Function to get answer
def get_answer(input_question):
    # Preprocess the input question
    input_question = preprocess(input_question)

    # Vectorize the input question
    input_vector = vectorizer.transform([input_question])

    # Calculate cosine similarity between input question and dataset questions
    similarity_scores = cosine_similarity(input_vector, X)

    # Get the index of the most similar question
    most_similar_index = np.argmax(similarity_scores)

    # Retrieve the corresponding answer
    answer = df.iloc[most_similar_index]['answers']

    return answer

# Test the model
input_question = "How to control flower drop problem in coconut plant"
print("Question:", input_question)
print("Answer:", get_answer(input_question))
