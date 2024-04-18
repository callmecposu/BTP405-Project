from mongoengine import *

class Budget(EmbeddedDocument):
    budget_type = StringField(default='monthly')
    max_amount = FloatField(default=1000.0)

class User(Document):
    username = StringField(required=True, unique=True)
    password = BinaryField(required=True)
    first_name = StringField(default='New User')
    last_name = StringField(default='')
    budget = EmbeddedDocumentField(Budget, default=Budget)
