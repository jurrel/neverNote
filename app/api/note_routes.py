from flask import Blueprint, request
from app.models import Note, db
from app.forms import NoteForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages


note_routes = Blueprint("notes", __name__)

# Get all Notes
@note_routes.route('/', methods=["GET"])
def get_all_note():
    notes = Note.query.filter(
        Note.user_id == current_user.id).all()
    return {'notes': [note.to_dict() for note in notes]}


# Get note
@note_routes.route('/<int:id>', methods=["GET"])
def get_single_notebook(id):
    note = Note.query.filter(Note.id == id).one()
    return note.to_dict()


# Edit Note
@note_routes.route('/edit/<int:id>', methods=['PUT'])
def edit_notebook(id):
    note = Note.query.filter(Note.id == id).one()
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note.title = form.data['title'],
        note.user_id = current_user.id,
        note.content = form.data['content'],
        note.notebook_id = form.data['notebook_id']
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete Notebook
@note_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_notebook(id):
    note = Note.query.filter(Note.id == id).one()
    deleted_note = note
    db.session.delete(note)
    db.session.commit()
    return deleted_note.to_dict()