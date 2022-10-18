from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length 


class CardForm(FlaskForm):
    title = StringField('title', validators= [Length(max=50)])
    content = StringField('content', validators=[DataRequired(), Length(min=1)])
