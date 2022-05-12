from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class EditForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
