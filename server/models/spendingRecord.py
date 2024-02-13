from mongoengine import *

class SpendingRecord(Document):
    userId = ObjectIdField(required=True)
    source = StringField(required=True)
    amount = FloatField(required=True)
    date = DateTimeField(required=True)
    category = StringField(required=True)
    tags = ListField(StringField(), default=[])
    note = StringField(required=False)