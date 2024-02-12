from flask import Flask, make_response, request
from mongoengine import connect
from dotenv import load_dotenv
import os
from services import user as UserService
import certifi

app = Flask(__name__)

# load the .env
load_dotenv()

# Connect to MongoDB Atlas
connect(host = os.environ.get('MONGODB'), tlsCAFile=certifi.where())

@app.route("/")
def home():
    users = UserService.getUsers()
    resp = make_response(users)
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/user/<id>')
def getUserById(id):
    user = UserService.getUserById(id)
    resp = make_response(user)
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/user', methods=['POST'])
def createUser():
    print(request.json)
    username = request.json['username']
    password = request.json['password']
    newUser = UserService.createUser(username=username, password=password)
    resp = make_response(newUser)
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/login', methods=['POST'])
def loginUser():
    print(request.json)
    username = request.json['username']
    password = request.json['password']
    (result, err) = UserService.checkPassword(username=username, attemptedPassword=password)
    resp = make_response(result)
    resp.headers['Content-Type'] = 'application/json'
    if (err):
        resp.status = err
    return resp

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)