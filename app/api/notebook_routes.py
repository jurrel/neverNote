from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Notebook
from flask_wtf import Form
from wtforms import TextField, BooleanField, PasswordField, TextAreaField, validators
from app.forms import LoginForm, NotebookForm
from flask_login import current_user


notebook_routes = Blueprint('notebooks', __name__)


# Read single notebook
@notebook_routes.route('/<int:id>', methods=["GET"])
def get_single_notebook(id):
    notebook = Notebook.query.filter(Notebook.id == id).one()
    return notebook.to_dict()


# Creating new notebook
@notebook_routes.route('/newNotebook', methods=['POST'])
def new_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook = Notebook(
            title=form.data['title']['title'],
            user_id=current_user.id
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()


# # Edit notebook
# @notebook_routes.route('/edit/<int:id>', methods=["PUT"])
# def edit_notebook(id):
#     notebook = Notebook.query.filter(Notebook.id == id).one()
   
#     form = NotebookForm()
#     if form.validate_on_submit():
#         notebook.title = form.data['title']['title'],
#         notebook.user_id = current_user.id,
#         db.session.commit()
#         return notebook.to_dict()

# Delete notebook
@notebook_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_notebook(id):
    notebook = Notebook.query.filter(Notebook.id == id).one()
    form = NotebookForm()
    if form.validate_on_submit():
        notebook.title = form.data['title']['title'],
        notebook.user_id = current_user.id,
        db.session.commit()
        return notebook.to_dict()
