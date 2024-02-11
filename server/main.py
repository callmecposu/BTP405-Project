from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Say hello to Budget Buddy!"

if __name__ == '__main__':
    app.run(host="localhost", port=8000)