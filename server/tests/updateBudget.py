import unittest
import requests


class TestRoutes(unittest.TestCase):

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
        
        getUserResp = requests.get(self.base_url + '/user',
                                   headers={'Token': self.token})
        self.userBudget = getUserResp.json()['budget']
        print(self.userBudget)

      

    def test_updateBudget_noToken(self):
        data = {'username': 'callme', 'password': '123'}
        responce = requests.post(self.base_url + '/updateBadget',
                                 headers={' Content-Type': 'application/json'},
                                 json=data)
        self.assertEqual(responce.status_code, 400)

    def test_updateBugdet_token(self):
        data = {'username': 'callme', 'password': '123'}
        responce = requests.post(self.base_url + '/updateBadget',
                                 headers={' Content-Type': 'application/json'},
                                 json=data)
        

            
        

        
        

   

if __name__ == '__main__':
    unittest.main()
