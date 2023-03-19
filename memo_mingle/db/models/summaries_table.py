import json
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from memo_mingle.db.orm_config import Base
from memo_mingle.db.models.topics_table import TopicModel

class SummaryModel(Base):
    __tablename__ = 'summaries'

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(50), unique=True)
    content = Column(String)

    # topic_id = Column(Integer, ForeignKey('topics.id'))
    # user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # topic = relationship('TopicModel', back_populates='summaries')
    # user = relationship('UserModel', back_populates='summaries')

    def __init__(self, title, content):
        self.title = title
        self.content = content
        # self.topic_id = topic_id
        # self.user_id = user_id

    def __repr__(self):
        summary_dict = {"id" : self.id, "title" : self.title, "content" : self.content}
        return json.dumps(summary_dict)

# TODO: add a PhotoModel table and associate a filename/url Column to the SummaryModel, 
# then create a file storage service (s3) that the photo will be saved there.