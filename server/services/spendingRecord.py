from mongoengine import *
from models import spendingRecord as SpendingRecordModel

def addSpendingRecord(source, date, amount, note, category, tags, userId):
    newSpendingRecord = SpendingRecordModel.SpendingRecord(
        userId=userId,
        source=source,
        amount=amount,
        date=date,
        note=note,
        category=category,
        tags=tags
    )
    newSpendingRecord.save()
    return newSpendingRecord.to_json()