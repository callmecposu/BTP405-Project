import jwt
import os 
from dotenv import load_dotenv

load_dotenv()
secret = os.environ.get('JWT_SECRET')

def createToken(id):
    payload = {'id': id}
    print('payload: ', payload)
    print('secret: ', secret)
    token = jwt.encode(payload, secret, algorithm='HS256')
    print('Encoded Token: ', token)
    return token

def decodeToken(token):
    decodedPayload = jwt.decode(token, secret, algorithms=['HS256'])
    print('Decoded Payload: ', decodedPayload)
    return decodedPayload