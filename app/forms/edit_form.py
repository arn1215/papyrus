from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class EditForm(FlaskForm):
    
    content = StringField('content', validators=[DataRequired(), Length(min=1)])
