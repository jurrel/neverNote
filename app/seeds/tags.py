from app.models import db, Tag
from datetime import datetime

now = datetime.now()


def seed_tags():
    tag1 = Tag(
        name='Tag1U1',
        user_id=1,
    )
    tag2 = Tag(
        name='Tag2U1',
        user_id=1,
    )
    tag3 = Tag(
        name='Tag3U1',
        user_id=1,
    )
    tag4 = Tag(
        name='Tag4U1',
        user_id=1,
    )
    tag5 = Tag(
        name='Tag5U2',
        user_id=2,
    )
    tag6 = Tag(
        name='Tag6U2',
        user_id=2,
    )
    tag7 = Tag(
        name='Tag7U2',
        user_id=2,
    )
    tag8 = Tag(
        name='Tag7U3',
        user_id=3,
    )
    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
