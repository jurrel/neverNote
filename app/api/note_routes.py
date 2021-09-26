from flask import Blueprint, request
from app.models import Note, db
from app.forms import NoteForm
from flask_login import current_user


note_routes = Blueprint("notes", __name__)

# Read single note


@note_routes.route('/<int:id>', methods=["GET"])
def get_single_notebook(id):
    notebook = Note.query.filter(Note.id == id).one()
    return notebook.to_dict()


# Creating new note

@note_routes.route('/<int:id>/newNote', methods=['POST'])
def new_notebook(id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Note(
            title=form.data['title']['title'],
            user_id=current_user.id,
            notebook_id=id,
            content=form.data['content']
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
