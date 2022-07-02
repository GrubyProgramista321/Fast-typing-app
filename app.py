from click import style
from configuration import *
import requests
from bs4 import BeautifulSoup as bs
import random

class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register_account", methods=['POST', 'GET'])
def register():
    if current_user.is_authenticated:
        print("fajnie")
    if request.method == "POST":
        username_get = request.form["username"]
        passowrd_get = request.form["password"]
        add_user = Users(username=username_get, password=passowrd_get)
        db.session.add(add_user)
        db.session.commit()
        Users.query.all()
    return render_template("register.html")

@app.route("/login", methods = ["POST", "GET"])
def login():
    if current_user.is_authenticated:
        print("tak")
        return redirect("/")
    if request.method == "POST":
        username_get_login = request.form["username"]
        passowrd_get_login = request.form["password"]
        user = Users.query.filter_by(username=username_get_login,password=passowrd_get_login).first()
        if user != None:
            login_user(user)
            return redirect("/")
        else:
            print("moze kiedys")
    return render_template("login.html")


@app.route("/create_word", methods=["GET", "POST"])
def create_word():
        page_wikipedia = requests.get("https://en.wikipedia.org/wiki/Most_common_words_in_English")
        page_2 = requests.get("https://www.worldclasslearning.com/english/4000-most-common-english-words.html")
        word_2 = [i.text for i in (bs(page_2.content).find_all("td"))]
        words = [i.text for i in bs(page_wikipedia.content).find_all(class_="extiw")]
        print(word_2)
        for i in word_2:
            words.append(i) 
        text_array = []
        for _ in range(50):
            oneWord = random.randint(0, len(words))
            text_array.append(words[oneWord])
        text = " ".join(text_array)
        return text

if __name__ == '__main__':
    app.run(debug=True)