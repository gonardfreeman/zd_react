from sqlalchemy import *
from sqlalchemy.orm import (relationship,
                            backref)

from models.init_models import Base


class AuthGroup(Base):
    __tablename__ = 'auth_group'

    ID = Column(Integer, primary_key=True)
    name = Column(String)


class AuthPermission(Base):
    __tablename__ = 'auth_permission'

    ID = Column(Integer, primary_key=True)
    name = Column(String)
    content_type_id = Column(Integer, ForeignKey('content_type.ID'))
    codename = Column(String)

    #relationships
    content_type = relationship('ContentType')


class AuthGroupPermissions(Base):
    __tablename__ = 'auth_group_permissions'

    ID = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('auth_group.ID'))
    premission_id = Column(Integer, ForeignKey('auth_permission.ID'))

    #relationships
    auth_permission = relationship(AuthPermission)
    auth_group = relationship(AuthGroup)


class AuthUser(Base):
    __tablename__ = 'auth_user'

    ID = Column(Integer, primary_key=True)
    password = Column(String)
    last_login = Column(DateTime)
    is_superuser = Column(Boolean)
    user_name = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    is_staf = Column(Boolean)
    is_active = Column(Boolean)
    date_joined = Column(DateTime)


class AuthUserGroups(Base):
    __tablename__ = 'auth_user_groups'
    ID = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('auth_user.ID'))
    group_id = Column(Integer, ForeignKey('auth_group.ID'))

    #relationships
    user = relationship(AuthUser)
    group = relationship(AuthGroup)


class AuthUserPermissions(Base):
    __tablename__ = 'auth_user_permissions'

    ID = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('auth_user.ID'))
    permission_id = Column(Integer, ForeignKey('auth_permission.ID'))

    #relationships
    user = relationship(AuthUser)
    permission = relationship(AuthPermission)


class ContentType(Base):
    __tablename__ = 'content_type'

    ID = Column(Integer, primary_key=True)
    model = Column(String)
