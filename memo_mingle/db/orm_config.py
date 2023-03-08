from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import NullPool
from memo_mingle.db.docker_db_config import DATABASE

engine = create_engine("postgresql+psycopg2://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}".format(
        db_username=DATABASE['USERNAME'], 
        db_password=DATABASE['PASSWORD'],
        db_host=DATABASE['HOST'],
        db_port=DATABASE['PORT'],
        db_name=DATABASE['NAME']
    ), echo=True, poolclass=NullPool)
Base = declarative_base()

Session = sessionmaker(bind=engine)
Session.configure(bind=engine)