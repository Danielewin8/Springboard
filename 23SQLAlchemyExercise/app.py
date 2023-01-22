from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Users

app = Flask(__name__)
app.debug = True
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_users'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "blogly123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False 
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def root():
    """Homepage redirects to list of users."""
    return redirect("/users")

@app.route('/users')
def list_users():
    """Shows list of users on homepage"""
    users = Users.query.all()
    return render_template('index.html', users=users)

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Goes to user profile"""
    user = Users.query.get_or_404(user_id)
    return render_template('profile.html', user=user)

@app.route('/users/new', methods=['GET'])
def create_user_page():
    """Renders template with form to add new user"""
    return render_template('new.html')

@app.route('/users/new', methods=["POST"])
def submit_user():
    """Submits new user form data to database"""
    new_user = Users(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'],
        image_url=request.form['image_url'] or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/edit')
def edit_user_page(user_id):
    """Renders template of edit form to change user info"""
    user = Users.query.get_or_404(user_id)
    return render_template('edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    """Edits existing user data"""
    user = Users.query.get_or_404(user_id)
    user.first_name= request.form['first_name']
    user.last_name= request.form['last_name']
    user.image_url= request.form['image_url'] 

    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Handle form submission for deleting an existing user"""

    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")