from mongoengine import *
from enum import Enum

class BudgetType(Enum):
    DAILY="daily"
    WEEKLY="weekly"
    MONTHLY="monthly"

class BudgetSettings(EmbeddedDocument):
    budget_type = EnumField(BudgetType)
    max_amount = FloatField()

class User(Document):
    username = StringField(required=True, unique=True)
    password = BinaryField(required=True)
    first_name = StringField(default='New User')
    last_name = StringField(default='')
    budget = EmbeddedDocumentField(BudgetSettings)