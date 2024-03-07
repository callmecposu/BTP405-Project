import datetime
import json
import bson
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

def search(userId, query, dateRange, amountRange, category, sorting, id):
    try:
        if id:
            spendingRecord = SpendingRecordModel.SpendingRecord.objects(id=id, userId=userId).first()
            return spendingRecord.to_json()

        pipeline = []

        pipeline.append(
            {
                '$match': {
                    'userId': bson.ObjectId(userId)
                }
            }
        )

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
        if dateRange[0] != '-1':
            pipeline.append(
                {
                    '$match': {
                        'date': {
                            '$gte': datetime.datetime.strptime(dateRange[0], '%Y-%m-%d')
                        }
                    }
                }
            )
        if dateRange[1] != '-1':
            pipeline.append(
                {
                    '$match': {
                        'date': {
                            '$lte': datetime.datetime.strptime(dateRange[1], '%Y-%m-%d')
                        }
                    }
                }
            )
        if amountRange[0] != '-1':
            pipeline.append(
                {
                    '$match': {
                        'amount': {
                            '$gte': float(amountRange[0])
                        }
                    }
                }
            )
        if amountRange[1] != '-1':
            pipeline.append(
                {
                    '$match': {
                        'amount': {
                            '$lte': float(amountRange[1])
                        }
                    }
                }
            )
        if len(category) != 0:
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

        spendingRecords = SpendingRecordModel.SpendingRecord.objects().aggregate(pipeline)

        return json.dumps(list(spendingRecords), default=str)
    except Exception as e:
        print(e)
        return []

def deleteRecord(id, userId):
    try:
        spendingRecord = SpendingRecordModel.SpendingRecord.objects(id=id, userId=userId).first()
        spendingRecord.delete()
        return spendingRecord.to_json()
    except Exception as e:
        print(e)
        return None