from flask import Flask, request, render_template, jsonify, session
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "igkwuasdjcn"

boggle_game = Boggle()

@app.route("/")
def home():
    """Homepage that shows the board"""
    board = boggle_game.make_board()
    session["board"] = board

    return render_template("index.html", board=board)

@app.route("/check-word")
def check_word():
    """Checks the submitted word to see if it is in dictionary"""
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

