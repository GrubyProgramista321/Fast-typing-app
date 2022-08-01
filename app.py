from flask import jsonify

from flask_login import FlaskLoginClient, user_accessed
from configuration import *
from Models import Users, Games, theBestGames


page_wikipedia = requests.get(
    "https://en.wikipedia.org/wiki/Most_common_words_in_English")
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
        return jsonify(username=current_user.username, result=True)
    else:
        return "false"


@app.route("/login")
def loginewq():
    return render_template("index.html")


# sprawdzenie czy taki email instenieje w basie danych (ajax robiony przy wywoływaniu błędu)
@app.route("/email_data", methods=["POST"])
def email_data():
    email_get = request.form.get("email")
    userExist = Users.query.filter_by(email=email_get).all()
    print(userExist)
    if (userExist == []):
        print("udało sie")
        return "true"
    else:
        return "false"


def email_valid(emailValue):
    print("tak")
    hasMonkey = False
    email_get = str(emailValue)
    if email_get.isspace() == False:
        for i in email_get:
            if i == "@":
                hasMonkey = True
                break
        if hasMonkey:
            userExist = Users.query.filter_by(email=email_get).all()
            if (userExist == []):
                validEmail = validate_email(email_get, verify=True)
                if (validEmail):
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False
    else:
        return False


@app.route("/check_username", methods=["POST"])
def check_username():
    username_get = request.form.get("username")
    print(username_get)
    if (len(username_get) >= 4):
        username_exist = Users.query.filter_by(username=username_get).all()
        if (username_exist == []):
            print("suername udany wariacie")
            return "true"
        else:
            return "false"
    else:
        return "false"


@app.route("/email_ping", methods=["POST"])
def email_ping():
    if request.method == "POST":
        email = request.form.get("email")
        if email_valid(email):
            print("of taktak")
            return "true"
        else:
            return "false"


@app.route("/register_account", methods=['POST', 'GET'])
def register():
    if request.method == "POST":
        if check_username() == "true" and email_valid:
            username_get = request.form.get("username")
            passowrd_get = request.form.get("password")
            email_get = request.form.get("email")
            add_user = Users(username=username_get,
                             password=passowrd_get, email=email_get)
            db.session.add(add_user)
            db.session.commit()
            Users.query.all()
            return "true"
        else:
            return "false"


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        username_get_login = request.form.get('username', '', type=str)
        passowrd_get_login = request.form.get('password', '', type=str)
        user = Users.query.filter_by(
            username=username_get_login, password=passowrd_get_login).first()
        if user != None:
            login_user(user, remember=True)
            return "true"
        else:
            return "false"


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route("/register")
def registrerdsa():
    return render_template("index.html")


@app.route("/create_word", methods=["GET", "POST"])
def create_word():
    tak = 300
    text_array = []
    for i in range(tak):
        oneWord = random.randint(0, len(words) - 1)
        if (words[oneWord] != "&nbsp" or words[oneWord] != "\xa0"):
            try:
                text_array.append(words[oneWord])
            except:
                tak = tak + 1
                old_number = oneWord
        else:
            numberOFWords = numberOFWords + 1
    text = " ".join(text_array)
    return text


@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    listOfBestGames = []
    bestGames = Games.query.all()
    for i in bestGames:
        listOfBestGames.append({'username': i.username, "wpm": i.wpm})
    return jsonify(list(listOfBestGames))


@app.route("/save_game", methods=["GET", "POST"])
def save_game():
    wp_get = request.form.get("wpm")
    saveGame = Games(username=current_user.username,
                     wpm=wp_get, date=datetime.datetime.now())
    db.session.add(saveGame)
    db.session.commit()
    print(Games.query.all())
    if (theBestGames.query.filter_by(username=current_user.username).all() == []):
        saveGame = theBestGames(
            username=current_user.username, wpm=wp_get, date=datetime.datetime.now())
        db.session.add(saveGame)
        db.session.commit()
        return jsonify(wpmtoBeat=theBestGames.query.filter_by(username=current_user.username).first().wpm, succces=True)
    else:
        bestGame = theBestGames.query.filter_by(
            username=current_user.username).first()
        print(bestGame)
        print(theBestGames.query.filter_by(
            username=current_user.username).first().wpm)
        if (int(wp_get) > int(bestGame.wpm)):
            update = theBestGames.query.filter_by(
                username=current_user.username).update({theBestGames.wpm: wp_get})
            db.session.commit()
            return jsonify(wpmtoBeat=theBestGames.query.filter_by(username=current_user.username).first().wpm, succces=True)
        else:
            return jsonify(wpmtoBeat=theBestGames.query.filter_by(username=current_user.username).first().wpm, succces=False)


if __name__ == '__main__':
    app.run(debug=True)
