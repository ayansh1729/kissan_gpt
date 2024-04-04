from flask import Flask, request, jsonify
from kisaan_gpt import get_answer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_answer', methods=['POST'])
def get_answer_api():
    data = request.json
    input_question = data['question']
    answer = get_answer(input_question)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
