from .db import db
from datetime import datetime


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text(), nullable=True)
    # make not nullable V
    notebookId = db.Column(db.Integer,db.ForeignKey('notebooks.id'), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    notebook = db.relationship('NoteBook', back_populates='notes')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'content': self.content,
            'notebookId': self.notebookId,
        }
