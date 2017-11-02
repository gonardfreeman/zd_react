import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from .models import Question as QuestionModel, Choice as ChoiceModel
# from .db_schema import question, choice


class Question(SQLAlchemyObjectType):
    class Meta:
        model = QuestionModel
        interfaces = (relay.Node,)


class Choice(SQLAlchemyObjectType):
    class Meta:
        model = ChoiceModel
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    all_choices = SQLAlchemyConnectionField(Choice)


schema = graphene.Schema(query=Query)


if __name__ == "__main__":
    res = schema.execute('{all_choices}')
    print(res.data)
    print(res.errors)
