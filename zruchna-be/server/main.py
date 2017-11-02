from pathlib import Path
from aiohttp import web

from aiohttp_graphql import GraphQLView
from api.schema import schema
from helpers.helpers import load_config, init_db, close_db

from routes import setup_routes

conf = load_config(str(Path('..') / 'config' / 'app_cfg.yml'))

app = web.Application()
app.on_startup.append(init_db)
GraphQLView.attach(app, schema=schema, graphiql=True)
app['config'] = conf['db']
setup_routes(app)
web.run_app(app, host="127.0.0.1", port=3001)
app.on_cleanup.append(close_db)