# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def addition():
    """Adds the two params"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    total = add(a,b)

    return str(total)

@app.route('/sub')
def subtraction():
    """Subtracts the two params"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    total = sub(a,b)

    return str(total)
    
@app.route('/mult')
def multiplication():
    """Multiplies the two params"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    total = mult(a,b)

    return str(total)

@app.route('/div')
def divide():
    """Divides the two params"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    total = div(a,b)

    return str(total)    