# from .db import db


# tag_notes = db.table(
#     "tag_notes",
#     db.Model.metadata,
#     db.Column("tags_id", db.Integer, db.ForeignKey('tags.id'), primary_key=True),
#     db.Column("notes_id", db.Integer, db.ForeignKey('notes.id'), primary_key=True),
# )

# class Tag_note(db.Model):
#     __tablename__ = 'tag_notes'

#     id = db.Column(db.Integer, primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'))
#     note_id = db.Column(db.Integer, db.ForeignKey('notes.id'))
