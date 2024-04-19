import unittest
import requests
from datetime import datetime

class TestSpendingRecord(unittest.TestCase):

    def setUp(self):
        self.base_url = 'http://localhost:8000'
        loginCreds = {
            'username': 'callme',
            'password': '123'
        }
        loginResp = requests.post(self.base_url + '/login', 
                                  headers={'Content-Type': 'application/json'},
                                  json=loginCreds)
        self.token = loginResp.headers.get('Token')
        # print('token: ', self.token)
        
        getUserResp = requests.get(self.base_url + '/user',
                                   headers={'Token': self.token})
        self.userBudget = getUserResp.json()['budget']
        # print(self.userBudget)

    def test1_get_user_spendings(self):
       print('\nGET /spendingRecord must return all user\'s records if passed the default filters')
       resp = requests.get(
           self.base_url + '/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
           headers={
               'Token': self.token
           }
           )
    #    print(resp.json())
       self.assertEqual(resp.status_code, 200)
       self.assertEqual(len(resp.json()), 2)
       print('passed!\n')
       
    def test2_get_user_spendings_by_query(self):
        print('\nGET /spendingRecord must return matching records when passed a \'query\' filter')
        resp = requests.get(
            self.base_url + '/spendingRecord?query=costco&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
            headers={
                'Token': self.token
            }
        )
        # print(resp.json())
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.json()), 1)
        self.assertEqual(resp.json()[0]['source'], 'Costco')
        print('passed!\n')
       
    def test3_get_spending_record_by_id(self):
        print('\nGET /spendingRecord must return matching records when passed the \'id\' parameter')
        resp = requests.get(
            self.base_url + '/spendingRecord?id=662080926c2ee246b6884f54',
            headers={
                'Token': self.token
            }
        )
        # print(resp.json())
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()['source'], 'Riot Games')
        print('passed!\n')
        
    def test4_get_spending_records_by_amount(self):
        print('\nGET /spendingRecord must return mathcing records when passed an \'amount\' filter')
        resp = requests.get(
            self.base_url + '/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=50&amountTo=-1&category=&sorting=date_desc',
            headers={
                'Token': self.token
            }
        )
        # print(resp.json())
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.json()), 1)
        self.assertEqual(resp.json()[0]['source'], 'Costco')
        print('passed!\n')
        
    def test5_get_spending_records_by_category(self):
        print('\nGET /spendingRecord must return matching records when passed a \'category\' filter')
        resp = requests.get(
            self.base_url + '/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=Entertainment&sorting=date_desc',
            headers={
                'Token': self.token
            }
        )
        # print('by cat: ', resp.json())
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.json()), 1)
        self.assertEqual(resp.json()[0]['source'], 'Riot Games')
        print('passed!\n')
    
        
    def test6_update_spending_record(self):
        print('\nPUT /spendingRecord/<:id> must update the spending record with the provided data')
        initSpendingRecResp = requests.get(
            self.base_url + '/spendingRecord?id=662074a726ee66ae02fba49e',
            headers={
                'Token': self.token
            }
        )
        self.assertEqual(initSpendingRecResp.status_code, 200)
        # print('init: ', initSpendingRecResp.json())
        init = initSpendingRecResp.json()
        timestamp = datetime.fromtimestamp(int(init['date']['$date']) // 1000)
        init['date'] = timestamp.strftime('%Y-%m-%d %H:%M:%S')
        update = init.copy()
        update['source'] = 'Freshco'
        resp = requests.put(
            self.base_url + '/spendingRecord/662074a726ee66ae02fba49e',
            headers={
                'Token': self.token,
                'Content-Type': 'application/json'
            },
            json=update
        )
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()['source'], 'Freshco')
        if resp.status_code == 200:
            revertResp = requests.put(
                self.base_url + '/spendingRecord/662074a726ee66ae02fba49e',
                headers={
                    'Token': self.token,
                    'Content-Type': 'application/json'
                },
                json=init
            )
            self.assertEqual(revertResp.status_code,200)
            self.assertEqual(revertResp.json()['source'], 'Costco')
        print('passed!\n')
            
    def test7_create_spending_record(self):
        print('\nPOST /spendingRecord must craete a new record')
        resp = requests.post(
            self.base_url + '/spendingRecord',
            headers={
                'Token': self.token,
                'Content-Type': 'application/json'
            },
            json={
                'source': 'TTC',
                'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'amount': 3.33,
                'category': 'Transport',
                'tags': ['TTC', 'Subway'],
                'note': 'i have to buy a car really...'
            }
        )
        # print('create: ', resp.json())
        self.assertEqual(resp.status_code, 200)
        print('passed!\n')
        
    def test8_delete_spending_record(self):
        print('\nDELETE /spendingRecord/<:id> must delete the given record')
        getResp = requests.get(
            self.base_url + '/spendingRecord?query=TTC&dateFrom=-1&dateTo=-1&amountFrom=-3.33&amountTo=3.33&category=Transport&sorting=date_desc',
            headers={
                'Token': self.token
            }
        )
        # print('get: ', getResp.json())
        self.assertEqual(getResp.status_code, 200)
        self.assertEqual(len(getResp.json()), 1)
        resp = requests.delete(
            self.base_url + f'/spendingRecord/{getResp.json()[0]['_id']}',
            headers={
                'Token': self.token
            }
        )
        self.assertEqual(resp.status_code, 200)
        verifyResp = requests.get(
            self.base_url + '/spendingRecord?query=TTC&dateFrom=-1&dateTo=-1&amountFrom=-3.33&amountTo=3.33&category=Transport&sorting=date_desc',
            headers={
                'Token': self.token
            }
        )
        self.assertEqual(verifyResp.status_code, 200)
        self.assertEqual(len(verifyResp.json()), 0)
        print('passed!\n')
        
        
if __name__ == '__main__':
    unittest.main()
