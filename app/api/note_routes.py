# from flask import Blueprint, request
# from app.models import Note, db
# from app.forms import NoteForm
# from flask_login import current_user


# note_routes = Blueprint("notes", __name__)



# # # Creating a new note
# @note_routes.route('/newNote', method=["POST"])
# def new_note(id): 
#     form =  NoteForm()
#     if form.validate_on_submit():
#         note = Note(
#             title=form.data['title'],
#             user_id=current_user.id,
#             # notebook_id=form.data[]
#         )
#         db.session.add(note)
#         db.session.commit()
#         return note.to_dict()

# @notebook_routes.route('/edit/<int:id>', method=["PUT"])
# def update_notebook(id):
#     notebook = Notebook.query.get(id)
#     form = NoteForm()
#     if form.validate_on_submit():
#         notebook.title=form.data['title'],
#         notebook.user_id=current_user.id,
#         db.session.commit()
#         return notebook.to_dict()    

# @notebook_routes.route('/delete/<int:id>', method=["DELETE"])
# def delete_notebook(id):
#     notebook = Notebook.query.get(id)
#     form = NoteForm()
#     if form.validate_on_submit():
#         notebook.title=form.data['title'],
#         notebook.user_id=current_user.id,
#         db.session.commit()
#         return notebook.to_dict()    