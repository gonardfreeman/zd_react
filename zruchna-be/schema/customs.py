from graphene import InputObjectType
from graphene_sqlalchemy import SQLAlchemyConnectionField
from sqlalchemy.inspection import inspect


class CustomConnectionField(SQLAlchemyConnectionField):
    RELAY_ARGS = ['first', 'last', 'before', 'after']
    CUSTOM_ARGS = ['contain']

    @classmethod
    def get_query(cls, model, info, **args):
        query = super(CustomConnectionField, cls).get_query(model, info, **args)
        for field, value in args.items():
            if field not in cls.RELAY_ARGS:
                for arg in cls.CUSTOM_ARGS:
                    if arg in field:
                        query = query.filter(
                            getattr(model, field.replace('_' + arg, '')).like('%{}%'.format(value))
                        )
                        return query
                    if isinstance(value, InputObjectType):
                        values = list(value.values())
                        keys = list(value.keys())
                        rel = inspect(model).relationships[field]
                        if len(values) > 1 or len(keys) > 1:
                            for key, val in value.items():
                                query = query.join(
                                    rel.mapper.class_,
                                    getattr(model, field.replace('_' + arg, ''))
                                ).filter(
                                    getattr(rel.mapper.class_, key) == val
                                )
                        else:
                            query = query.join(
                                rel.mapper.class_,
                                getattr(model, field.replace('_' + arg, ''))
                            ).filter(
                                getattr(rel.mapper.class_, keys[0]) == values[0]
                            )
                    else:
                        query = query.filter(
                            getattr(model, field) == value
                        )
        return query
