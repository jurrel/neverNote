from app.models import db, Notebook

def seed_notebooks():
    notebook1 = Notebook(
        title='Animals',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    notebook2 = Notebook(
        title='Pokemon',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    notebook3 = Notebook(
        title='Games',
        user_id=1,
        # createdAt=now,
        # updatedAt=now,
    )
    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)

    db.session.commit()


def undo_notebooks():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
