from mongoengine import *
from models import spendingRecord as SpendingRecordModel
from models import user as UserModel
import datetime
from collections import defaultdict
import calendar

def getCurrentSpendings(userId):
    user = UserModel.User.objects(id=userId).first()
    period = user.budget['budget_type']
    if period == 'monthly':
        startDate = datetime.datetime.now().replace(day=1).strftime('%Y-%m-%d')
        endDate = datetime.datetime.now().replace(day=datetime.datetime.now().day, hour=23, minute=59, second=59).strftime('%Y-%m-%d')
    elif period == 'weekly':
        today = datetime.datetime.now()
        startDate = (today - datetime.timedelta(days=today.weekday())).strftime('%Y-%m-%d')
        endDate = (today + datetime.timedelta(days=6 - today.weekday(), hours=23, minutes=59, seconds=59)).strftime('%Y-%m-%d')
    elif period == 'daily':
        startDate = datetime.datetime.now().strftime('%Y-%m-%d')
        endDate = datetime.datetime.now().strftime('%Y-%m-%d')
    else:
        startDate = datetime.datetime.now().replace(day=1).strftime('%Y-%m-%d')
        endDate = datetime.datetime.now().replace(day=datetime.datetime.now().day, hour=23, minute=59, second=59).strftime('%Y-%m-%d')
    spendings = SpendingRecordModel.SpendingRecord.objects(userId=userId, date__gte=startDate, date__lte=endDate).to_json()
    return spendings

def getPastSpendings(userId):
    user = UserModel.User.objects(id=userId).first()
    period = user.budget['budget_type']
    periods = []
    first_start_date = ''
    last_end_date = ''
    if period == 'monthly':
        today = datetime.datetime.now()
        for i in range(7):
            start_date = (today - datetime.timedelta(days=today.day - 1)).strftime('%Y-%m-%d')
            end_date = (today.replace(day=today.day) - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
            if i == 0:
                first_start_date = end_date
            if i == 6:
                last_end_date = start_date

            start_month = calendar.month_name[int(start_date.split('-')[1])]
            periods.append({
                'period': f'{start_month} {start_date.split("-")[0]}',
                'start_date': start_date,
                'end_date': end_date,
                'spending': {
                    'Grocery': 0,
                    'Transport': 0,
                    'Health': 0,
                    'Restaurants': 0,
                    'Entertainment': 0,
                    'Bills': 0,
                    'Others': 0
                }
            })
            today = today.replace(day=1) - datetime.timedelta(days=1)
    elif period == 'weekly':
        today = datetime.datetime.now()
        for i in range(7):
            start_date = (today - datetime.timedelta(days=today.weekday())).strftime('%Y-%m-%d')
            end_date = (today + datetime.timedelta(days=6 - today.weekday())).strftime('%Y-%m-%d')
            if i == 0:
                first_start_date = end_date
            if i == 6:
                last_end_date = start_date

            start_day = int(start_date.split('-')[2])
            end_day = int(end_date.split('-')[2])
            start_month = calendar.month_name[int(start_date.split('-')[1])]
            end_month = calendar.month_name[int(end_date.split('-')[1])]
            periods.append({
                'period': f'{start_month} {start_day} - {end_month+" " if not start_month == end_month else ""}{end_day}',
                'start_date': start_date,
                'end_date': end_date,
                'spending': {
                    'Grocery': 0,
                    'Transport': 0,
                    'Health': 0,
                    'Restaurants': 0,
                    'Entertainment': 0,
                    'Bills': 0,
                    'Others': 0
                }
            })
            today = today - datetime.timedelta(days=7)
    elif period == 'daily':
        today = datetime.datetime.now()
        for i in range(7):
            start_date = today.strftime('%Y-%m-%d')
            end_date = today.strftime('%Y-%m-%d')
            if i == 0:
                first_start_date = end_date
            if i == 6:
                last_end_date = start_date

            start_month = calendar.month_name[int(start_date.split('-')[1])]
            periods.append({
                'period': f"{start_month} {start_date.split('-')[2]}",
                'start_date': start_date,
                'end_date': end_date,
                'spending': {
                    'Grocery': 0,
                    'Transport': 0,
                    'Health': 0,
                    'Restaurants': 0,
                    'Entertainment': 0,
                    'Bills': 0,
                    'Others': 0
                }
            })
            today = today - datetime.timedelta(days=1)
    else:
        today = datetime.datetime.now()
        for i in range(7):
            start_date = (today - datetime.timedelta(days=today.day - 1)).strftime('%Y-%m-%d')
            end_date = (today.replace(day=today.day) - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
            if i == 0:
                first_start_date = end_date
            if i == 6:
                last_end_date = start_date
            periods.append({
                'period': f'{start_date} - {end_date}',
                'start_date': start_date,
                'end_date': end_date,
                'spending': {
                    'Grocery': 0,
                    'Transport': 0,
                    'Health': 0,
                    'Restaurants': 0,
                    'Entertainment': 0,
                    'Bills': 0,
                    'Others': 0
                }
            })
            today = today.replace(day=1) - datetime.timedelta(days=1)

    spendings = SpendingRecordModel.SpendingRecord.objects(userId=userId, date__gte=last_end_date, date__lte=first_start_date)
    for spending in spendings:
        period_index = None
        for index, p in enumerate(periods):
            start_date = datetime.datetime.strptime(p['start_date'], '%Y-%m-%d')
            end_date = datetime.datetime.strptime(p['end_date'], '%Y-%m-%d')
            if start_date.date() <= spending.date.date() <= end_date.date():
                period_index = index
                break

        if period_index is not None:
            periods[period_index]['spending'][spending.category] += spending.amount
        
    return periods
