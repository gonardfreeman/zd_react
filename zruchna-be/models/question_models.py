from sqlalchemy import *
from sqlalchemy.orm import (relationship,
                            backref)

from models.init_models import Base


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