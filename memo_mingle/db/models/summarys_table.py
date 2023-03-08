from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from memo_mingle.db.orm_config import Base
from memo_mingle.db.models.topics_table import TopicModel

class SummaryModel(Base):
    __tablename__ = 'summarys'

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(50))
    content = Column(String)
    topic_id = Column(Integer, ForeignKey('topics.id'))
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    topic = relationship('TopicModel', back_populates='summarys')
    user = relationship('UserModel', back_populates='summarys')
