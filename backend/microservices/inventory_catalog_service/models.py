from enum import Enum
import sqlalchemy
from . import db
import base64

class ItemType(Enum):
    MACHINERY = 1
    TOOLS = 2
    LIVESTOCK = 3
    PRODUCE = 4

    def __str__(self):
        return self.name


class Item(db.Model):
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    item_type = db.Column(sqlalchemy.types.Enum(ItemType), nullable=True)
    posting_id = db.Column(db.Integer, db.ForeignKey('posting.id'), nullable=False)

    def __init__(self, name, price, item_type, posting_id):
        self.name = name
        self.price = price
        self.item_type = ItemType(item_type)
        self.posting_id = posting_id

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'item_type': self.item_type.__str__(),
            'posting_id': self.posting_id
        }


class Posting(db.Model):
    __tablename__ = 'posting'
    id = db.Column(db.Integer, primary_key=True)
    posting_item = db.relationship('Item', uselist=False, lazy=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, nullable=False)
    posting_author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    image = db.Column(db.LargeBinary, nullable=True) 
    

    def __init__(self, user_id, posting_author, quantity, image, description=None):
        self.user_id = user_id
        self.posting_author = posting_author
        self.quantity = quantity
        self.description = description
        self.image = image
        

    def serialize(self):
        if self.image is not None:
            image_base64 = base64.b64encode(self.image).decode('utf-8')
            return {
                'id': self.id,
                'posting_item': self.posting_item.serialize(),
                'quantity': self.quantity,
                'user_id': self.user_id,
                'posting_author': self.posting_author,
                'description': self.description,
                'image': image_base64
            }
        else:
            return {
                'id': self.id,
                'posting_item': self.posting_item.serialize(),
                'quantity': self.quantity,
                'user_id': self.user_id,
                'posting_author': self.posting_author,
                'description': self.description
            }
