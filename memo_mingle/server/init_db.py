from memo_mingle.db.orm_config import Base, engine
from memo_mingle.db.models.summarys_table import SummaryModel
from memo_mingle.db.models.topics_table import TopicModel
from memo_mingle.db.models.user_table import UserModel

if __name__ == '__main__':
    Base.metadata.create_all(engine)