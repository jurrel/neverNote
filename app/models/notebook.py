from .db import db


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    
    users = db.relationship('User', back_populates='notebooks')
    notes = db.relationship(
        'Note', back_populates='notebooks', lazy=True,
        cascade='all, delete, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
