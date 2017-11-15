from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker)
from sqlalchemy.ext.declarative import declarative_base
from helpers.helpers import load_config

from pathlib import Path


conf = load_config(str(Path('..') / 'config' / 'app_cfg.yml'))
db_conf = conf['db']

engine = create_engine("mysql://root:Kkl54fbz25!@localhost/zruchna_react")
db_session = scoped_session(
    sessionmaker(
        autocommit=True,
        autoflush=False,
        bind=engine
    )
)

Base = declarative_base()
Base.query = db_session.query_property()

db_session.remove()
