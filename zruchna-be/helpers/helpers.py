from aiomysql.sa import create_engine
import models.init_models
from logging import getLogger

logger = getLogger(__name__)

def load_config(path):
    with open(path, 'r') as config:
        from yaml import load
        return load(config)


async def init_db(app):
    conf = app['config']
    engine = await create_engine(
        db=conf['database'],
        user=conf['user'],
        password=conf['pwd'],
        port=conf['port'],
        host=conf['host']
    )
    app['db'] = engine


async def close_db(app):
    app['db'].close()
    models.init_models.db_session.remove()
    await app['db'].wait_closed()


def check_user_req(schema, data):
    query = '''query {
          allAuthUsers(userName:"%s", isActive: true){
            edges{
              node{
                ID
                userName
                password
                isSuperuser
                isStaf
              }
            }
          }
        }''' % (
        data['login']
    )
    res = schema.execute(query)
    return res.data



if __name__ == '__main__':
    import pathlib
    print(load_config(str(pathlib.Path('..') / 'config' / 'app_cfg.yml')))
