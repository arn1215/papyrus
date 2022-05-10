from .db import db
from datetime import datetime


class Tag(db.Model):
    __tablename__ = 'Tags'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    noteId = db.Column(db.Integer,db.ForeignKey('notes.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'noteId': self.title,
        }
