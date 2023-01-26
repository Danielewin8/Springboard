import datetime 
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

class Users(db.Model):
    """Model for users"""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Posts", backref="user")

class Posts(db.Model):
    """Model for posts"""
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default = datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Tag(db.Model):
    """Model for tags"""
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    posts = db.relationship('Posts', secondary='post_tags', backref='tags')

class PostTag(db.Model):
    """Model for joining Post and Tag"""
    __tablename__ = "post_tags"

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

def connect_db(app):
    db.app = app
    db.init_app(app)