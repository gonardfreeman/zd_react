import asyncio
import base64

from pathlib import Path
from cryptography import fernet
from aiohttp import web
from aiohttp_session import setup, session_middleware
from aiohttp_session.cookie_storage import EncryptedCookieStorage

from aiohttp_graphql import GraphQLView
from schema.schema import schema
from helpers.helpers import load_config, init_db, close_db

from server.routes import setup_routes

conf = load_config(str(Path('..') / 'config' / 'app_cfg.yml'))

loop = asyncio.get_event_loop()


def make_app():
    fernet_key = fernet.Fernet.generate_key()
    secret_key = base64.urlsafe_b64decode(fernet_key)
    storage = EncryptedCookieStorage(secret_key=secret_key)
    session_midl = session_middleware(storage)
    middlewares = [
        session_midl
    ]
    app = web.Application(loop=loop, middlewares=middlewares)

    setup(app, EncryptedCookieStorage(secret_key=secret_key))
    app.on_startup.append(init_db)
    GraphQLView.attach(app, schema=schema, graphiql=True, enable_async=True)
    app['config'] = conf['db']
    setup_routes(app)
    app.on_cleanup.append(close_db)
    return app


web.run_app(make_app(), host="127.0.0.1", port=3001)
