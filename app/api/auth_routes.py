from flask import Blueprint, jsonify, session, request, render_template, session
from app.models import User, db, Note, Notebook, Tag
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, NotebookForm, NoteForm

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        notebooks = Notebook.query.filter(
            Notebook.user_id == current_user.id).all()
        notes = Note.query.filter(
            Note.user_id == current_user.id).all()
        tags = Tag.query.filter(Tag.user_id == current_user.id).all()

        data = {
            'users': current_user.to_dict(),
            'notebooks': [notebook.to_dict() for notebook in notebooks],
            'notes': [note.to_dict() for note in notes],
            'tags': [tag.to_dict() for tag in tags],
        }

        for notebook in data['notebooks']:
            note_list = Note.query.filter(Note.notebook_id == notebook['id']).all()
            notebook['notes'] = [note.to_dict() for note in note_list]
            break

        return data
    return {'errors': ['Unauthorized']}
    


# @auth_routes.route('/d')
# def test():
#     notebooks = Notebook.query.filter(
#         Notebook.user_id == current_user.id).all()
#     notes = Note.query.filter(
#         Note.user_id == current_user.id).all()
#     tags = Tag.query.filter(Tag.user_id == current_user.id).all()

#     data = {
#         'users': current_user.to_dict(),
#         'notebooks': [notebook.to_dict() for notebook in notebooks],
#         'notes': [note.to_dict() for note in notes],
#         'tags': [tag.to_dict() for tag in tags],
#     }

#     for notebook in data['notebooks']:
#         note_list = Note.query.filter(Note.notebook_id == notebook['id']).all()
#         notebook['notes'] = [note.to_dict() for note in note_list]

    
#     # print('dasdata', data)
#     return data


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()

        notebooks = Notebook.query.filter(user.id == Notebook.user_id).all()
        notes = Note.query.filter(Note.user_id == user.id).all()
        tags = Tag.query.filter(Tag.user_id == user.id).all()

        data = {
            'users': user.to_dict(),
            'notebooks': [notebook.to_dict() for notebook in notebooks],
            'notes': [note.to_dict() for note in notes],
            'tags': [tag.to_dict() for tag in tags],
        }

        for notebook in data['notebooks']:
            note_list = Note.query.filter(
                Note.notebook_id == notebook['id']).all()
            notebook['notes'] = [note.to_dict() for note in note_list]
            break

        login_user(user)
        print('OOOO YEAH ', data)
        return data
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

