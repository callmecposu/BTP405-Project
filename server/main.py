from flask import Flask, make_response, request
from mongoengine import connect
from dotenv import load_dotenv
import os
from services import user as UserService
from services import spendingRecord as SpendingRecordService
from services import jwt as JWTService
import certifi
import json

app = Flask(__name__)

# load the .env
load_dotenv()

# Connect to MongoDB Atlas
connect(host = os.environ.get('MONGODB'), tlsCAFile=certifi.where())

# User routers:

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

@app.route('/user', methods=['POST', 'GET'])
def userRoute():
    if request.method == 'POST':
        print(request.json)
        username = request.json['username']
        password = request.json['password']
        (newUser, token) = UserService.createUser(username=username, password=password)
        resp = make_response(newUser)
        resp.headers['Content-Type'] = 'application/json'
        resp.headers['Token'] = token
        return resp
    elif request.method == 'GET':
        token = request.headers['Token']
        print(token)
        user = UserService.getUserFromJWT(token)
        resp = make_response(user)
        resp.headers['Content-Type'] = 'application/json'
        return resp

@app.route('/login', methods=['POST'])
def loginUser():
    print(request.json)
    username = request.json['username']
    password = request.json['password']
    (result, token, err) = UserService.checkPassword(username=username, attemptedPassword=password)
    resp = make_response(result)
    resp.headers['Content-Type'] = 'application/json'
    if (err):
        resp.status = err
    if (token):
        resp.headers['Token'] = token
    return resp

# SpendingRecord routers:

@app.route('/spendingRecord', methods=['POST'])
def createRecord():
    try:
        token = request.headers['Token']
        tokenPayload = JWTService.decodeToken(token)
        userId = tokenPayload["id"]
    except:
        resp = make_response({'message':'Unauthorized'})
        resp.status = 401
        return resp

    source = request.json['source']
    date = request.json['date']
    amount = request.json['amount']
    category = request.json['category']
    tags = request.json['tags']
    userId = str(userId)
    note = request.json['note']
    newRecord = SpendingRecordService.addSpendingRecord(source=source, date=date, amount=amount, category=category, tags=tags, userId=userId, note=note)
    resp = make_response(newRecord)
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/spendingRecord/<id>', methods=['PUT'])
def editRecord(id):
    try:
        token = request.headers['Token']
        tokenPayload = JWTService.decodeToken(token)
        userId = tokenPayload["id"]
    except:
        resp = make_response({'message':'Unauthorized'})
        resp.status = 401
        return resp

    source = request.json['source']
    date = request.json['date']
    amount = request.json['amount']
    category = request.json['category']
    tags = request.json['tags']
    userId = str(userId)
    note = request.json['note']
    editedRecord = SpendingRecordService.editSpendingRecord(id=id, source=source, date=date, amount=amount, category=category, tags=tags, userId=userId, note=note)
    resp = make_response(editedRecord)
    resp.headers['Content-Type'] = 'application/json'
    return resp

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)