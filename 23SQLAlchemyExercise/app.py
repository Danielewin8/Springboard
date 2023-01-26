from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Users, Posts, Tag, PostTag

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
# -------------------------------------------USER ROUTES---------------------------------------------------------
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

@app.route('/users/new')
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
# -------------------------------------------POST ROUTES---------------------------------------------------------
@app.route('/users/<int:user_id>/post', methods=['GET'])
def new_post_page(user_id):
    """Renders template for new post"""
    user = Users.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('newpost.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/post', methods=["POST"])
def submit_post(user_id):
    """Handles form submission for creating a new post"""
    user = Users.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    new_post = Posts(
        title = request.form['post_title'],
        content = request.form['post_content'],
        user=user,
        tags=tags)

    db.session.add(new_post)
    db.session.commit()

    return redirect(f"/users/{user_id}")

@app.route('/posts/<int:post_id>')
def post_info(post_id):
    """Goes to post info"""
    post = Posts.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post_page(post_id):
    """Renders template for editing post"""
    post = Posts.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template('editpost.html', post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def submit_post_edit(post_id):
    """Submits edit of post"""
    post = Posts.query.get_or_404(post_id)
    post.title= request.form['post_title']
    post.content= request.form['post_content']

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

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
# -------------------------------------------TAG ROUTES---------------------------------------------------------  
@app.route('/tags')
def tags_page():
    """Renders template for tags page"""
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)

@app.route('/tags/new')
def new_tag():
    """Renders form template for creating a new tag"""
    posts = Posts.query.all()
    return render_template('newtag.html', posts=posts)

@app.route('/tags/new', methods=["POST"])
def submit_tag():
    """Submits form data for a new tag"""
    post_ids = [int(num) for num in request.form.getlist("posts")]
    posts = Posts.query.filter(Posts.id.in_(post_ids)).all()
    
    new_tag = Tag(
        name = request.form['tag_name'],
        posts=posts
    )

    db.session.add(new_tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>')
def tag_info(tag_id):
    """Tag info page"""
    tag = Tag.query.get_or_404(tag_id)
    return render_template('taginfo.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    """Renders template to edit a tag"""
    tag = Tag.query.get_or_404(tag_id)
    posts = Posts.query.all()
    return render_template('edittag.html', tag=tag, posts=posts)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def submit_tag_edit(tag_id):
    """Submits edit of tag"""
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['tag_name']
    post_ids = [int(num) for num in request.form.getlist("posts")]
    tag.posts = Posts.query.filter(Posts.id.in_(post_ids)).all()

    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    """Deletes tag"""
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')
