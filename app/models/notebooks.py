from .db import db
from datetime import datetime


class NoteBook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
        }
