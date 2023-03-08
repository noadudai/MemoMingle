# import memo_mingle
from memo_mingle.db.models.user_table import UserModel
from memo_mingle.db.orm_config import Session, Base, engine

# from flask import Flask, request, jsonify

# app = Flask(__name__)

def create_user(name: str, last_name: str, email: str, password: str) -> None:
    with Session() as session:
        if session.query(session.query(UserModel).filter_by(email=email).exists()).scalar:
            print("User is already exists!")
        else:
            user_model = UserModel(name=name, last_name=last_name, email=email, password=password);
            session.add(user_model);
            session.commit();

def print_users():
    with Session() as session:
        users = session.query(UserModel).all()

        for user in users:
            print(user.id, user.name, user.last_name, user.email)


if __name__ == '__main__':
    Base.metadata.create_all(engine)
    create_user("somename", "somelastname", "sfdrg@fds", "12345")

    print_users()