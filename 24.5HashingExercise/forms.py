from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length

class RegisterForm(FlaskForm):
    """Form for registering"""
    username = StringField("Username", validators=[InputRequired(), Length(min=5, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=5, max=30)])
    email = StringField("Email", validators=[InputRequired(), Length(min=5, max=50)])
    first_name = StringField("First Name", validators=[InputRequired(), Length(min=1, max=30)])
    last_name = StringField("Last Name", validators=[InputRequired(), Length(min=1, max=30)])

class LoginForm(FlaskForm):
    """Form for logging in"""
    username = StringField("Username", validators=[InputRequired(), Length(min=5, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=5, max=30)])

class FeedbackForm(FlaskForm):
    """Form for adding new feedback"""
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = StringField("Content", validators=[InputRequired()])

class DeleteForm(FlaskForm):
    """Blank delete form"""