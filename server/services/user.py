from mongoengine import *
from models import user as UserModel

def getUsers():
    return UserModel.User.objects().to_json()

def getUserById(id):
    return UserModel.User.objects(id=id).to_json()

def createUser(username, password):
    newUser = UserModel.User(username=username, password=password)
    newUser.save()
    return newUser.to_json()