from flask_login import user_unauthorized
from configuration import db, UserMixin

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    wpm = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)

class theBestGames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    wpm = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)

db.create_all()
