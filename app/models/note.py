from .db import db


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Text, db.ForeignKey('users.id'), nullable=False)
    notebook_id = db.Column(db.Text, db.ForeignKey('notebook.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    
    # tags = db.relationship('Tag', secondary='tag_notes', back_populates='notes')
    #1 user for many notes
    user = db.relationship('User', back_populates='notes')
    # 1 notebook for many notes
    notebook = db.relationship('Notebook', back_populates='notes')
    
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
