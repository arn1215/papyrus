from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=50)])
    content = StringField('content', validators=[DataRequired(), Length(min=3)])
