from app.models import db, Notebook
from datetime import datetime

now = datetime.now()


def seed_notebooks():
    notebook1 = Notebook(
        title='Notebook1 U1',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    notebook2 = Notebook(
        title='Notebook2 U1',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    notebook3 = Notebook(
        title='Notebook3 U1',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    notebook4 = Notebook(
        title='Notebook4',
        user_id=2,
        # createdAt=now,
        # updatedAt=now,
    )
    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)

    db.session.commit()


def undo_notebooks():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
