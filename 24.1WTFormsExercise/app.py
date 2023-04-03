from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import PetForm

app = Flask(__name__)
app.debug = True
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption_db'
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "petadoption123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False 
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """Home page redirect"""

    return redirect('/pets')

@app.route('/pets')
def pets_page():
    """Pet home page"""
    pets = Pet.query.all()
    return render_template("home.html", pets=pets)

@app.route('/pets/<int:pet_id>')
def pet_info(pet_id):
    """Pet info profile"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template("pet_profile.html", pet=pet)


@app.route('/pets/add', methods=["GET", "POST"])
def add_pet():
    """Form page for adding a new pet"""
    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data 
        photo_url = form.photo_url.data
        age = form.age.data 
        notes = form.notes.data

        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()
        return redirect('/pets')
    else:
        return render_template("add_pet.html", form=form)

@app.route('/pets/<int:pet_id>/edit', methods=["GET", "POST"])
def edit_pet(pet_id):
    """Form for editing pet"""
    pet = Pet.query.get_or_404(pet_id)

    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data 
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data 
        pet.notes = form.notes.data

        db.session.commit()
        return redirect("/pets")
    else:
        return render_template("edit_pet.html", form=form)