from flask import Flask, request, jsonify, render_template, url_for, redirect
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
import json
import configparser
import os
from passlib.hash import scram

from memo_mingle.db.models.user_table import UserModel
from memo_mingle.db.models.summarys_table import SummaryModel
from memo_mingle.db.models.topics_table import TopicModel
from memo_mingle.db.orm_config import Session, Base, engine

# TODO: Add a "EditSummary" option that will allow a user to edit a Summary (only a Summary that the user created, not a Summary that was created by a different user) via the Summary name.
# TODO: Add a "DeleteSummary" option Flask function that will allow a user to delete a Summary (only a Summary that the user created, not a Summary that was created by a different user) via the Summary name.
# TODO: Add a "Liked" option to Summaries, that each user can "like" that Summary, and show how many "likes" that Summary received.
# TODO: Add a "Follow" option to a Topic, that the users that "follow" that Topic can receive an update each time a new Summary was added to that Topic, and "<some num> new Summaries" from the last time the user saw the Summaries of that Topic.
# TODO: Add a "ViewProfile" functionality that will allow users to see other users profile.
# TODO: Add a "ProfilePage" option that will show all the Summaries that user submitted with each it's relevent Topic, and that user's email address so that other users can contact that user via email.

app = Flask(__name__)

config_file = os.path.join(os.path.dirname(__file__), 'config1.ini')
config = configparser.ConfigParser()
config.read(config_file)

app.config['SECRET_KEY'] = config['secret_key']['key']

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    with Session() as session:
        return session.query(UserModel).filter_by(id=int(user_id)).one()


@app.route('/sign_up', methods=['POST'])
def sign_up():
    with Session() as session:
        name = request.form['name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']

        if session.query(session.query(UserModel).filter_by(email=email).exists()).scalar():
            # message = FailedMessage("User already signed in.")
            # return json.dumps(message.to_dict())
            return jsonify("already signed up")
        else:
            user_model = UserModel(name, last_name, email, password)
            session.add(user_model)
            session.commit()
            # message = SuccessMessage("Signed up successfully!")
            # return json.dumps(message.to_dict())
            # return redirect(url_for('login'))
            return jsonify("succsses")


@app.route("/login", methods=['POST'])
def login():
    with Session() as session:
        email = request.form['email']
        password = request.form['password']

        if session.query(session.query(UserModel).filter_by(email=email).exists()).scalar():
            user = get_user(email, session)
            if scram.verify(password, user.password):
                login_user(user, force=True)
                # return redirect(url_for('home'))
                return jsonify("succsses")
            else:
                # message = FailedMessage("Failed to login, password is incorrect")
                # return json.dumps(message.to_dict())
                return jsonify("Failed to login, password is incorrect")
        else:
            # message = FailedMessage("Failed to login, email is incorrect")
            # return json.dumps(message.to_dict())
            return jsonify("Failed to login, email is incorrect")


@app.route("/logout", methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    # return redirect(url_for('login'))
    return jsonify("succssesfully loged out")


# TODO: Add a CreateSummary rout Flask function that will use the @login_required to get the userID, then receive the info from thee post request and save to BD, the photo field is optional.
@app.route("/create_summary", methods=['POST'])
@login_required
def create_summary():
    with Session() as session:
        summary_name = request.form['summary name']
        topic_name = request.form['topic name']
        summary = request.form['summary']

        topic = get_topic(topic_name, session)

        if topic:
            new_summary = SummaryModel(summary_name, summary, topic.id, current_user.id)
            session.add(new_summary)
            session.commit()
            return jsonify(f"Created new summary under {topic_name} with title {summary_name}.")
        else:
            # return redirect(url_for('create_topic'))
            return jsonify(f"There is no Topic with name {topic_name}, please create one if you want to create your summary.")


@app.route("/create_topic", methods=['POST'])
@login_required
def create_topic():
    with Session() as session:
        topic_name = request.form['topic name']
        topic = get_topic(topic_name, session)

        if topic:
            # return redirect(url_for('create_topic'))
            return jsonify(f"There is a Topic with this name {topic_name}")
        else:
            new_topic = TopicModel(topic_name, current_user.id)
            session.add(new_topic)
            session.commit()
            # return redirect(url_for('create_topic'))
            return jsonify(f"Created new Topic: {topic_name}.")


# -----------Utility functions-----------
def get_user(email, session) -> UserModel:
    try:
        return session.query(UserModel).filter_by(email=email).one()
    except Exception as e:
        print(f"User do not exist: {repr(e)}")
        raise Exception("There is no user with this email.")


def get_topic(topic_name: str, seesion) -> TopicModel:
    try:
        return seesion.query(TopicModel).filter_by(name=topic_name).first()
    except Exception as e:
        print(f"Topic does not exist: {repr(e)}")
        raise Exception("There is no Topic with this name.")

    
# The following is a test to see all the users in the DB
@app.route('/show_all_users', methods=["GET", "POST"])
def show_all_users():
    with Session() as session:
        users = session.query(UserModel).all()
        return_list = [str(user) for user in users]
        return_str = str(return_list)
        return jsonify(return_str)

@app.route('/show_all_topics', methods=["GET", "POST"])
def show_all_topics():
    with Session() as session:
        topics = session.query(TopicModel).all()
        return_list = [str(topic) for topic in topics]
        return_str = str(return_list)
        return jsonify(return_str)

@app.route('/show_all_summaries', methods=["GET", "POST"])
def show_all_summaries():
    with Session() as session:
        summaries = session.query(SummaryModel).all()
        return_list = [str(summary) for summary in summaries]
        return_str = str(return_list)
        return jsonify(return_str)
    
if __name__ == '__main__':
    Base.metadata.create_all(engine)
    app.run()







# The Following are for testing if the DB sessions and quering works.
# def create_user(name: str, last_name: str, email: str, password: str) -> None:
#     with Session() as session:
#         if session.query(session.query(UserModel).filter_by(email=email).exists()).scalar:
#             print("User is already exists!")
#         else:
#             user_model = UserModel(name=name, last_name=last_name, email=email, password=password);
#             session.add(user_model);
#             session.commit();

# def print_users():
#     with Session() as session:
#         users = session.query(UserModel).all()

#         for user in users:
#             print(user.id, user.name, user.last_name, user.email)


# if __name__ == '__main__':
#     Base.metadata.create_all(engine)
#     create_user("somename", "somelastname", "sfdrg@fds", "12345")

#     print_users()

# DONE:
# TODO: Add a CreateAccount rout Flask function that saves the created user to the DB, and return "Signed up successfully!" or "User already signed in." 
# TODO: Add a login manager with Flask
# TODO: Add a LogIn rout Flask function that loges in the user if the user is in the DB. Use the @login_required in every Flask function after login.
# TODO: Add a "SignOut" option that will use the @login_required to get the userID, then sign that user out.