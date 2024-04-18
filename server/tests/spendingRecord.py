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
        print('token: ', self.token)
        
        getUserResp = requests.get(self.base_url + '/user',
                                   headers={'Token': self.token})
        self.userBudget = getUserResp.json()['budget']
        print(self.userBudget)

    def test_get_user_spendings(self):
       resp = requests.get(
           self.base_url + '/spendingRecord?query=&dateFrom=-1&dateTo=-1&amountFrom=-1&amountTo=-1&category=&sorting=date_desc',
           headers={
               'Token': self.token
           }
           )
    #    print(resp.json())
       self.assertEqual(resp.status_code, 200)
       self.assertEqual(len(resp.json()), 2)
       
    def test_get_user_spendings_by_query(self):
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
       
    def test_get_spending_record_by_id(self):
        resp = requests.get(
            self.base_url + '/spendingRecord?id=662080926c2ee246b6884f54',
            headers={
                'Token': self.token
            }
        )
        # print(resp.json())
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()['source'], 'Riot Games')
        
    def test_update_spending_record(self):
        initSpendingRecResp = requests.get(
            self.base_url + '/spendingRecord?id=662074a726ee66ae02fba49e',
            headers={
                'Token': self.token
            }
        )
        self.assertEqual(initSpendingRecResp.status_code, 200)
        print('init: ', initSpendingRecResp.json())
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
        
if __name__ == '__main__':
    unittest.main()
