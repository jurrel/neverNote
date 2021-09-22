from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class NotebookForm(FlaskForm):
    title = StringField('Title', validators=[Length(min=1, max=15)])
    user_id = IntegerField('user_id', validators=[DataRequired(())])
