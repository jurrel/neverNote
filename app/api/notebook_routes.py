# from flask import Blueprint, request
# from app.models import Notebook, db
# from app.forms.note_form import NoteForm
# from flask_login import current_user


# notebook_routes = Blueprint('notebooks', __name__)

# @notebook_routes.route('/', methods=["GET"])
# def get_notebooks():
#     notebooks = Notebook.query.filter(Notebook.user_id == current_user.id).all()
#     return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

# @notebook_routes.rout e('/create-notebook')
# def 
