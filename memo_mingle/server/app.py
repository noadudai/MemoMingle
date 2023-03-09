from memo_mingle.db.models.user_table import UserModel
from memo_mingle.db.orm_config import Session, Base, engine

from flask import Flask, request, jsonify, render_template
import json

# TODO: Add a login manager with Flask
# TODO: Add a LogIn rout Flask function that loges in the user if the user is in the DB. Use the @login_required in every Flask function after login.
# TODO: Add a CreateSummary rout Flask function that will use the @login_required to get the userID, then receive the info from thee post request and save to BD, the photo field is optional.
# TODO: Add a "EditSummary" option that will allow a user to edit a Summary (only a Summary that the user created, not a Summary that was created by a different user) via the Summary name.
# TODO: Add a "DeleteSummary" option Flask function that will allow a user to delete a Summary (only a Summary that the user created, not a Summary that was created by a different user) via the Summary name.
# TODO: Add a "Liked" option to Summaries, that each user can "like" that Summary, and show how many "likes" that Summary received.
# TODO: Add a "Follow" option to a Topic, that the users that "follow" that Topic can receive an update each time a new Summary was added to that Topic, and "<some num> new Summaries" from the last time the user saw the Summaries of that Topic.
# TODO: Add a "ViewProfile" functionality that will allow users to see other users profile.
# TODO: Add a "ProfilePage" option that will show all the Summaries that user submitted with each it's relevent Topic, and that user's email address so that other users can contact that user via email.
# TODO: Add a "SignOut" option that will use the @login_required to get the userID, then sign that user out.

app = Flask(__name__)

# TODO: Add a CreateAccount rout Flask function that saves the created user to the DB, and return "Signed up successfully!" or "User already signed in." 
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
            return jsonify("already sighned up")
        else:
            user_model = UserModel(name, last_name, email, password)
            session.add(user_model)
            session.commit()
            # message = SuccessMessage("Signed up successfully!")
            # return json.dumps(message.to_dict())
            return jsonify("succsses")


@app.route('/show_all_users', methods=["GET", "POST"])
def show_all_users():
    with Session() as session:
        users = session.query(UserModel).all()
        return_list = [str(user) for user in users]
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