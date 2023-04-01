from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm

app = Flask(__name__)
app.app_context().push()

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def register_redirect():
    """Redirects to a register page, to user page if already logged in"""
    if "username" not in session:
        return redirect('/register')
    
    return redirect(f"/users/{session['username']}")
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    """Renders register form and page"""
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        db.session.commit()

        session['username'] = new_user.username 
        flash('Account created!', 'success')
        return redirect(f"/users/{user.username}")   
    
    else:
        return render_template('users/register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Renders login form and page"""
    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            flash(f"Hello {user.username}!", 'info')
            session['username'] = user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ['Invalid username/password']
    return render_template('users/login.html', form=form)

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username')
    flash("Logged out successfully", "success")
    return redirect('/login')

@app.route('/users/<username>')
def user_page(username):
    if "username" in session and username == session['username']:
        user = User.query.get(username)
        return render_template('users/user.html', user=user)
    else:
        flash("Unauthorized, that is not your profile!", 'danger')
        return redirect(f"/users/{session['username']}")

@app.route('/users/<username>/delete')
def delete_user(username):
    if "username" not in session and username != session['username']:
        flash("Unauthorized, that is not your profile!", 'danger')
        return redirect(f"/users/{session['username']}")
    
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    return redirect('/login')


@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    if "username" not in session and username != session['username']:
        flash("Unauthorized, that is not your profile!", 'danger')
        return redirect(f"/users/{session['username']}")

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)
        
        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/users/{feedback.username}")

    else:
        return render_template("feedback/add.html", form=form)

@app.route('/feedback/<int:feedback_id>/edit', methods=["GET", "POST"])
def edit_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)

    if "username" not in session and username != session['username']:
        flash("Unauthorized, that is not your profile!", 'danger')
        return redirect(f"/users/{session['username']}")
    
    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()

        return redirect(f"/users/{feedback.username}")
    
    return render_template("/feedback/edit.html", form=form, feedback=feedback)

@app.route('/feedback/<int:feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)

    if "username" not in session and username != session['username']:
        flash("Unauthorized, that is not your profile!", 'danger')
        return redirect(f"/users/{session['username']}")

    db.session.delete(feedback)
    db.session.commit()

    return redirect(f"/users/{feedback.username}")

        