from graphene import relay, String, Int, Float, ObjectType, Boolean
from graphene_sqlalchemy import SQLAlchemyObjectType

from schema.customs import CustomConnectionField

from models.auth_models import AuthPermission, AuthUser, \
    AuthGroup, AuthGroupPermissions, \
    AuthUserGroups, AuthUserPermissions


class AuthUserNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthUser
        interfaces = (relay.Node,)


class AuthPermissionNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthPermission
        interfaces = (relay.Node,)


class AuthGroupNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthGroup
        interfaces = (relay.Node,)


class AuthGroupPermissionsNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthGroupPermissions
        interfaces = (relay.Node,)


class AuthUserGroupsNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthUserGroups
        interfaces = (relay.Node,)


class AuthUserPermissionsNode(SQLAlchemyObjectType):
    class Meta:
        model = AuthUserPermissions
        interfaces = (relay.Node,)


class AuthUserQuery(ObjectType):
    auth_user = relay.Node.Field(AuthUserNode)
    all_auth_users = CustomConnectionField(
        AuthUserNode,
        user_name=String(),
        password=String(),
        is_active=Boolean()
    )
