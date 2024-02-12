from mongoengine import *

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(default='New User')
    last_name = StringField(default='')