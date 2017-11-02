from aiomysql.sa import create_engine
# import logging
#
#
# logger = logging.getLogger(__name__)


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
    await app['db'].wait_closed()


if __name__ == '__main__':
    import pathlib
    print(load_config(str(pathlib.Path('..') / 'config' / 'app_cfg.yml')))
