import requests

url = "http://127.0.0.1:5000/get_answer"

input_question = "How to control flower drop problem in coconut plant"

payload = {'question': input_question}

response = requests.post(url, json=payload)

if response.status_code == 200:
    print("Answer:", response.json()['answer'])
else:
    print("Error:", response.text)
