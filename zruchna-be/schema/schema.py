from graphene import Schema, ObjectType, relay
from schema.admin_schema.auth_schema import AuthUserQuery


class Query(
    AuthUserQuery,
    ObjectType
):
    node = relay.Node.Field()


schema = Schema(query=Query)


if __name__ == "__main__":
    res = schema.execute('{all_auth_users}')
    print(res.data)
    print(res.errors)
