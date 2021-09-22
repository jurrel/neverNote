from .db import db


class Tag_note(db.Model):
    __tablename__ = 'tag_notes'

    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    note_id = db.Column(db.Integer, db.ForeignKey('note.id'))
