from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, Length


class TagForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=15, message="Tags should be between 1 to 15 characters ")])
    user_id = IntegerField('user_id', validators=[DataRequired(())])
