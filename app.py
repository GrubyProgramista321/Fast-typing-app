
from contextlib import redirect_stderr
import flask_sqlalchemy
from pkg_resources import require
from sqlalchemy import false, true
from configuration import *
from Models import Users
import requests
from bs4 import BeautifulSoup as bs
import random


page_wikipedia = requests.get("https://en.wikipedia.org/wiki/Most_common_words_in_English")
words = [i.text for i in bs(page_wikipedia.content).find_all(class_="extiw")]


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)

@app.route("/", methods=["POST", "GET"])
def index():
    return render_template("index.html")

@app.route("/current_user", methods=["GET"])
def currentUser():
    if (current_user.is_authenticated):
        return "is"
    else:
        return "none"


@app.route("/register_account", methods=['POST', 'GET'])
def register():
    if request.method == "POST":
        username_get = request.form["username"]
        passowrd_get = request.form["password"]
        email_get = request.form["e-mail"]
        add_user = Users(username=username_get, password=passowrd_get, email=email_get)
        db.session.add(add_user)
        db.session.commit()
        Users.query.all()
    return render_template("register.html")

@app.route("/login", methods = ["POST", "GET"])
def login():
    if request.method == "POST":
        username_get_login = request.form.get('username','', type=str)
        passowrd_get_login = request.form.get('password','', type=str)
        # return username_get_login, passowrd_get_login
        user = Users.query.filter_by(username=username_get_login,password=passowrd_get_login).first()
        if user != None:
            login_user(user, remember=True)
            return "true"
        else:
            return "false"

@app.route("/logout")
def logout():
    logout_user()
    return redirect("/") 

       

@app.route("/create_word", methods=["GET", "POST"])
def create_word():
    tak = 300
    text_array = []
    for i in range(tak):
        oneWord = random.randint(0, len(words))
        if (oneWord != "&nbsp" or oneWord != "\xa0"):
            try:
                text_array.append(words[oneWord])
            except:
                tak = tak + 1 
                old_number = oneWord
        else:
            numberOFWords = numberOFWords + 1
            print("wo tego") 
    text = " ".join(text_array)
    return text 

if __name__ == '__main__':
    app.run(debug=True)