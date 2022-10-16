from .db import db
from datetime import datetime

class Card(db.model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    parent = db.Column(db.Integer, default=1)
    # make not nullable V
    boardId = db.Column(db.Integer,db.ForeignKey('boards.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    board = db.relationship('Board', back_populates='cards')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'content': self.content,
            'notebookId': self.notebookId,
        }