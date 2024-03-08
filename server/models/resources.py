from mongoengine import Document, StringField, ListField

class Resources(Document):
    title = StringField(required=True)
    subtitle = StringField(required=True)
    content = StringField(required=True)
    embedding = ListField()
