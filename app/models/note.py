from .db import db
from datetime import datetime
print(datetime.now().strftime("%b %-d %Y, %H:%M:%S"))

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(15), nullable=False, default='Untitled')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    # tags = db.relationship('Tag', secondary='tag_notes', back_populates='notes')

    users = db.relationship('User', back_populates='notes')
    notebooks = db.relationship('Notebook', back_populates='notes')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'notebook_id': self.notebook_id,
            'content': self.content,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }