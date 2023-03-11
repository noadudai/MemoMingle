from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from memo_mingle.db.orm_config import Base

class TopicModel(Base):
    __tablename__ = 'topics'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, unique=True, nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    summarys = relationship('SummaryModel', uselist=True, back_populates='topic')
    user = relationship('UserModel', back_populates='topics')

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

    def __repr__(self):
        return f"<TopicModel(name={self.name}, user_id={self.user_id})>"