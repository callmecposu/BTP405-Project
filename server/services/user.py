from mongoengine import *
from models import user as UserModel
import bcrypt

def getUsers():
    return UserModel.User.objects().to_json()

def getUserById(id):
    return UserModel.User.objects(id=id).to_json()

def createUser(username, password):
    # hash the password
    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # create the new User object
    newUser = UserModel.User(username=username, password=hashedPassword)
    # save the new User object
    newUser.save()
    return newUser.to_json()

def checkPassword(username, attemptedPassword):
    # get the User object by their username
    user = UserModel.User.objects(username=username).first()
    # compare the hashed and the attemted password
    if bcrypt.checkpw(attemptedPassword.encode('utf-8'), user.password):
        return (user.to_json(), None)
    else:
        return ({'message':'Passwords do not match!'}, 400)