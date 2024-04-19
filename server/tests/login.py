import unittest
import requests


class TestLogin(unittest.TestCase):

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
      

    def test_home_route(self):
        print('\nGET / must return 200')
        response = requests.get(self.base_url + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        print('passed!\n')

    def test_login_route(self):
        print('\nPOST /login must return 200 if passed existing user\'s credentials')
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'callme', 'password': '123'}
        response = requests.post(
            self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        print('passed!\n')

    def test_invalid_user(self):
        print('\nPOST /login must return 404 if user does not exist ')
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'hello', 'password': '123'}
        response = requests.post(self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

        expected_responce = {'message': f"User '{data['username']}' does not exist!"}
        self.assertEqual(response.json(), expected_responce)
        print('passed!\n')

    def test_invalid_user_password(self):
        print('\nPOST /login must return 400 if passwords do not match')
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'callme', 'password': '321'}
        response = requests.post(self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

        expected_responce = {'message': 'Passwords do not match!'}
        self.assertEqual(response.json(), expected_responce)
        print('passed!\n')

    def test_get_user_from_token(self):
        print('\nGET /user must return a user object when passed a valid JWT in the \'Token\' header')
        if self.token:
            headers = {'Token': self.token}
            response = requests.get(self.base_url + '/user', headers=headers)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.headers['Content-Type'], 'application/json')
            self.assertEqual(response.json().get('username'), 'callme')
            print('passed!\n')



    # def test_get_user_by_id_route(self):
    #     user_id = '662073d280a650b3ebf2a1dd'
    #     response = requests.get(self.base_url + f'/user/{user_id}')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.headers['Content-Type'], 'application/json')

   

if __name__ == '__main__':
    unittest.main()
