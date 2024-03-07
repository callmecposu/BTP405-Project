from flask import Flask, make_response, request
from mongoengine import connect
from dotenv import load_dotenv
import os
from services import user as UserService
from services import spendingRecord as SpendingRecordService
from services import jwt as JWTService
from services import dashboard as DashboardService
import certifi
from services import cors as CORSService

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
    CORSService.addCORS(resp, 'POST, GET, OPTIONS')
    return resp

@app.route('/user', methods=['POST', 'GET', 'OPTIONS'])
def userRoute():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'POST, GET, OPTIONS')
        return resp
    elif request.method == 'POST':
        print(request.json)
        username = request.json['username']
        password = request.json['password']
        (newUser, token, err) = UserService.createUser(username=username, password=password)
        resp = make_response(newUser)
        resp.headers['Content-Type'] = 'application/json'
        CORSService.addCORS(resp, 'POST, GET, OPTIONS')
        if err:
            resp.status = err
        if token:
            resp.headers['Token'] = token
        return resp
    elif request.method == 'GET':
        token = request.headers['Token']
        print(token)
        user = UserService.getUserFromJWT(token)
        resp = make_response(user)
        resp.headers['Content-Type'] = 'application/json'
        CORSService.addCORS(resp, 'POST, GET, OPTIONS')
        return resp

@app.route('/login', methods=['POST', 'OPTIONS'])
def loginUser():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'POST, OPTIONS')
        return resp
    elif request.method == 'POST':
        print(request.json)
        username = request.json['username']
        password = request.json['password']
        (result, token, err) = UserService.checkPassword(username=username, attemptedPassword=password)
        resp = make_response(result)
        resp.headers['Content-Type'] = 'application/json'
        # CORS headers
        CORSService.addCORS(resp, 'POST, OPTIONS')
        # end CORS headers
        if err:
            resp.status = err
        if token:
            resp.headers['Token'] = token
        return resp
    
@app.route('/updateBudget', methods=['POST', 'OPTIONS'])
def updateBudget():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'POST, OPTIONS')
        return resp
    elif request.method == 'POST':
        try:
            token = request.headers['Token']
            userId = JWTService.decodeToken(token)['id']
        except:
            resp = make_response({'message':'Unauthorized'})
            resp.status = 401
            CORSService.addCORS(resp, 'POST, OPTIONS')
            return resp

        try:
            budgetType = request.json['budget_type']
            maxAmount = request.json['max_amount']
            (result, err, status) = UserService.updateBudget(userId, budgetType, maxAmount)
            resp = make_response(result)
            resp.headers['Content-Type'] = 'application/json'
            CORSService.addCORS(resp, 'POST, OPTIONS')
            if status:
                resp.status = status
            return resp
        except Exception as e:
            print(e)
            resp = make_response({'message':'Bad Request'})
            resp.status = 400
            CORSService.addCORS(resp, 'POST, OPTIONS')
            return resp

# SpendingRecord routers:

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

@app.route('/spendingRecord', methods=['POST', 'GET', 'OPTIONS'])
def searchRecords():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'GET, OPTIONS')
        return resp
    elif request.method == 'GET':
        try:
            token = request.headers['Token']
            tokenPayload = JWTService.decodeToken(token)
            userId = tokenPayload["id"]
        except:
            resp = make_response({'message':'Unauthorized'})
            CORSService.addCORS(resp, 'GET, OPTIONS')
            resp.status = 401
            return resp

        try:
            query = request.args.get('query')
            dateRange = (request.args.get('dateFrom'), request.args.get('dateTo'))
            amountRange = (request.args.get('amountFrom'), request.args.get('amountTo'))
            category = request.args.get('category')
            sorting = request.args.get('sorting')
            id = request.args.get('id')
            userId = str(userId)
        except:
            resp = make_response({'message':'Bad Request'})
            CORSService.addCORS(resp, 'GET, OPTIONS')
            resp.status = 400
            return resp
        
        records = SpendingRecordService.search(userId=userId, query=query, dateRange=dateRange, amountRange=amountRange, category=category, sorting=sorting, id=id)

        resp = make_response(records)
        resp.headers['Content-Type'] = 'application/json'
        CORSService.addCORS(resp, 'GET, OPTIONS')
        return resp
    elif request.method == 'POST':
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
        CORSService.addCORS(resp, 'GET, OPTIONS')
        return resp

@app.route('/spendingRecord/<id>', methods=['DELETE'])
def deleteRecord(id):
    try:
        token = request.headers['Token']
        tokenPayload = JWTService.decodeToken(token)
        userId = tokenPayload["id"]
    except:
        resp = make_response({'message':'Unauthorized'})
        resp.status = 401
        return resp

    try:
        userId = str(userId)
        deletedRecord = SpendingRecordService.deleteRecord(id=id, userId=userId)
        resp = make_response(deletedRecord)
        resp.headers['Content-Type'] = 'application/json'
        return resp
    except:
        resp = make_response({'message':'Bad Request'})
        resp.status = 400
        return resp
    
@app.route('/currentSpendings', methods=['GET', 'OPTIONS'])
def getCurrentSpendings():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'GET, OPTIONS')
        return resp
    else:
        try:
            token = request.headers['Token']
            tokenPayload = JWTService.decodeToken(token)
            userId = tokenPayload["id"]
        except:
            resp = make_response({'message':'Unauthorized'})
            resp.status = 401
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp

        try:
            userId = str(userId)
            spendings = DashboardService.getCurrentSpendings(userId)
            resp = make_response(spendings)
            resp.headers['Content-Type'] = 'application/json'
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp
        except:
            resp = make_response({'message':'Bad Request'})
            resp.status = 400
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp
        
@app.route('/pastSpendings', methods=['GET', 'OPTIONS'])
def getPastSpendings():
    if request.method == 'OPTIONS':
        resp = make_response()
        CORSService.addCORS(resp, 'GET, OPTIONS')
        return resp
    else:
        try:
            token = request.headers['Token']
            tokenPayload = JWTService.decodeToken(token)
            userId = tokenPayload["id"]
        except:
            resp = make_response({'message':'Unauthorized'})
            resp.status = 401
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp

        try:
            userId = str(userId)
            spendings = DashboardService.getPastSpendings(userId)
            resp = make_response(spendings)
            resp.headers['Content-Type'] = 'application/json'
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp
        except Exception as e:
            print(e)
            resp = make_response({'message':'Bad Request'})
            resp.status = 400
            CORSService.addCORS(resp, 'GET, OPTIONS')
            return resp

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)