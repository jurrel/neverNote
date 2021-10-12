from app.models import db, Note
from datetime import datetime

now = datetime.now()


def seed_notes():
    note1 = Note(
      title='Dogs',
      user_id=1,
      notebook_id=1,
      content='Dogs are very cute',
      createdAt=now,
      updatedAt=now
    )
    note2 = Note(
        title='Cats',
        user_id=1,
        notebook_id=1,
        content='Cats go meow',
        createdAt=now,
        updatedAt=now
    )
    note3 = Note(
        title='Dinosaurs',
        user_id=1,
        notebook_id=1,
        content='Dinosaurs go rawr',
        createdAt=now,
        updatedAt=now
    )
    note4 = Note(
        title='Pikachu',
        user_id=1,
        notebook_id=2,
        content='Look it is a Pikachu',
        createdAt=now,
        updatedAt=now
    )
    note5 = Note(
        title='Games to play',
        user_id=1,
        notebook_id=3,
        content='Maplestory is a game I want to play',
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
