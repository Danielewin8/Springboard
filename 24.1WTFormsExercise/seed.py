from models import Pet, db
from app import app

db.drop_all()
db.create_all()

"""Two simple pets to start database with"""

miso = Pet(name="Miso", species="Cat", photo_url="https://www.pngall.com/wp-content/uploads/6/Maine-Coon-Cat-PNG-Free-Download.png", age='7', notes='Kind and loving!')
zoe = Pet(name="Zoe", species="Dog", photo_url="https://www.pngall.com/wp-content/uploads/5/Black-Dog-PNG-HD-Image.png", age='6', notes="Hyper and lovable!")
bella = Pet(name="Bella", species="Cat", photo_url="https://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-3.png", age='5', notes="Silly and Fun!", available=False)


db.session.add_all([miso, zoe, bella])
db.session.commit()