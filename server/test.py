from mongoengine import connect, Document, StringField, IntField
from dotenv import load_dotenv
import os

# load the .env
load_dotenv()

# Connect to MongoDB Atlas
connect(host = os.environ.get('MONGODB'))

# Define data model
class User(Document):
    name = StringField(required=True)
    age = IntField()

# Create a new user
user = User(name="John", age=30)
user.save()

# Query users
for user in User.objects:
    print(user.name, user.age)
