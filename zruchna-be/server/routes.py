from time import time

from server.views import MainViews
from aiohttp import web
from aiohttp_session import get_session


async def handler(req):
    session = await get_session(req)
    last_visit = session['last_visit'] if 'last_visit' in session else None
    session['last_visit'] = time()
    text = 'Last visited: {}'.format(last_visit)
    return web.Response(text=text)


def setup_routes(app):
    views = MainViews()
    app.router.add_post('/api', views.index)
    app.router.add_route('GET', '/', handler)
    app.router.add_post('/login', views.login)
    app.router.add_post('/fetch_app', views.login)
