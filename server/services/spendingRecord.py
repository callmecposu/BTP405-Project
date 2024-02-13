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

def editSpendingRecord(id, source, date, amount, note, category, tags, userId):
    spendingRecord = SpendingRecordModel.SpendingRecord.objects(id=id, userId=userId).first()
    spendingRecord.source = source
    spendingRecord.amount = amount
    spendingRecord.date = date
    spendingRecord.note = note
    spendingRecord.category = category
    spendingRecord.tags = tags
    spendingRecord.save()
    return spendingRecord.to_json()