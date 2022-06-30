from crypt import methods
from click import password_option
from flask import Flask, redirect, render_template, request, url_for, flash
from flask_login import LoginManager, current_user, logout_user, login_user
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "df0331cefc6c2b9a5d0208a726a5d1c0fd37324feba25506"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=['POST', 'GET'])
def login_user():
    if request.method == "POST":
        username_get = request.form["username"]
        passowrd_get = request.form["password"]
        # print(username)
        # print(passowrd)
        add_user = Users(username=username_get, password=passowrd_get)
        db.session.add(add_user)
        db.session.commit()
        print(Users.query.all())
    return render_template("login.html")


if __name__ == '__main__':
    app.run(debug=True)
