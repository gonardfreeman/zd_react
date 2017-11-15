from asyncio import coroutine
from schema.schema import schema
from aiohttp import web
from aiohttp_session import get_session

from helpers.helpers import check_user_req
from logging import getLogger

logger = getLogger(__name__)


class MainViews:
    @coroutine
    async def index(self, request):
        req = await request.json()
        data = schema.execute(req['query'])
        result = dict(
            data=data.data,
            errors=data.errors
        )

        return web.json_response(result)

    # TODO handle login with sessions
    @coroutine
    async def login(self, request):
        session = await get_session(request)
        req = await request.json()
        check = check_user_req(schema, req)
        node = check['allAuthUsers']['edges'][0]['node']
        from hashlib import md5
        hashed = md5(req['pwd'].encode('utf-8')).hexdigest()

        if hashed == node['password'] and req['login'] == node['userName']:
            session['isLogged'] = True
        else:
            session['isLogged'] = False
        data = {
            'isLogged': session['isLogged']
        }

        return web.json_response(data=data)
