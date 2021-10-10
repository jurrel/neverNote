from app.models import db, Note
from datetime import datetime

now = datetime.now()


def seed_notes():
    note1 = Note(
      title='1st page U1',
      user_id=1,
      notebook_id=1,
      content='THIS IS THE CONTENT IN THE NOTE',
      createdAt=now,
      updatedAt=now
    )
    note2 = Note(
        title='2nd page U1',
        user_id=1,
        notebook_id=1,
        content='THIS IS THE CONTENT IN THE NOTE',
        createdAt=now,
        updatedAt=now
    )
    note3 = Note(
        title='3rd page U1',
        user_id=1,
        notebook_id=1,
        content='THIS IS THE CONTENT IN THE NOTE',
        createdAt=now,
        updatedAt=now
    )
    note4 = Note(
        title='1st page U2',
        user_id=2,
        notebook_id=4,
        content='THIS IS THE CONTENT IN THE NOTE',
        createdAt=now,
        updatedAt=now
    )
    note5 = Note(
        title='3rd page U2',
        user_id=2,
        notebook_id=4,
        content='THIS IS THE CONTENT IN THE NOTE',
        createdAt=now,
        updatedAt=now
    )
    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)

    db.session.commit()


def undo_notes():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
