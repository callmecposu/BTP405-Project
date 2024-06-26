import unittest
import requests


class TestUpdateBudget(unittest.TestCase):

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

      

    def test_updateBudget_noToken(self):
        print('\nPOST /updateBudget must return 401 if no \'Token\' header was passed')
        response = requests.post(self.base_url + '/updateBudget',
                                 headers={'Content-Type': 'application/json'},
                                )
        self.assertEqual(response.status_code, 401)
        print('passed!\n')

    def test_updateBugdet_token(self):
        print('\nPOST /updateBudget must update the user\'s budget if their valid token was passed')
        data = {
            'budget_type': 'daily',
            'max_amount': 25
        }
        response = requests.post(self.base_url + '/updateBudget',
                                 headers={
                                     'Content-Type': 'application/json',
                                     'Token': self.token
                                     },
                                 json=data)
        # print('resp: ', response.json())
        self.assertEqual(response.status_code, 200)
        if response.status_code == 200:
            revertResp = requests.post(
                self.base_url + '/updateBudget',
                headers={
                    'Token': self.token,
                    'Content-Type': 'application/json'
                },
                json=self.userBudget
            )
            self.assertEqual(revertResp.status_code, 200)
        print('passed!\n')
            
        
if __name__ == '__main__':
    unittest.main()
