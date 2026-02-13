from flask import Flask, render_template, request, redirect, url_for, session
from data import USERS

app = Flask(__name__)
app.secret_key = "CHANGE_THIS_TO_A_RANDOM_SECRET_KEY_!@#_GALALA_2026"  # change in production


def get_portal_user(portal: str):
    """
    portal is 'login1' or 'login2'
    returns user dict or None
    """
    for user_id, u in USERS.items():
        if u.get("portal") == portal:
            return user_id, u
    return None, None


@app.route("/")
def index():
    # Landing page: choose portal
    return render_template("index.html")


@app.route("/login1", methods=["GET", "POST"])
def login1():
    user_id, user = get_portal_user("login1")
    if not user:
        return redirect(url_for("index"))

    error = None

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if username == user["username"] and password == user["password"]:
            session.clear()
            session["user_id"] = user_id
            session["name"] = user["name"]
            return redirect(url_for("result"))
        else:
            error = "Invalid credentials. Please check your ID and password."

    return render_template("login1.html", error=error)


@app.route("/login2", methods=["GET", "POST"])
def login2():
    user_id, user = get_portal_user("login2")
    if not user:
        return redirect(url_for("index"))

    error = None

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if username == user["username"] and password == user["password"]:
            session.clear()
            session["user_id"] = user_id
            session["name"] = user["name"]
            return redirect(url_for("result"))
        else:
            error = "Invalid credentials. Please check your ID and password."

    return render_template("login2.html", error=error)


@app.route("/result")
def result():
    # strict guard: forbid access if not logged in
    if "user_id" not in session:
        return redirect(url_for("index"))

    user_id = session.get("user_id")
    user = USERS.get(user_id)

    if not user:
        session.clear()
        return redirect(url_for("index"))

    return render_template(
        "result.html",
        name=session.get("name", user.get("name", "")),
        user_type=user.get("type"),
        term=user.get("term", "Fall 2025-2026"),
        results=user.get("results", []),
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


if __name__ == "__main__":
    # No debug toolbar; keeps console clean
    app.run(host="127.0.0.1", port=5000, debug=False)
