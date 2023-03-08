from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from memo_mingle.db.orm_config import Base

class TopicModel(Base):
    __tablename__ = 'topics'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, unique=True, nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    summarys = relationship('SummaryModel', uselist=True, back_populates='topic')