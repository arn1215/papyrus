from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class EditNotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=75)])
