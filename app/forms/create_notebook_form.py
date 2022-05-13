from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class NotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=75)])
    