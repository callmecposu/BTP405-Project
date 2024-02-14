from mongoengine import *
from mongoengine.errors import NotUniqueError
from models import user as UserModel
import bcrypt
from . import jwt as JWTService

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
    try:
        newUser.save()
    except NotUniqueError as err:
        print(err.args[0])
        return ({'message': f'User \'{username}\' already exists!'}, None, 400 )

    # create a JWT for the user
    token = JWTService.createToken(str(newUser.id))
    return (newUser.to_json(), token, None)

def checkPassword(username, attemptedPassword):
    # get the User object by their username
    user = UserModel.User.objects(username=username).first()
    if not user:
        return ({'message': f'User \'{username}\' does not exist!'}, None, 404)
    # compare the hashed and the attemted password
    if bcrypt.checkpw(attemptedPassword.encode('utf-8'), user.password):
        # create a JWT for the user
        token = JWTService.createToken(str(user.id))
        return (user.to_json(), token, None)
    else:
        return ({'message':'Passwords do not match!'}, None, 400)
    
def getUserFromJWT(token):
    # decode the user id from the token
    userId = JWTService.decodeToken(token)['id']
    # find the user with this id in the database
    user = UserModel.User.objects(id=userId).first()
    return user.to_json()