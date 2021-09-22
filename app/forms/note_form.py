from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, Length


class NoteForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=15)])
    user_id = IntegerField('user_id', validators=[DataRequired(())])
    notebook_id = IntegerField('notebook_id', validators=[DataRequired(())])
    content = TextField('Content', validators=[DataRequired(())])
