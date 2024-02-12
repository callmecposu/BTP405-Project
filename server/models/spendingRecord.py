from mongoengine import *

class SpendingRecord(Document):
    userId = StringField(required=True)
    source = StringField(required=True)
    amount = FloatField(required=True)
    date = DateTimeField(required=True)
    category = StringField(required=False)
    tags = ListField(StringField(), required=False)