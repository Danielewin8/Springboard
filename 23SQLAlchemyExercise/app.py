from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Users, Posts

app = Flask(__name__)
app.debug = True
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_users'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "blogly123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False 
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

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
    return render_template('newuser.html')

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
    return render_template('edituser.html', user=user)

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

@app.route('/users/<int:user_id>/post', methods=['GET'])
def new_post_page(user_id):
    """Renders template for new post"""
    user = Users.query.get_or_404(user_id)
    return render_template('newpost.html', user=user)

@app.route('/users/<int:user_id>/post', methods=["POST"])
def submit_post(user_id):
    """Handles form submission for creating a new post"""
    user = Users.query.get_or_404(user_id)
    new_post = Posts(
        title = request.form['post_title'],
        content = request.form['post_content'],
        user=user)

    db.session.add(new_post)
    db.session.commit()

    return redirect("/users")

@app.route('/posts/<int:post_id>')
def post_info(post_id):
    """Goes to post info"""
    post = Posts.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post_page(post_id):
    """Renders template for editing post"""
    post = Posts.query.get_or_404(post_id)
    return render_template('editpost.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def submit_post_edit(post_id):
    """Submits edit of post"""
    post = Posts.query.get_or_404(post_id)
    post.title= request.form['post_title']
    post.content= request.form['post_content']

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")

@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """Handle form submission for deleting an existing post"""

    post = Posts.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")
    