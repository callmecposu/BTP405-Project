from mongoengine import *
from models import spendingRecord as SpendingRecordModel
import re

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

def search(userId, query, dateRange, amountRange, category, sorting):
    pipeline = []

    if query:
        regex_query = re.compile(query, re.IGNORECASE)
        pipeline.append(
            {
                '$match': {
                    '$or': [
                        {
                            'source': {
                                '$regex': regex_query
                            }
                        },
                        {
                            'tags': {
                                '$regex': regex_query
                            }
                        }
                    ]
                }
            }
        )
    if not dateRange[0] == -1:
        pipeline.append(
            {
                '$match': {
                    'date': {
                        '$gte': dateRange[0]
                    }
                }
            }
        )
    if not dateRange[1] == -1:
        pipeline.append(
            {
                '$match': {
                    'date': {
                        '$lte': dateRange[1]
                    }
                }
            }
        )
    if not amountRange[0] == -1:
        pipeline.append(
            {
                '$match': {
                    'amount': {
                        '$gte': amountRange[0]
                    }
                }
            }
        )
    if not amountRange[1] == -1:
        pipeline.append(
            {
                '$match': {
                    'amount': {
                        '$lte': amountRange[1]
                    }
                }
            }
        )
    if not len(category) == 0:
        pipeline.append(
            {
                '$match': {
                    'category': category
                }
            }
        )
    if sorting == 'date_asc':
        pipeline.append(
            {
                '$sort': {
                    'date': 1
                }
            }
        )
    elif sorting == 'date_desc':
        pipeline.append(
            {
                '$sort': {
                    'date': -1
                }
            }
        )
    elif sorting == 'amount_asc':
        pipeline.append(
            {
                '$sort': {
                    'amount': 1
                }
            }
        )
    elif sorting == 'amount_desc':
        pipeline.append(
            {
                '$sort': {
                    'amount': -1
                }
            }
        )

    spendingRecords = SpendingRecordModel.SpendingRecord.objects(userId=userId).aggregate(pipeline)
