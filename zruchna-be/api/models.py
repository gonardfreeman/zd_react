from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base
from helpers.helpers import load_config

from pathlib import Path


conf = load_config(str(Path('..') / 'config' / 'app_cfg.yml'))
db_conf = conf['db']

engine = create_engine("mysql://root:Kkl54fbz25!@localhost/zruchna_react")
db_session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
)

Base = declarative_base()
Base.query = db_session.query_property()

db_session.remove()


class Question(Base):
    __tablename__ = 'question'
    id = Column(Integer, primary_key=True)
    question_text = Column(String)
    pub_date = Column(Date)


class Choice(Base):
    __tablename__ = 'choice'
    id = Column(Integer, primary_key=True)
    question_id = Column(Integer, ForeignKey('question.id'))
    choice_text = Column(String)
    votes = Column(Integer)
    question = relationship(
        Question,
        backref=backref(
            'choices',
            uselist=True,
            cascade='delete,all'
        )
    )
