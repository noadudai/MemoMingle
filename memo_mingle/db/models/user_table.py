from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from passlib.hash import scram
from flask_login import UserMixin

from memo_mingle.db.orm_config import Base
from memo_mingle.db.models.summarys_table import SummaryModel

# TODO: Add a login manager with Flask

class UserModel(Base, UserMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False, unique=True)

    summarys = relationship('SummaryModel', uselist=True, back_populates='user')
    topics = relationship('TopicModel', uselist=True, back_populates='user')

    def __init__(self, name, last_name, email, password):
        self.name = name
        self.last_name = last_name
        self.email = email
        self.password = scram.hash(password)

    def __repr__(self):
        return f"<UserModel(name={self.name}, last_name={self.last_name}, email={self.email})>"

