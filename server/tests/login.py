import unittest
import requests


class TestRoutes(unittest.TestCase):

    def setUp(self):
        self.base_url = 'http://localhost:8000'
      

    def test_home_route(self):
        response = requests.get(self.base_url + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

    def test_login_route(self):
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'callme', 'password': '123'}
        response = requests.post(
            self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

    def test_invalid_user(self):
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'hello', 'password': '123'}
        response = requests.post(self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

    def test_invalid_user_password(self):
        headers = {'Content-Type': 'application/json'}
        data = {'username': 'callme', 'password': '321'}
        response = requests.post(self.base_url + '/login', headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

    # def test_get_user_by_id_route(self):
    #     user_id = '662073d280a650b3ebf2a1dd'
    #     response = requests.get(self.base_url + f'/user/{user_id}')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(response.headers['Content-Type'], 'application/json')

   

if __name__ == '__main__':
    unittest.main()
