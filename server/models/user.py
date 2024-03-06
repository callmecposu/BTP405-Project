from mongoengine import *

class User(Document):
    username = StringField(required=True, unique=True)
    password = BinaryField(required=True)
    first_name = StringField(default='New User')
    last_name = StringField(default='')
    budget = DictField(default={
        'budget_type': StringField(default='monthly'),
        'max_amount': FloatField(default=1000.0),
    })
