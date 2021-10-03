from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Notebook, Note
from app.forms import NotebookForm, NoteForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages


notebook_routes = Blueprint('notebooks', __name__)


# Get single Notebook
@notebook_routes.route('/<int:id>', methods=["GET"])
def get_single_notebook(id):
    notebook = Notebook.query.filter(Notebook.id == id).one()
    return notebook.to_dict()


# Get all Notebook
@notebook_routes.route('/', methods=["GET"])
def get_all_notebooks():
    notebooks = Notebook.query.filter(
        Notebook.user_id == current_user.id).all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}


# Get notebook with all it's notes
@notebook_routes.route('/<int:id>/notes', methods=["GET"])
def get_notebook_notes(id):
    notebook = Notebook.query.get(id)
    notes = Note.query.filter(Note.notebook_id == id)

    data = {
        'notebook': notebook.to_dict(),
        'notes': [note.to_dict() for note in notes]  
    }
    return data


# Creating new notebook
@notebook_routes.route('/newNotebook', methods=['POST'])
def new_note():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Notebook(
            title=form.data['title'],
            user_id=current_user.id
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit notebook
@notebook_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_notebook(id):
    notebook = Notebook.query.filter(Notebook.id == id).one()

    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook.title = form.data['title'],
        notebook.user_id = current_user.id,
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete Notebook
@notebook_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_notebook(id):
    notebook = Notebook.query.filter(Notebook.id == id).one()
    deleted_notebook = notebook
    db.session.delete(notebook)
    db.session.commit()
    return deleted_notebook.to_dict()


# Creating new note
@notebook_routes.route('/<int:id>/newNote', methods=['POST'])
def new_notebook(id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Note(
            title=form.data['title'],
            user_id=current_user.id,
            notebook_id=id,
            content=form.data['content']
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
